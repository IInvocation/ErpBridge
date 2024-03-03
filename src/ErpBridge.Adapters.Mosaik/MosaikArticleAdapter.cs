using ErpBridge.Adapters.Mosaik.ConnectionFactories;
using ErpBridge.Models;
using ErpBridge.Models.Sorting;

namespace ErpBridge.Adapters.Mosaik;

/// <summary>   A mosaik article adapter. </summary>
public class MosaikArticleAdapter : MosaikMappingModelAdapter<Article>, IArticleAdapter
{
    /// <summary>   Constructor. </summary>
    /// <param name="connectionFactory">    The connection factory. </param>
    public MosaikArticleAdapter(IConnectionFactory connectionFactory) : base("Artikel", connectionFactory)
    {
    }

    /// <summary>   Gets the fields. </summary>
    /// <value> The fields. </value>
    protected override Dictionary<string, string> Fields { get; } = new(new[]
    {
        new KeyValuePair<string, string>("Nummer", "Number"),
        new KeyValuePair<string, string>("Kurztext", "Name"),
        new KeyValuePair<string, string>("Dimensionstext", "Description")
    });

    /// <summary>   Gets the filter fields in this collection. </summary>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process the filter fields in this
    ///     collection.
    /// </returns>
    protected override IEnumerable<string> GetFilterFields()
    {
        return Fields.Select(f => f.Value).Except(new []{"Dimensionstext"});
    }

    /// <summary>   Gets the default sort field. </summary>
    /// <value> The default sort field. </value>
    protected override string DefaultSortField => "Nummer";
}