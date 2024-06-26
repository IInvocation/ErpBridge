﻿using ErpBridge.Adapters;
using ErpBridge.Models.Searching;
using ErpBridge.Models.Sorting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ErpBridge.Server.WebApi.Controllers.Base;

/// <summary>   A controller for handling models. </summary>
/// <typeparam name="TModel">   Type of the model. </typeparam>
/// <remarks>   Specialized constructor for use only by derived class. </remarks>
/// <param name="logger">   The logger. </param>
/// <param name="adapter">  The adapter. </param>
[Authorize]
[Route("api/[controller]")]
public abstract class ModelController<TModel>(ILogger<ModelController<TModel>> logger, IModelAdapter<TModel> adapter) : ControllerBase
{

    /// <summary>   Gets the logger. </summary>
    /// <value> The logger. </value>
    public ILogger<ModelController<TModel>> Logger { get; } = logger;

    /// <summary>   Gets the adapter. </summary>
    /// <value> The adapter. </value>
    public IModelAdapter<TModel> Adapter { get; } = adapter;

    [HttpGet("{primaryKey}")]
    public TModel? Get(string primaryKey)
    {
        return Adapter.GetByPrimaryKey(primaryKey);
    }

    [HttpPost]
    public virtual IActionResult Update(TModel model)
    {
        Adapter.Update(model);
        return Ok(model);
    }


    /// <summary>
    ///     (An Action that handles HTTP GET requests) gets all items in this collection.
    /// </summary>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process all items in this collection.
    /// </returns>
    [HttpGet("GetAll")]
    public IEnumerable<TModel> GetAll()
    {
        return Adapter.GetAll();
    }

    /// <summary>
    ///     (An Action that handles HTTP GET requests) searches for the first match.
    /// </summary>
    /// <param name="sortField">    The sort field. </param>
    /// <param name="direction">    The direction. </param>
    /// <param name="pageIndex">    Zero-based index of the page. </param>
    /// <param name="pageSize">     Size of the page. </param>
    /// <param name="filter">       Specifies the filter. </param>
    /// <returns>   A SearchResult&lt;TModel&gt; </returns>
    [HttpGet("Search")]
    public SearchResult<TModel> Search(string? sortField = null, SortDirection direction = SortDirection.Ascending,
        int pageIndex = 0, int pageSize = 20, string? filter = null)
    {
        return Adapter.Search(sortField, direction, pageIndex, pageSize, filter);
    }
}