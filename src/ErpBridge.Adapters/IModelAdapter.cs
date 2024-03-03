using ErpBridge.Models.Searching;
using ErpBridge.Models.Sorting;

namespace ErpBridge.Adapters;

/// <summary>   Interface for model adapter. </summary>
/// <typeparam name="TModel">   Type of the model. </typeparam>
public interface IModelAdapter<TModel>
{
    /// <summary>   Gets all items in this collection. </summary>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process all items in this collection.
    /// </returns>
    IEnumerable<TModel> GetAll();

    /// <summary>   Gets all asynchronous. </summary>
    /// <param name="cancellationToken">
    ///     (Optional) A token that allows processing to be
    ///     cancelled.
    /// </param>
    /// <returns>   all. </returns>
    Task<IEnumerable<TModel>> GetAllAsync(CancellationToken cancellationToken = default);

    /// <summary>   Gets the count. </summary>
    /// <returns>   A long. </returns>
    long Count();

    /// <summary>   Count asynchronous. </summary>
    /// <param name="cancellationToken">
    ///     (Optional) A token that allows processing to be
    ///     cancelled.
    /// </param>
    /// <returns>   The count. </returns>
    Task<long> CountAsync(CancellationToken cancellationToken = default);

    /// <summary>   Searches for the first match. </summary>
    /// <param name="sortField">    The sort field. </param>
    /// <param name="direction">    The direction. </param>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <param name="pageSize">     Size of the page. </param>
    /// <param name="filter">       Specifies the filter. </param>
    /// <returns>   A SearchResult&lt;TModel&gt; </returns>
    SearchResult<TModel> Search(string? sortField, SortDirection direction, int pageIndex, int pageSize,
        string? filter);

    /// <summary>   Searches for the first asynchronous. </summary>
    /// <value> The search. </value>
    /// ###
    /// <param name="sortField">            The sort field. </param>
    /// ###
    /// <param name="direction">            The direction. </param>
    /// ###
    /// <param name="pageIndex">            Zero-based index of the page. </param>
    /// ###
    /// <param name="pageSize">             Size of the page. </param>
    /// ###
    /// <param name="filter">               Specifies the filter. </param>
    /// ###
    /// <param name="cancellationToken">
    ///     (Optional) A token that allows processing to be
    ///     cancelled.
    /// </param>
    Task<SearchResult<TModel>> SearchAsync(string? sortField, SortDirection direction, int pageIndex, int pageSize,
        string? filter, CancellationToken cancellationToken = default);
}