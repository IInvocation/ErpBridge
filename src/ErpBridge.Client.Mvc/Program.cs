using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace ErpBridge.Client.Mvc
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthentication(options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                })
                .AddCookie(options =>
                {
                    options.Cookie.MaxAge = TimeSpan.FromMinutes(60);
                    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                    options.SlidingExpiration = true;
                })
                .AddOpenIdConnect(options =>
                {
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.Authority = "https://oauth.wtschnell.de/realms/wts";
                    options.RequireHttpsMetadata = true;
                    options.ClientId = "erp-bridge-stock";
                    options.ClientSecret = "R5YYgoaYAC0VcQfBFJioCgWxUPMPjoKj";
                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.ResponseType = OpenIdConnectResponseType.Code;
                    options.UsePkce = true;
                    options.Scope.Add("openid");
                    options.Scope.Add("offline_access");
                    options.Scope.Add("profile");
                    options.Scope.Add("erp");
                    options.SaveTokens = true;
                    //options.NonceCookie.SameSite = SameSiteMode.Lax;
                    //options.NonceCookie.SecurePolicy = CookieSecurePolicy.Always;
                    //options.CorrelationCookie.SameSite = SameSiteMode.Lax;
                    //options.CorrelationCookie.SecurePolicy = CookieSecurePolicy.Always;

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        NameClaimType = "preferred_username",
                        RoleClaimType = ClaimTypes.Role,
                        ValidateIssuer = true
                    };
                });

            builder.Services.AddControllersWithViews(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            });
            builder.Services.AddRazorPages();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
            app.MapRazorPages();

            app.Run();
        }
    }
}
