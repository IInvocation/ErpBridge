using ErpBridge.Server.WebApi.ClaimsTransformations;
using ErpBridge.Server.WebApi.Options;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Protocols.Configuration;

namespace ErpBridge.Server.WebApi.Startup;

/// <summary>   An authentication startup. </summary>
public static class AuthenticationStartup
{
    /// <summary>
    ///     An IServiceCollection extension method that adds an authentication to 'configuration'.
    /// </summary>
    /// <param name="services">         The services to act on. </param>
    /// <param name="configuration">    The configuration. </param>
    /// <returns>   An IServiceCollection. </returns>
    public static IServiceCollection AddAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o =>
        {
            var jwtOptions = configuration.GetSection("Jwt").Get<JwtOptions>() ??
                             throw new InvalidConfigurationException();

            o.Authority = jwtOptions.Authority;
            o.Audience = jwtOptions.Audience;
            o.RequireHttpsMetadata = jwtOptions.SslRequired;
            o.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = c =>
                {
                    c.NoResult();

                    c.Response.StatusCode = 500;
                    c.Response.ContentType = "text/plain";

                    // Debug only for security reasons
                    // return c.Response.WriteAsync(c.Exception.ToString());

                    return c.Response.WriteAsync("An error occured processing your authentication.");
                }
            };
        });

        services.AddTransient<IClaimsTransformation, KeycloakRoleTransformation>();

        return services;
    }

    /// <summary>   A WebApplication extension method that use authentication. </summary>
    /// <param name="application">  The application to act on. </param>
    /// <returns>   A WebApplication. </returns>
    public static WebApplication UseAuth(this WebApplication application)
    {
        application.UseAuthentication();
        application.UseAuthorization();

        return application;
    }
}