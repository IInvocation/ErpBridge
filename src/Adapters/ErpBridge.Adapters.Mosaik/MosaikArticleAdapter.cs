using Dapper;
using ErpBridge.Adapters.Mosaik.ConnectionFactories;
using ErpBridge.Models;

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
        new KeyValuePair<string, string>("Dimensionstext", "Description"),
        new KeyValuePair<string, string>("Lagerplatz", "StockLocation"),
        new KeyValuePair<string, string>("Listenpreis", "ListPrice"),
        new KeyValuePair<string, string>("Lagerbestand", "StockAmount"),
        new KeyValuePair<string, string>("Bezugsrabattgruppe", "PriceGroup")
    });

    /// <summary>   Gets the default sort field. </summary>
    /// <value> The default sort field. </value>
    protected override string DefaultSortField => "Nummer";

    /// <summary>   Gets the filter fields in this collection. </summary>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process the filter fields in this
    ///     collection.
    /// </returns>
    protected override IEnumerable<string> GetFilterFields()
    {
        return Fields.Select(f => f.Value).Except(new[] { "Dimensionstext", "Lagerplatz", "Listenpreis", "Lagerbestand", "Bezugsrabattgruppe" });
    }

    /// <summary>   Updates the given model. </summary>
    /// <param name="model">    The model. </param>
    /// <returns>   True if it succeeds, false if it fails. </returns>
    public override bool Update(Article model)
    {
        using var con = ConnectionFactory.CreateConnection();
        var sql =
            "UPDATE [dbo].[Artikel] " +
            "SET Kurztext = Lagerplatz = @StockLocation " +
            "WHERE Nummer = @Number";
        var result = con.Execute(sql,
            new
            {
                Number = model.Number, StockLocation = model.StockLocation
            });

        return result > 0;
    }

    /// <summary>   Updates the asynchronous. </summary>
    /// <param name="model">                The model. </param>
    /// <param name="cancellationToken">    A token that allows processing to be cancelled. </param>
    /// <returns>   The update. </returns>
    public override async Task<bool> UpdateAsync(Article model, CancellationToken cancellationToken)
    {
        using var con = ConnectionFactory.CreateConnection();
        var sql =
            "UPDATE [dbo].[Artikel] " +
            "SET Lagerplatz = @StockLocation " +
            "WHERE Nummer = @Number";
        var query = new CommandDefinition(sql, parameters: model, cancellationToken: cancellationToken);
        var result = await con.ExecuteAsync(query);
        return result > 0;
    }
}