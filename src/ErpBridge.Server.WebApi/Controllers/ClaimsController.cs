using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ErpBridge.Server.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class ClaimsController : ControllerBase
{
    [HttpGet("GetAll")]
    public virtual IEnumerable<KeyValuePair<string, string>> GetAll()
    {
        return User.Claims
            .Select(c => new KeyValuePair<string, string>(c.Type, c.Value));
    }
}