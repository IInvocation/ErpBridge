using ErpBridge.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ErpBridge.Server.WebApi.Controllers;

/// <summary>   A controller for handling weather forecasts. </summary>
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    /// <summary>   Constructor. </summary>
    public WeatherForecastController()
    {
    }

    /// <summary>
    ///     (An Action that handles HTTP GET requests) enumerates the items in this collection that
    ///     meet given criteria.
    /// </summary>
    /// <returns>   An enumerator that allows foreach to be used to process the matched items. </returns>
    [HttpGet]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}