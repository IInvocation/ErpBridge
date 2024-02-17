using System.Data;
using ErpBridge.Adapters.Mosaik.Options;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;

namespace ErpBridge.Adapters.Mosaik.ConnectionFactories;

/// <summary>   A mosaik connection factory. </summary>
public class MosaikConnectionFactory : IConnectionFactory
{
    /// <summary>   Gets options for controlling the operation. </summary>
    /// <value> The options. </value>
    protected MosaikOptions Options { get; }

    /// <summary>   Constructor. </summary>
    /// <param name="options">  Options for controlling the operation. </param>
    public MosaikConnectionFactory(IOptions<MosaikOptions> options)
    {
        Options = options.Value;
    }

    /// <summary>   Creates the connection. </summary>
    /// <returns>   The new connection. </returns>
    public IDbConnection CreateConnection()
    {
        return new SqlConnection(Options.ConnectionString);
    }
}