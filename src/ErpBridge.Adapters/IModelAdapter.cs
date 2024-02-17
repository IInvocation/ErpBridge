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
    /// <param name="cancellationToken">    (Optional) A token that allows processing to be
    ///                                     cancelled. </param>
    /// <returns>   all. </returns>
    Task<IEnumerable<TModel>> GetAllAsync(CancellationToken cancellationToken = default);

    /// <summary>   Gets the count. </summary>
    /// <returns>   A long. </returns>
    long Count();

    /// <summary>   Count asynchronous. </summary>
    /// <param name="cancellationToken">    (Optional) A token that allows processing to be
    ///                                     cancelled. </param>
    /// <returns>   The count. </returns>
    Task<long> CountAsync(CancellationToken cancellationToken = default);
}