using ErpBridge.Adapters;
using ErpBridge.Adapters.Mosaik;
using ErpBridge.Adapters.Mosaik.ConnectionFactories;
using ErpBridge.Adapters.Mosaik.Options;

namespace ErpBridge.Server.WebApi.Startup;

/// <summary>   A mosaik startup. </summary>
public static class MosaikStartup
{
    /// <summary>
    ///     An IServiceCollection extension method that adds a mosaik to 'configuration'.
    /// </summary>
    /// <param name="services">         The services to act on. </param>
    /// <param name="configuration">    The configuration. </param>
    /// <returns>   An IServiceCollection. </returns>
    public static IServiceCollection AddMosaik(this IServiceCollection services, IConfiguration configuration)
    {
        // add options
        services.Configure<MosaikOptions>(configuration.GetSection("Mosaik"));

        // add services
        services.AddScoped<IArticleAdapter, MosaikArticleAdapter>();
        services.AddSingleton<IConnectionFactory, MosaikConnectionFactory>();

        return services;
    }
}