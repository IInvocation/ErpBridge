using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace ErpBridge.Server.WebApi.ClaimsTransformations;

/// <summary>   A keycloak role transformation. </summary>
public class KeycloakRoleTransformation : IClaimsTransformation
{
    /// <summary>
    ///     Provides a central transformation point to change the specified principal. Note: this
    ///     will be run on each AuthenticateAsync call, so its safer to return a new ClaimsPrincipal
    ///     if your transformation is not idempotent.
    /// </summary>
    /// <param name="principal">    The <see cref="T:System.Security.Claims.ClaimsPrincipal" /> to
    ///                             transform. </param>
    /// <returns>   The transformed principal. </returns>
    public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        var roleClaims = principal.Claims.Where(c => c.Type == ClaimTypes.Role).ToList();
        var claims = principal.Claims.Except(roleClaims).ToList();
        foreach (var roleClaim in roleClaims)
        {
            var claimValue = roleClaim.Value;
            if (!claimValue.StartsWith('['))
            {
                claims.Add(roleClaim);
            }
            else
            {
                var roleNames = claimValue.Replace("[", "").Replace("]", "").Replace(" ", "")
                    .Split(",", StringSplitOptions.RemoveEmptyEntries);
                foreach (var roleName in roleNames)
                {
                    claims.Add(new Claim(ClaimTypes.Role, roleName));
                }
            }
        }

        var identity = new ClaimsIdentity(claims, "AuthenticationTypes.Federation");
        var newPrincipal = new ClaimsPrincipal(identity);
        return Task.FromResult(newPrincipal);
    }
}