using ErpBridge.Models;

namespace ErpBridge.Adapters.Dummy;

/// <summary>   A dummy article adapter. </summary>
public class DummyArticleAdapter : DummyModelAdapter<Article>, IArticleAdapter
{
    /// <summary>   Gets the default sort field. </summary>
    /// <value> The default sort field. </value>
    protected override string DefaultSortField => nameof(Article.Number);

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
                Description = "Entnhärtungsanlage\r\nsoftliQ:SD18"
            },
            new Article
            {
                Number = "189200",
                Name = "softliQ:SD21",
                Description = "Entnhärtungsanlage\r\nsoftliQ:SD21"
            },
            new Article
            {
                Number = "189300",
                Name = "softliQ:SD32",
                Description = "Entnhärtungsanlage\r\nsoftliQ:SD23"
            }
        };
    }
}