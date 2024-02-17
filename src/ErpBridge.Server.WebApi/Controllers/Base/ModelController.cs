using ErpBridge.Adapters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ErpBridge.Server.WebApi.Controllers.Base;

/// <summary>   A controller for handling models. </summary>
/// <typeparam name="TModel">   Type of the model. </typeparam>
[Authorize]
public abstract class ModelController<TModel> : ControllerBase
{
    /// <summary>   Specialized constructor for use only by derived class. </summary>
    /// <param name="logger">   The logger. </param>
    /// <param name="adapter">  The adapter. </param>
    protected ModelController(ILogger<ModelController<TModel>> logger, IModelAdapter<TModel> adapter)
    {
        Logger = logger;
        Adapter = adapter;
    }

    /// <summary>   Gets the logger. </summary>
    /// <value> The logger. </value>
    public ILogger<ModelController<TModel>> Logger { get; }

    /// <summary>   Gets the adapter. </summary>
    /// <value> The adapter. </value>
    public IModelAdapter<TModel> Adapter { get; }

    /// <summary>
    ///     (An Action that handles HTTP GET requests) gets all items in this collection.
    /// </summary>
    /// <returns>
    ///     An enumerator that allows foreach to be used to process all items in this collection.
    /// </returns>
    [HttpGet("GetAll")]
    public virtual IEnumerable<TModel> GetAll()
    {
        return Adapter.GetAll();
    }
}