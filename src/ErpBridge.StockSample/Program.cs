using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

namespace ErpBridge.StockSample;

/// <summary>   A program. </summary>
public class Program
{
    /// <summary>   Main entry-point for this application. </summary>
    /// <param name="args"> An array of command-line argument strings. </param>
    /// <returns>   A Task. </returns>
    public static async Task Main(string[] args)
    {
        var builder = WebAssemblyHostBuilder.CreateDefault(args);
        builder.RootComponents.Add<App>("#app");
        builder.RootComponents.Add<HeadOutlet>("head::after");

        builder.Services.AddTransient<JwtAuthorizationMessageHandler>();

        // local http-client tied to base-address
        builder.Services.AddHttpClient("Local",
            client => client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress));

        // remote http-client to to erp-bridge-address
        builder.Services.AddHttpClient("ERP",
                client => client.BaseAddress = new Uri("https://localhost:7161/"))
            .AddHttpMessageHandler<JwtAuthorizationMessageHandler>();

        builder.Services.AddOidcAuthentication(options =>
        {
            options.ProviderOptions.Authority = "https://oauth.wtschnell.de/realms/wts";
            options.ProviderOptions.ClientId = "erp-bridge-stock";
            options.ProviderOptions.ResponseType = "id_token token";
            options.ProviderOptions.DefaultScopes.Add("profile");
            options.ProviderOptions.DefaultScopes.Add("email");
            options.ProviderOptions.DefaultScopes.Add("roles");
            options.ProviderOptions.DefaultScopes.Add("erp");
        });

        await builder.Build().RunAsync();
    }

    /// <summary>   A jwt authorization message handler. </summary>
    public class JwtAuthorizationMessageHandler : AuthorizationMessageHandler
    {
        /// <summary>   Constructor. </summary>
        /// <param name="provider">     The provider. </param>
        /// <param name="navigation">   The navigation. </param>
        public JwtAuthorizationMessageHandler(IAccessTokenProvider provider, NavigationManager navigation) : base(provider, navigation)
        {
            ConfigureHandler(authorizedUrls: new[] { "https://localhost:7161/" });
        }
    }
}