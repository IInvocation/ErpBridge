using ErpBridge.Adapters;
using ErpBridge.Models;
using ErpBridge.Server.WebApi.Controllers.Base;
using Microsoft.AspNetCore.Mvc;

namespace ErpBridge.Server.WebApi.Controllers;

/// <summary>   A controller for handling articles. </summary>
[ApiController]
public class ArticleController : ModelController<Article>
{
    /// <summary>   Constructor. </summary>
    /// <param name="logger">           The logger. </param>
    /// <param name="articleAdapter">   The article adapter. </param>
    public ArticleController(ILogger<ModelController<Article>> logger, IArticleAdapter articleAdapter) : base(logger,
        articleAdapter)
    {
        ArticleAdapter = articleAdapter;
    }

    /// <summary>   Gets the article adapter. </summary>
    /// <value> The article adapter. </value>
    public IModelAdapter<Article> ArticleAdapter { get; }
}