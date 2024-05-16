namespace ErpBridge.Server.WebApi.Options;

/// <summary>   A rbac options. </summary>
public class RbacOptions
{
    /// <summary>   Gets or sets the default roles. </summary>
    /// <value> The default roles. </value>
    public List<string> DefaultRoles { get; set; } = default!;

    /// <summary>   Gets or sets the rbac configuration. </summary>
    /// <value> The rbac configuration. </value>
    public List<RbacOption> RbacConfig { get; set; } = default!;
}

/// <summary>   A rbac option. </summary>
public class RbacOption
{
    /// <summary>   Gets or sets the controller. </summary>
    /// <value> The controller. </value>
    public string Controller { get; set; } = default!;

    public string? Action { get; set; }

    public string? Verb { get; set; }

    public List<string> AllowedRoles { get; set; } = default!;
}