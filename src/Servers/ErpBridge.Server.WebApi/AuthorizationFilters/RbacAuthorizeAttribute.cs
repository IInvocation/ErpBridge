using ErpBridge.Server.WebApi.Options;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;

namespace ErpBridge.Server.WebApi.AuthorizationFilters;

/// <summary>   A rbac authorize filter. </summary>
public class RbacAuthorizeFilter : IAuthorizationFilter
{
    private const string ControllerKey = "controller";
    private const string ActionKey = "action";

    /// <summary>   (Immutable) the HTTP context accessor. </summary>
    private readonly IHttpContextAccessor _httpContextAccessor;

    /// <summary>   Gets the options monitor. </summary>
    /// <value> The options monitor. </value>
    public IOptionsMonitor<RbacOptions> OptionsMonitor { get; }

    /// <summary>   Constructor. </summary>
    /// <param name="httpContextAccessor">  (Immutable) the HTTP context accessor. </param>
    /// <param name="optionsMonitor">       The options monitor. </param>
    public RbacAuthorizeFilter(IHttpContextAccessor httpContextAccessor, IOptionsMonitor<RbacOptions> optionsMonitor)
    {
        OptionsMonitor = optionsMonitor;
        _httpContextAccessor = httpContextAccessor;
    }

    /// <summary>   Called early in the filter pipeline to confirm request is authorized. </summary>
    /// <param name="context">  The <see cref="T:Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext" />.</param>
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var routeValues = _httpContextAccessor.HttpContext?.Request.RouteValues;
        var user = _httpContextAccessor.HttpContext?.User;

        var unauthorized = true;

        if (user != null && routeValues != null && routeValues.Any() && routeValues.TryGetValue(ControllerKey, out var value))
        {
            

            var rbacOptions = OptionsMonitor.CurrentValue;
            var controllerOptions = rbacOptions.RbacConfig.Where(o => o.Controller == value?.ToString()).ToList();
            var actionOption = routeValues.TryGetValue(ActionKey, out var routeValue) ? controllerOptions.FirstOrDefault(o => o.Action == routeValue!.ToString()) : null;
            var verbOption = controllerOptions.FirstOrDefault(o => o.Verb == _httpContextAccessor.HttpContext!.Request.Method);
            var controllerOption = controllerOptions.FirstOrDefault(o => string.IsNullOrWhiteSpace(o.Verb) && string.IsNullOrWhiteSpace(o.Action));

            if (controllerOptions.Any())
            {
                if (actionOption != null)
                {
                    foreach (var unused in actionOption.AllowedRoles.Where(user.IsInRole))
                        unauthorized = false;
                }
                else if (verbOption != null)
                {
                    foreach (var unused in verbOption.AllowedRoles.Where(user.IsInRole))
                        unauthorized = false;
                }
                else if (controllerOption != null)
                {
                    foreach (var unused in controllerOption.AllowedRoles.Where(user.IsInRole))
                        unauthorized = false;
                }
                else
                {
                    foreach (var unused in rbacOptions.DefaultRoles.Where(user.IsInRole))
                        unauthorized = false;
                }
            }
            else
            {
                foreach (var unused in rbacOptions.DefaultRoles.Where(user.IsInRole))
                    unauthorized = false;
            }
        }

        if (unauthorized)
        {
            context.Result = new UnauthorizedObjectResult(string.Empty);
        }
    }
}

/// <summary>   Attribute for rbac authorize. </summary>
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = true)]
public class RbacAuthorizeAttribute : TypeFilterAttribute
{
    /// <summary>   Default constructor. </summary>
    public RbacAuthorizeAttribute() : base(typeof(RbacAuthorizeFilter))
    {
    }
}