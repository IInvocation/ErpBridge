using System.Data;
using Dapper;
using ErpBridge.Adapters.Mosaik.ConnectionFactories;
using ErpBridge.Models.Searching;
using ErpBridge.Models.Sorting;

namespace ErpBridge.Adapters.Mosaik;

/// <summary>   A mosaik model adapter. </summary>
/// <typeparam name="TModel">   Type of the model. </typeparam>
/// <remarks>   Specialized constructor for use only by derived class. </remarks>
/// <param name="connectionFactory">    The connection factory. </param>
public abstract class MosaikModelAdapter<TModel>(IConnectionFactory connectionFactory) : IModelAdapter<TModel>
{
    /// <summary>   Gets the connection factory. </summary>
    /// <value> The connection factory. </value>
    public IConnectionFactory ConnectionFactory { get; } = connectionFactory;

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

    /// <summary>   Gets by primary key. </summary>
    /// <param name="primaryKey">   The primary key. </param>
    /// <returns>   The by primary key. </returns>
    public TModel GetByPrimaryKey(string primaryKey)
    {
        using var con = ConnectionFactory.CreateConnection();
        var sql = GetGetByKeyStatement(primaryKey);
        var model = con.Query<TModel>(sql).SingleOrDefault();
        return model;
    }

    /// <summary>   Gets by primary key asynchronous. </summary>
    /// <param name="primaryKey">           The primary key. </param>
    /// <param name="cancellationToken">    A token that allows processing to be cancelled. </param>
    /// <returns>   The by primary key. </returns>
    public async Task<TModel> GetByPrimaryKeyAsync(string primaryKey, CancellationToken cancellationToken)
    {
        using var con = ConnectionFactory.CreateConnection();
        var sql = GetGetByKeyStatement(primaryKey);
        var query = new CommandDefinition(sql, cancellationToken: cancellationToken);
        var models = await con.QueryAsync<TModel>(query);
        return models.SingleOrDefault();
    }

    /// <summary>   Updates the given model. </summary>
    /// <param name="model">    The model. </param>
    public abstract bool Update(TModel model);

    /// <summary>   Updates the asynchronous. </summary>
    /// <param name="model">                The model. </param>
    /// <param name="cancellationToken">    A token that allows processing to be cancelled. </param>
    /// <returns>   The update. </returns>
    public abstract Task<bool> UpdateAsync(TModel model, CancellationToken  cancellationToken);

    /// <summary>   Gets all asynchronous. </summary>
    /// <param name="cancellationToken">
    ///     (Optional) A token that allows processing to be
    ///     cancelled.
    /// </param>
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
    /// <param name="cancellationToken">
    ///     (Optional) A token that allows processing to be
    ///     cancelled.
    /// </param>
    /// <returns>   The count. </returns>
    public async Task<long> CountAsync(CancellationToken cancellationToken = default)
    {
        using var con = ConnectionFactory.CreateConnection();
        var sql = GetCountAllStatement();
        var query = new CommandDefinition(sql, cancellationToken: cancellationToken);
        return await con.ExecuteScalarAsync<long>(query);
    }

    /// <summary>   Searches for the first match. </summary>
    /// <param name="sortField">    The sort field. </param>
    /// <param name="direction">    The direction. </param>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <param name="pageSize">     Size of the page. </param>
    /// <param name="filter">       Specifies the filter. </param>
    /// <returns>   A SearchResult&lt;TModel&gt; </returns>
    public SearchResult<TModel> Search(string sortField, SortDirection direction, int pageIndex, int pageSize,
        string filter)
    {
        using var con = ConnectionFactory.CreateConnection();

        var sql = GetSearchStatement(sortField, direction, pageIndex, pageSize, filter);
        var models = con.Query<TModel>(sql).ToList();

        var count = CountSearch(con, sortField, direction, pageIndex, pageSize, filter);

        return new SearchResult<TModel>
        {
            PageIndex = pageIndex,
            PageSize = pageSize,
            PageCount = count / pageSize + (count % pageSize > 0 ? 1 : 0),
            Records = models,
            RecordCount = count
        };
    }

