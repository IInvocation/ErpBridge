namespace ErpBridge.Models.Searching;

/// <summary>   Encapsulates the result of a search. </summary>
/// <typeparam name="TModel">   Type of the model. </typeparam>
public class SearchResult<TModel>
{
    /// <summary>   Gets or sets the zero-based index of the page. </summary>
    /// <value> The page index. </value>
    public int PageIndex { get; set; }

    /// <summary>   Gets or sets the number of pages. </summary>
    /// <value> The number of pages. </value>
    public int PageCount { get; set; }

    /// <summary>   Gets or sets the page size. </summary>
    /// <value> The size of the page. </value>
    public int PageSize { get; set; }

    /// <summary>   Gets or sets the records. </summary>
    /// <value> The records. </value>
    public IEnumerable<TModel> Records { get; set; }

    /// <summary>   Gets or sets the number of records. </summary>
    /// <value> The number of records. </value>
    public int RecordCount { get; set; }
}