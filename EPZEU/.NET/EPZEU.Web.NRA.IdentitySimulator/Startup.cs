using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace EPZEU.Web.NRA.IdentitySimulator
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsEnvironment("Development.Local"))
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {                
                endpoints.MapControllerRoute("default", "{controller=Token}/{action=Index}/{id?}");
                endpoints.MapControllerRoute("createtoken", "{controller=Token}/{action=CreateToken}/");
            });
        }
    }
}
