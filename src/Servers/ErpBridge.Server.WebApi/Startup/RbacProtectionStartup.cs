using ErpBridge.Server.WebApi.Options;

namespace ErpBridge.Server.WebApi.Startup;

/// <summary>   A rbac protection startup. </summary>
public static class RbacProtectionStartup
{
    /// <summary>
    ///     An IServiceCollection extension method that adds a rbac protection to 'configuration'.
    /// </summary>
    /// <param name="services">         The services to act on. </param>
    /// <param name="configuration">    The configuration. </param>
    /// <returns>   An IServiceCollection. </returns>
    public static IServiceCollection AddRbacProtection(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<RbacOptions>(configuration.GetSection("RBAC"));
        services.AddHttpContextAccessor();
        return services;
    }
}