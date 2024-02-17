using System.Data;

namespace ErpBridge.Adapters.Mosaik.ConnectionFactories;

/// <summary>   Interface for connection factory. </summary>
public interface IConnectionFactory
{
    /// <summary>   Creates the connection. </summary>
    /// <returns>   The new connection. </returns>
    IDbConnection CreateConnection();
}