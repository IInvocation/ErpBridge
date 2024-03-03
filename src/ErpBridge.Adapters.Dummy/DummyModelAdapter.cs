using ErpBridge.Models.Searching;
using ErpBridge.Models.Sorting;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Text;

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

        // ReSharper disable once VirtualMemberCallInConstructor
        FilterFields = GetFilterFields();
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
    
    /// <summary>   Searches for the first match. </summary>
    /// <param name="sortField">    The sort field. </param>
    /// <param name="direction">    The direction. </param>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <param name="pageSize">     Size of the page. </param>
    /// <param name="filter">       Specifies the filter. </param>
    /// <returns>   A SearchResult&lt;TModel&gt; </returns>
    public SearchResult<TModel> Search(string? sortField, SortDirection direction, int pageIndex, int pageSize, string? filter)
    {
        var realSortField = string.IsNullOrWhiteSpace(sortField) ? DefaultSortField : sortField;

        var filteredModels = string.IsNullOrWhiteSpace(filter) 
            ? Models.AsQueryable() 
            : Models.AsQueryable().Where(BuildFilterPredicate(filter));

        var result = filteredModels
            .OrderBy(realSortField + ' ' + (direction == SortDirection.Descending ? "desc" : "asc"))
            .Skip(pageIndex * pageSize)
            .Take(pageSize)
            .ToList();

        return new SearchResult<TModel>
        {
            PageIndex = pageIndex, 
            PageSize = pageSize,
            PageCount = filteredModels.Count() / pageSize + (filteredModels.Count() % pageSize > 0 ? 1 : 0),
            Records = result
        };
    }

    /// <summary>   Searches for the first asynchronous. </summary>
    /// <param name="sortField">            The sort field. </param>
    /// <param name="direction">            The direction. </param>
    /// <param name="pageIndex">            Zero-based index of the page. </param>
    /// <param name="pageSize">             Size of the page. </param>
    /// <param name="filter">               Specifies the filter. </param>
    /// <param name="cancellationToken">    (Optional) A token that allows processing to be
    ///                                     cancelled. </param>
    /// <returns>   The search. </returns>
    public Task<SearchResult<TModel>> SearchAsync(string? sortField, SortDirection direction, int pageIndex, int pageSize, string? filter, CancellationToken cancellationToken = default)
    {
        return Task.FromResult(Search(sortField, direction, pageIndex, pageSize, filter));
    }

    /// <summary>   Gets or sets the filter fields. </summary>
    /// <value> The filter fields. </value>
    protected IEnumerable<string> FilterFields { get; set; }

    /// <summary>   Gets the default sort field. </summary>
    /// <value> The default sort field. </value>
    protected abstract string DefaultSortField { get; }

    /// <summary>   Gets the filter fields in this collection. </summary>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process the filter fields in this
    ///     collection.
    /// </returns>
    protected virtual IEnumerable<string> GetFilterFields()
    {
        var modelType = typeof(TModel);
        var properties = modelType.GetProperties(BindingFlags.Public | BindingFlags.Instance);
        return (from property in properties where property.PropertyType == typeof(string) && property.CanRead select property.Name).ToList();
    }

    /// <summary>   Builds filter predicate. </summary>
    /// <param name="filterValue">  The filter value. </param>
    /// <returns>   A string. </returns>
    protected virtual string BuildFilterPredicate(string filterValue)
    {
        var sb = new StringBuilder();

        for (var i = 0; i < FilterFields.Count(); i++)
        {
            var field = FilterFields.ElementAt(i);

            if (i > 0)
                sb.Append(" or ");
            sb.Append($"{field}.Contains(\"{filterValue}\")");
        }
        return sb.ToString();
    }

    /// <summary>   Enumerates create samples in this collection. </summary>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process create samples in this collection.
    /// </returns>
    protected abstract IEnumerable<TModel> CreateSamples();
}