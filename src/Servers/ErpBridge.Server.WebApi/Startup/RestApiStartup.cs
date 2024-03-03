using ErpBridge.Server.WebApi.Options;
using Microsoft.IdentityModel.Protocols.Configuration;

namespace ErpBridge.Server.WebApi.Startup;

/// <summary>   A REST API startup. </summary>
public static class RestApiStartup
{
    /// <summary>   An IServiceCollection extension method that adds a REST API. </summary>
    /// <param name="services">         The services to act on. </param>
    /// <param name="configuration">    The configuration. </param>
    /// <returns>   An IServiceCollection. </returns>
    public static IServiceCollection AddRestApi(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    var corsOptions = configuration.GetSection("Cors").Get<CorsOptions>() ??
                                      throw new InvalidConfigurationException();

                    policy.WithOrigins(corsOptions.Origins.ToArray());
                    if (corsOptions.AllowWildcardSubdomains)
                        policy.SetIsOriginAllowedToAllowWildcardSubdomains();
                    if (corsOptions.AllowAnyHeader)
                        policy.AllowAnyHeader();
                    else
                        policy.WithHeaders(corsOptions.Headers.ToArray());
                    if (corsOptions.AllowAnyMethod)
                        policy.AllowAnyMethod();
                    else
                        policy.WithMethods(corsOptions.Methods.ToArray());
                    if (corsOptions.AllowCredentials)
                        policy.AllowCredentials();
                    policy.SetPreflightMaxAge(TimeSpan.FromSeconds(corsOptions.PreflightAgeSeconds));
                });
        });

        services.AddControllers();

        return services;
    }

    /// <summary>   A WebApplication extension method that use REST API. </summary>
    /// <param name="application">  The application to act on. </param>
    /// <returns>   A WebApplication. </returns>
    public static WebApplication UseRestApi(this WebApplication application)
    {
        application.MapControllers();

        return application;
    }
}