using ErpBridge.Server.WebApi.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Protocols.Configuration;
using Microsoft.OpenApi.Models;

namespace ErpBridge.Server.WebApi.Startup;

/// <summary>   An open API startup. </summary>
public static class OpenApiStartup
{
    /// <summary>   An IServiceCollection extension method that adds an open API. </summary>
    /// <exception cref="InvalidConfigurationException">
    ///     Thrown when an Invalid Configuration
    ///     error condition occurs.
    /// </exception>
    /// <param name="services">         The services to act on. </param>
    /// <param name="configuration">    The configuration. </param>
    /// <returns>   An IServiceCollection. </returns>
    public static IServiceCollection AddOpenApi(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "ErpBridge", Version = "v1" });

            var jwtOptions = configuration.GetSection("Jwt").Get<JwtOptions>() ??
                             throw new InvalidConfigurationException();
            var jwtScheme = new OpenApiSecurityScheme
            {
                Name = jwtOptions.Name,
                Type = SecuritySchemeType.OAuth2,
                In = ParameterLocation.Header,
                BearerFormat = "JWT",
                Scheme = "Bearer",
                Flows = new OpenApiOAuthFlows
                {
                    AuthorizationCode = new OpenApiOAuthFlow
                    {
                        AuthorizationUrl = new Uri(jwtOptions.AuthorizationUrl),
                        TokenUrl = new Uri(jwtOptions.TokenUrl),
                        Scopes = new Dictionary<string, string>()
                    }
                },
                Reference = new OpenApiReference
                {
                    Id = JwtBearerDefaults.AuthenticationScheme,
                    Type = ReferenceType.SecurityScheme
                }
            };
            options.AddSecurityDefinition(jwtScheme.Reference.Id, jwtScheme);
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                { jwtScheme, Array.Empty<string>() }
            });
        });

        return services;
    }

    /// <summary>   A WebApplication extension method that use open API. </summary>
    /// <param name="application">  The application to act on. </param>
    /// <returns>   A WebApplication. </returns>
    public static WebApplication UseOpenApi(this WebApplication application)
    {
        var swaggerOptions = application.Configuration.GetSection("Swagger").Get<SwaggerOptions>() ??
                         throw new InvalidConfigurationException();

        if (!swaggerOptions.Enable)
        {
            return application;
        }

        // if (!application.Environment.IsDevelopment() && !application.Environment.IsStaging()) return application;

        application.UseSwagger();
        application.UseSwaggerUI(options =>
        {
            var jwtOptions = application.Configuration.GetSection("Jwt").Get<JwtOptions>() ??
                             throw new InvalidConfigurationException();
            options.OAuthClientId(jwtOptions.ClientId);
            options.OAuthClientSecret(jwtOptions.ClientSecret);
            options.OAuthRealm(jwtOptions.Realm);
            options.OAuthAppName(jwtOptions.Name);
        });

        return application;
    }
}