    /// <summary>   Searches for the first asynchronous. </summary>
    /// <param name="sortField">            The sort field. </param>
    /// <param name="direction">            The direction. </param>
    /// <param name="pageIndex">            Zero-based index of the page. </param>
    /// <param name="pageSize">             Size of the page. </param>
    /// <param name="filter">               Specifies the filter. </param>
    /// <param name="cancellationToken">
    ///     (Optional) A token that allows processing to be
    ///     cancelled.
    /// </param>
    /// <returns>   The search. </returns>
    public async Task<SearchResult<TModel>> SearchAsync(string sortField, SortDirection direction, int pageIndex,
        int pageSize, string filter, CancellationToken cancellationToken = default)
    {
        using var con = ConnectionFactory.CreateConnection();
        var sql = GetSearchStatement(sortField, direction, pageIndex, pageSize, filter);
        var query = new CommandDefinition(sql, cancellationToken: cancellationToken);
        var models = await con.QueryAsync<TModel>(query);
        var count = await CountSearchAsync(con, sortField, direction, pageIndex, pageSize, filter, cancellationToken);
        var lModels = models.ToList();

        return new SearchResult<TModel>
        {
            PageIndex = pageIndex,
            PageSize = pageSize,
            PageCount = count / pageSize + (count % pageSize > 0 ? 1 : 0),
            Records = lModels,
            RecordCount = count
        };
    }

    /// <summary>   Gets select all query. </summary>
    /// <returns>   The select all query. </returns>
    protected abstract string GetSelectAllStatement();

    /// <summary>   Gets by key statement. </summary>
    /// <param name="primaryKey">   The primary key. </param>
    /// <returns>   The by key statement. </returns>
    protected abstract string GetGetByKeyStatement(string primaryKey);

    /// <summary>   Gets count search statement. </summary>
    /// <param name="sortField">    The sort field. </param>
    /// <param name="direction">    The direction. </param>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <param name="pageSize">     Size of the page. </param>
    /// <param name="filter">       Specifies the filter. </param>
    /// <returns>   The count search statement. </returns>
    protected abstract string GetCountSearchStatement(string sortField, SortDirection direction, int pageIndex,
        int pageSize, string filter);

    /// <summary>   Gets search statement. </summary>
    /// <param name="sortField">    The sort field. </param>
    /// <param name="direction">    The direction. </param>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <param name="pageSize">     Size of the page. </param>
    /// <param name="filter">       Specifies the filter. </param>
    /// <returns>   The search statement. </returns>
    protected abstract string GetSearchStatement(string sortField, SortDirection direction, int pageIndex, int pageSize,
        string filter);

    /// <summary>   Gets count all query. </summary>
    /// <returns>   The count all query. </returns>
    protected abstract string GetCountAllStatement();

    /// <summary>   Count search. </summary>
    /// <param name="con">          The con. </param>
    /// <param name="sortField">    The sort field. </param>
    /// <param name="direction">    The direction. </param>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <param name="pageSize">     Size of the page. </param>
    /// <param name="filter">       Specifies the filter. </param>
    /// <returns>   The total number of search. </returns>
    public int CountSearch(IDbConnection con, string sortField, SortDirection direction, int pageIndex, int pageSize,
        string filter)
    {
        var sql = GetCountSearchStatement(sortField, direction, pageIndex, pageSize, filter);
        return con.ExecuteScalar<int>(sql);
    }

    /// <summary>   Count search asynchronous. </summary>
    /// <param name="con">                  The con. </param>
    /// <param name="sortField">            The sort field. </param>
    /// <param name="direction">            The direction. </param>
    /// <param name="pageIndex">            Zero-based index of the page. </param>
    /// <param name="pageSize">             Size of the page. </param>
    /// <param name="filter">               Specifies the filter. </param>
    /// <param name="cancellationToken">
    ///     (Optional) A token that allows processing to be
    ///     cancelled.
    /// </param>
    /// <returns>   The count search. </returns>
    public async Task<int> CountSearchAsync(IDbConnection con, string sortField, SortDirection direction, int pageIndex,
        int pageSize, string filter, CancellationToken cancellationToken = default)
    {
        var sql = GetCountSearchStatement(sortField, direction, pageIndex, pageSize, filter);
        var query = new CommandDefinition(sql, cancellationToken: cancellationToken);
        return await con.ExecuteScalarAsync<int>(query);
    }
}