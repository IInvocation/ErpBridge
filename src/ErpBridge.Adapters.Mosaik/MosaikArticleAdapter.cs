﻿using ErpBridge.Adapters.Mosaik.ConnectionFactories;
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
    protected override Dictionary<string, string> Fields { get; } = new(new []
    {
        new KeyValuePair<string, string>("Nummer", "Number"),
        new KeyValuePair<string, string>("Kurztext", "[Name]"),
        new KeyValuePair<string, string>("Dimensionstext", "[Description]")
    });
}