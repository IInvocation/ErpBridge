namespace ErpBridge.Server.WebApi.Options;

/// <summary>   The CORS options. </summary>
public class CorsOptions
{
    /// <summary>   Gets or sets the origins. </summary>
    /// <value> The origins. </value>
    public List<string> Origins { get; set; } = default!;

    /// <summary>   Gets or sets a value indicating whether we allow wildcard subdomains. </summary>
    /// <value> True if allow wildcard subdomains, false if not. </value>
    public bool AllowWildcardSubdomains { get; set; }

    /// <summary>   Gets or sets a value indicating whether we allow any header. </summary>
    /// <value> True if allow any header, false if not. </value>
    public bool AllowAnyHeader { get; set; }

    /// <summary>   Gets or sets the headers. </summary>
    /// <value> The headers. </value>
    public List<string> Headers { get; set; } = default!;

    /// <summary>   Gets or sets a value indicating whether we allow any method. </summary>
    /// <value> True if allow any method, false if not. </value>
    public bool AllowAnyMethod { get; set; }

    /// <summary>   Gets or sets the methods. </summary>
    /// <value> The methods. </value>
    public List<string> Methods { get; set; } = default!;

    /// <summary>   Gets or sets a value indicating whether we allow credentials. </summary>
    /// <value> True if allow credentials, false if not. </value>
    public bool AllowCredentials { get; set; }

    /// <summary>   Gets or sets the preflight age seconds. </summary>
    /// <value> The preflight age seconds. </value>
    public int PreflightAgeSeconds { get; set; }
}