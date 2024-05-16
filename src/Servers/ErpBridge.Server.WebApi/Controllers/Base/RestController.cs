using ErpBridge.Adapters;
using ErpBridge.Models.Searching;
using ErpBridge.Models.Sorting;
using ErpBridge.Server.WebApi.AuthorizationFilters;
using Microsoft.AspNetCore.Mvc;

namespace ErpBridge.Server.WebApi.Controllers.Base;

/// <summary>   A controller for handling articles. </summary>
[ApiController]
[RbacAuthorize]
[Route("api/[controller]")]
public abstract class RestController<TModel>: ControllerBase
{
    /// <summary>   Constructor. </summary>
    /// <param name="logger">   The logger. </param>
    /// <param name="adapter">  The adapter. </param>
    protected RestController(ILogger<RestController<TModel>> logger, IModelAdapter<TModel> adapter)
    {
        Logger = logger;
        Adapter = adapter;
    }

    /// <summary>   Gets the logger. </summary>
    /// <value> The logger. </value>
    public ILogger<RestController<TModel>> Logger { get; }

    /// <summary>   Gets the adapter. </summary>
    /// <value> The adapter. </value>
    public IModelAdapter<TModel> Adapter { get; }

    /// <summary>
    ///     (An Action that handles HTTP GET requests) gets a task&lt; action result&lt; t model&gt;
    ///     &gt; using the given identifier.
    /// </summary>
    /// <returns>   An ActionResult&lt;TModel&gt; </returns>
    [HttpGet]
    public virtual async Task<ActionResult<SearchResult<TModel>>> Get(int pageIndex = 0, int pageSize = 20)
    {
        var result = await Adapter.SearchAsync(null, SortDirection.Ascending, pageIndex, pageSize, null,
            CancellationToken.None);
        return Ok(result);
    }
    
    /// <summary>
    ///     (An Action that handles HTTP GET requests) gets a task&lt; action result&lt; t model&gt;
    ///     &gt; using the given identifier.
    /// </summary>
    /// <param name="id">   The Identifier to get. </param>
    /// <returns>   An ActionResult&lt;TModel&gt; </returns>
    [HttpGet("{id}")]
    public virtual async Task<ActionResult<TModel>> Get(string id)
    {
        var model = await Adapter.GetByPrimaryKeyAsync(id, CancellationToken.None);
        return model == null ? NotFound() : Ok(model);
    }

    /// <summary>
    ///     (An Action that handles HTTP GET requests) searches for the first match.
    /// </summary>
    /// <param name="sortField">    (Optional) The sort field. </param>
    /// <param name="direction">    (Optional) The direction. </param>
    /// <param name="pageIndex">    (Optional) Zero-based index of the page. </param>
    /// <param name="pageSize">     (Optional) Size of the page. </param>
    /// <param name="filter">       (Optional) Specifies the filter. </param>
    /// <returns>   A SearchResult&lt;TModel&gt; </returns>
    [HttpGet("Search")]
    public virtual async Task<ActionResult<SearchResult<TModel>>> Search(string? sortField = null, SortDirection direction = SortDirection.Ascending,
        int pageIndex = 0, int pageSize = 20, string? filter = null)
    {
        var result =
            await Adapter.SearchAsync(sortField, direction, pageIndex, pageSize, filter, CancellationToken.None);
        return Ok(result);
    }

    /// <summary>   (An Action that handles HTTP PUT requests) puts. </summary>
    /// <param name="model">    The model. </param>
    /// <returns>   An IActionResult. </returns>
    [HttpPut]
    public virtual async Task<IActionResult> Put(TModel model)
    {
        var result = await Adapter.UpdateAsync(model, CancellationToken.None);
        return result ? NoContent() : NotFound();
    }
}