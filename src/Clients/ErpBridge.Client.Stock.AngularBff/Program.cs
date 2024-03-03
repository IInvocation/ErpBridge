using OidcProxy.Net.ModuleInitializers;
using OidcProxy.Net.OpenIdConnect;

namespace ErpBridge.Client.Stock.AngularBff;

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
        builder.Configuration.AddJsonFile("appsettings.secret.json", true);

        var services = builder.Services;
        var configuration = builder.Configuration;

        var config = configuration.GetSection("OidcProxy").Get<OidcProxyConfig>() ??
                     throw new InvalidOperationException();

        services.AddOidcProxy(config);

        return builder;
    }

    /// <summary>   Configures the given builder. </summary>
    /// <param name="builder">  The builder. </param>
    /// <returns>   A WebApplication. </returns>
    private static WebApplication Configure(WebApplicationBuilder builder)
    {
        var app = builder.Build();

        app.UseDefaultFiles();
        app.UseStaticFiles();
        app.UseOidcProxy();
        
        return app;
    }
}