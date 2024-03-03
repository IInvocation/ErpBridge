namespace ErpBridge.Server.WebApi.Options;

/// <summary>   A jwt options. </summary>
public class JwtOptions
{
    /// <summary>   Gets or sets the name. </summary>
    /// <value> The name. </value>
    public string Name { get; set; } = default!;

    /// <summary>   Gets or sets the authority. </summary>
    /// <value> The authority. </value>
    public string Authority { get; set; } = default!;

    /// <summary>   Gets or sets URL of the authorization. </summary>
    /// <value> The authorization URL. </value>
    public string AuthorizationUrl { get; set; } = default!;

    /// <summary>   Gets or sets URL of the token. </summary>
    /// <value> The token URL. </value>
    public string TokenUrl { get; set; } = default!;

    /// <summary>   Gets or sets the audience. </summary>
    /// <value> The audience. </value>
    public string Audience { get; set; } = default!;

    /// <summary>   Gets or sets the realm. </summary>
    /// <value> The realm. </value>
    public string Realm { get; set; } = default!;

    /// <summary>   Gets or sets a value indicating whether the ssl required. </summary>
    /// <value> True if ssl required, false if not. </value>
    public bool SslRequired { get; set; }

    /// <summary>   Gets or sets the identifier of the client. </summary>
    /// <value> The identifier of the client. </value>
    public string ClientId { get; set; } = default!;

    /// <summary>   Gets or sets the client secret. </summary>
    /// <value> The client secret. </value>
    public string ClientSecret { get; set; } = default!;
}