using ErpBridge.Models;

namespace ErpBridge.Adapters.Dummy;

/// <summary>   A dummy article adapter. </summary>
public class DummyArticleAdapter : DummyModelAdapter<Article>, IArticleAdapter
{
    /// <summary>   Gets the default sort field. </summary>
    /// <value> The default sort field. </value>
    protected override string DefaultSortField => nameof(Article.Number);

    public override Article? GetByPrimaryKey(string primaryKey)
    {
        return Models.SingleOrDefault(m => m.Number == primaryKey);
    }

    /// <summary>   Updates the given model. </summary>
    /// <param name="model">    The model. </param>
    public override bool Update(Article model)
    {
        var entity = Models.SingleOrDefault(m => m.Number == model.Number);
        if (entity != null)
        {
            entity.StockLocation = model.StockLocation;
            return true;
        }

        return false;
    }

    public override Task<bool> UpdateAsync(Article model, CancellationToken cancellationToken)
    {
        return Task.FromResult(Update(model));
    }

    /// <summary>   Enumerates create samples in this collection. </summary>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process create samples in this collection.
    /// </returns>
    protected override IEnumerable<Article> CreateSamples()
    {
        return new[]
        {
            new Article
            {
                Number = "189100",
                Name = "softliQ:SD18",
                Description = "Entnhärtungsanlage\r\nsoftliQ:SD18",
                StockLocation = "1, 1, 1",
                ListPrice = 2000,
                StockAmount = 100
            },
            new Article
            {
                Number = "189200",
                Name = "softliQ:SD21",
                Description = "Entnhärtungsanlage\r\nsoftliQ:SD21",
                StockLocation = "1, 1, 2",
                ListPrice = 3000,
                StockAmount = 50
            },
            new Article
            {
                Number = "189300",
                Name = "softliQ:SD23",
                Description = "Entnhärtungsanlage\r\nsoftliQ:SD23",
                StockLocation = "1, 1, 3",
                ListPrice = 4000,
                StockAmount = 25
            }
        };
    }
}