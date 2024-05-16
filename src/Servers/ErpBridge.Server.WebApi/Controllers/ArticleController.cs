using ErpBridge.Adapters;
using ErpBridge.Models;
using ErpBridge.Server.WebApi.AuthorizationFilters;
using ErpBridge.Server.WebApi.Controllers.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ErpBridge.Server.WebApi.Controllers;

/// <summary>   A controller for handling articles. </summary>
/// <remarks>   Constructor. </remarks>
/// <param name="logger">           The logger. </param>
/// <param name="articleAdapter">   The article adapter. </param>
[ApiController]
//[Authorize(Roles = "erp-admin,erp-stock-user")]
[RbacAuthorize]
public class ArticleController(ILogger<RestController<Article>> logger, IArticleAdapter articleAdapter) : RestController<Article>(logger,
    articleAdapter)
{

    /// <summary>   Gets the article adapter. </summary>
    /// <value> The article adapter. </value>
    public IModelAdapter<Article> ArticleAdapter { get; } = articleAdapter;

    [HttpPut]
    //[Authorize(Roles = "erp-admin,erp-stock-manager")]
    public override Task<IActionResult> Put(Article model)
    {
        return base.Put(model);
    }
}