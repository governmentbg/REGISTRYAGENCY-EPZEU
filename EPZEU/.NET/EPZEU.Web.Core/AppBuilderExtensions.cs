using EPZEU.Web.Http;

namespace Microsoft.AspNetCore.Builder
{
    public static class AppBuilderExtensions
    {
        /// <summary>
        /// Настройва автентикацията да ползва EPZEUCRPrincipal.
        /// </summary>
        public static IApplicationBuilder UseAuthenticationWithEPZEUPrincipal(this IApplicationBuilder app)
        {
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEPZEUPrincipalMiddleware();

            return app;
        }

        public static IApplicationBuilder UseEPZEUPrincipalMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<EPZEUPrincipalMiddleware>();
            return app;
        }

        public static IApplicationBuilder UseSerilogUserIdentityContext(this IApplicationBuilder app)
        {
            app.UseMiddleware<SerilogUserIdentityContextMiddleware>();

            return app;
        }
    }
}
