using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using Microsoft.AspNetCore.Identity;

namespace CaffStore.REST
{
    public class Startup
    {

        // currently using CORS to be able to call requests during development.
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.AllowAnyOrigin();
                                  });
            });

            services.AddControllers().AddNewtonsoftJson();
            services.AddDbContext<Dal.DataDrivenDbContext>();

            // firebase auth
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
            {
                opt.Authority = Configuration["Jwt:Firebase:ValidIssuer"];
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Firebase:ValidIssuer"],
                    ValidAudience = Configuration["Jwt:Firebase:ValidAudience"]
                };
            });
            
            /*
            services.AddAuthorization(opt =>
                opt.AddPolicy("admin", policy => policy.RequireClaim("admin", "true"))
            );

            services.AddAuthorization(opt =>
                opt.AddPolicy("user", policy => policy.RequireClaim("admin", "false", "true"))
            );
            */
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Only show PII for development
            if (env.IsDevelopment())
            {
                IdentityModelEventSource.ShowPII = true;
            }

            app.UseRouting();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
