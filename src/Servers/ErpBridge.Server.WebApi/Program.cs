using ErpBridge.Server.WebApi.Startup;
using Microsoft.Extensions.Configuration;

namespace ErpBridge.Server.WebApi;

/// <summary>   A program. </summary>
public class Program
{
    /// <summary>   Main entry-point for this application. </summary>
    /// <param name="args"> The arguments. </param>
    public static void Main(string[] args)
    {
        var builder = Build(args);
        var app = Configure(builder);
        app.Run();
    }

    /// <summary>   Builds the given arguments. </summary>
    /// <param name="args"> The arguments. </param>
    /// <returns>   A WebApplicationBuilder. </returns>
    private static WebApplicationBuilder Build(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Configuration.AddJsonFile("appsettings.secret.json", false);

        var services = builder.Services;
        var configuration = builder.Configuration;

        services.AddMosaik(configuration);
        services.AddAuthentication(configuration);
        services.AddRestApi(configuration);
        services.AddOpenApi(configuration);
        services.AddRbacProtection(configuration);

        return builder;
    }

    /// <summary>   Configures the given builder. </summary>
    /// <param name="builder">  The builder. </param>
    /// <returns>   A WebApplication. </returns>
    private static WebApplication Configure(WebApplicationBuilder builder)
    {
        var app = builder.Build();

        app.UseHttpsRedirection();
        app.UseCors();
        app.UseAuth();
        app.UseOpenApi();
        app.UseRestApi();

        return app;
    }
}