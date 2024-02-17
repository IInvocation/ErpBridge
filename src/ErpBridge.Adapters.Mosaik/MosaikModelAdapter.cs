using Dapper;
using ErpBridge.Adapters.Mosaik.ConnectionFactories;

namespace ErpBridge.Adapters.Mosaik;

/// <summary>   A mosaik model adapter. </summary>
/// <typeparam name="TModel">   Type of the model. </typeparam>
public abstract class MosaikModelAdapter<TModel> : IModelAdapter<TModel>
{
    /// <summary>   Gets the connection factory. </summary>
    /// <value> The connection factory. </value>
    public IConnectionFactory ConnectionFactory { get; }

    /// <summary>   Specialized constructor for use only by derived class. </summary>
    /// <param name="connectionFactory">    The connection factory. </param>
    protected MosaikModelAdapter(IConnectionFactory connectionFactory)
    {
        ConnectionFactory = connectionFactory;
    }

    /// <summary>   Gets select all query. </summary>
    /// <returns>   The select all query. </returns>
    protected abstract string GetSelectAllStatement();

    /// <summary>   Gets count all query. </summary>
    /// <returns>   The count all query. </returns>
    protected abstract string GetCountAllStatement();

    /// <summary>   Gets all items in this collection. </summary>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process all items in this collection.
    /// </returns>
    public IEnumerable<TModel> GetAll()
    {
        using var con = ConnectionFactory.CreateConnection();
        var sql = GetSelectAllStatement();
        var models = con.Query<TModel>(sql);
        return models;
    }

    /// <summary>   Gets all asynchronous. </summary>
    /// <param name="cancellationToken">    (Optional) A token that allows processing to be
    ///                                     cancelled. </param>
    /// <returns>   all. </returns>
    public Task<IEnumerable<TModel>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        using var con = ConnectionFactory.CreateConnection(); 
        var sql = GetSelectAllStatement();
        var query = new CommandDefinition(sql, cancellationToken: cancellationToken);
        var models = con.QueryAsync<TModel>(query);
        return models;
    }

    /// <summary>   Gets the count. </summary>
    /// <returns>   A long. </returns>
    public long Count()
    {
        using var con = ConnectionFactory.CreateConnection();
        var sql = GetCountAllStatement();
        return con.ExecuteScalar<long>(sql);
    }

    /// <summary>   Count asynchronous. </summary>
    /// <param name="cancellationToken">    (Optional) A token that allows processing to be
    ///                                     cancelled. </param>
    /// <returns>   The count. </returns>
    public async Task<long> CountAsync(CancellationToken cancellationToken = default)
    {
        using var con = ConnectionFactory.CreateConnection();
        var sql = GetCountAllStatement();
        var query = new CommandDefinition(sql, cancellationToken: cancellationToken);
        return await con.ExecuteScalarAsync<long>(query);
    }
}