using ErpBridge.Models.Paging;

namespace ErpBridge.Adapters;

/// <summary>   Interface for paged model adapter. </summary>
/// <typeparam name="TModel">   Type of the model. </typeparam>
public interface IPagedModelAdapter<TModel> : IModelAdapter<TModel>
{
    /// <summary>   Gets the paged in this collection. </summary>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process the paged in this collection.
    /// </returns>
    IEnumerable<TModel> GetPaged(int pageIndex);

    /// <summary>   Gets the paged in this collection. </summary>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <param name="pageSize">     Size of the page. </param>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process the paged in this collection.
    /// </returns>
    IEnumerable<TModel> GetPaged(int pageIndex, int pageSize);

    /// <summary>   Gets paged result. </summary>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <returns>   The paged result. </returns>
    IPagedResult<TModel> GetPagedResult(int pageIndex);

    /// <summary>   Gets paged result. </summary>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <param name="pageSize">     Size of the page. </param>
    /// <returns>   The paged result. </returns>
    IPagedResult<TModel> GetPagedResult(int pageIndex, int pageSize);

    /// <summary>   Gets paged asynchronous. </summary>
    /// <param name="pageIndex">            Zero-based index of the page. </param>
    /// <param name="cancellationToken">    (Optional) A token that allows processing to be
    ///                                     cancelled. </param>
    /// <returns>   The paged. </returns>
    Task<IEnumerable<TModel>> GetPagedAsync(int pageIndex, CancellationToken cancellationToken = default);

    /// <summary>   Gets paged asynchronous. </summary>
    /// <param name="pageIndex">            Zero-based index of the page. </param>
    /// <param name="pageSize">             Size of the page. </param>
    /// <param name="cancellationToken">    (Optional) A token that allows processing to be
    ///                                     cancelled. </param>
    /// <returns>   The paged. </returns>
    Task<IEnumerable<TModel>> GetPagedAsync(int pageIndex, int pageSize,
        CancellationToken cancellationToken = default);

    /// <summary>   Gets paged result asynchronous. </summary>
    /// <param name="pageIndex">            Zero-based index of the page. </param>
    /// <param name="cancellationToken">    (Optional) A token that allows processing to be
    ///                                     cancelled. </param>
    /// <returns>   The paged result. </returns>
    Task<IPagedResult<TModel>> GetPagedResultAsync(int pageIndex, CancellationToken cancellationToken = default);

    /// <summary>   Gets paged result asynchronous. </summary>
    /// <param name="pageIndex">            Zero-based index of the page. </param>
    /// <param name="pageSize">             Size of the page. </param>
    /// <param name="cancellationToken">    (Optional) A token that allows processing to be
    ///                                     cancelled. </param>
    /// <returns>   The paged result. </returns>
    Task<IPagedResult<TModel>> GetPagedResultAsync(int pageIndex, int pageSize,
        CancellationToken cancellationToken = default);
}