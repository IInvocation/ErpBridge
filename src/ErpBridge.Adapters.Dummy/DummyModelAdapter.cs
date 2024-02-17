namespace ErpBridge.Adapters.Dummy;

/// <summary>   A dummy model adapter. </summary>
/// <typeparam name="TModel">   Type of the model. </typeparam>
public abstract class DummyModelAdapter<TModel> : IModelAdapter<TModel>
{
    /// <summary>   Specialized default constructor for use only by derived class. </summary>
    protected DummyModelAdapter()
    {
        // ReSharper disable once VirtualMemberCallInConstructor
        Models = new List<TModel>(CreateSamples());
    }

    /// <summary>   Gets the models. </summary>
    /// <value> The models. </value>
    protected List<TModel> Models { get; }

    public virtual IEnumerable<TModel> GetAll()
    {
        return Models;
    }

    /// <summary>   Gets all asynchronous. </summary>
    /// <param name="cancellationToken">    (Optional) A token that allows processing to be
    ///                                     cancelled. </param>
    /// <returns>   all. </returns>
    public async Task<IEnumerable<TModel>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await Task.FromResult(Models);
    }

    /// <summary>   Gets the count. </summary>
    /// <returns>   A long. </returns>
    public long Count()
    {
        return Models.Count;
    }

    /// <summary>   Count asynchronous. </summary>
    /// <param name="cancellationToken">    (Optional) A token that allows processing to be
    ///                                     cancelled. </param>
    /// <returns>   The count. </returns>
    public async Task<long> CountAsync(CancellationToken cancellationToken = default)
    {
        return await Task.FromResult(Models.Count);
    }

    /// <summary>   Enumerates create samples in this collection. </summary>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process create samples in this collection.
    /// </returns>
    protected abstract IEnumerable<TModel> CreateSamples();
}