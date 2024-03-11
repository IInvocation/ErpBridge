namespace ErpBridge.Models;

/// <summary>   An article. </summary>
public class Article
{
    /// <summary>   Gets or sets the number of.  </summary>
    /// <value> The number. </value>
    public string Number { get; set; }

    /// <summary>   Gets or sets the name. </summary>
    /// <value> The name. </value>
    public string Name { get; set; }

    /// <summary>   Gets or sets the description. </summary>
    /// <value> The description. </value>
    public string Description { get; set; }

    /// <summary>   Gets or sets the stock location. </summary>
    /// <value> The stock location. </value>
    public string StockLocation { get; set; }
}