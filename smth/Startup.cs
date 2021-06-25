using Hangfire;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using schoolButNot.Access;
using schoolButNot.Domain.Helper;
using schoolButNot.Domain.Implements;
using schoolButNot.Domain.Interfaces;
using smth.Domain.FacebookModel;
using smth.Domain.Helper;
using smth.Domain.Implements;
using smth.Domain.Interfaces;
using System;
using System.Text;

namespace smth
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddTransient<IJWTTokenService, JWTTokenService>();
            services.AddTransient<IQueriesService, QueriesService>();
            services.AddTransient<ICommandService, CommandService>();
            services.AddTransient<IEmailService, EmailService>();

            services.AddDbContext<EFContext>(opt =>
                  opt.UseSqlServer(Configuration["ConnectionString"],
                  b => b.MigrationsAssembly("smth")).EnableSensitiveDataLogging()
              );

            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));


            services.AddIdentity<ApplicationUser, IdentityRole>()
           .AddEntityFrameworkStores<EFContext>()
           .AddDefaultTokenProviders();

            var facebookAuthSettings = new FacebookAuthSetting();
            Configuration.Bind(nameof(FacebookAuthSetting), facebookAuthSettings);
            services.AddSingleton(facebookAuthSettings);

            services.AddHttpClient();
            services.AddSingleton<IFacebookAuthService, FacebookAuthService>();
            services.AddTransient<IJWTTokenService, JWTTokenService>();

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("SecretPhrase")));

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            });

            services.AddHangfire(configuration => configuration
            .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
            .UseSimpleAssemblyNameTypeSerializer()
            .UseRecommendedSerializerSettings()
            .UseSqlServerStorage(Configuration["ConnectionString"], new SqlServerStorageOptions
            {
                 CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
                 SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
                 QueuePollInterval = TimeSpan.Zero,
                 UseRecommendedIsolationLevel = true,
                 DisableGlobalLocks = true
            }));
            services.AddHangfireServer();

            services.AddScoped<IQueriesService, QueriesService>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    // set ClockSkew is zero
                    ClockSkew = TimeSpan.Zero
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }


            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            //SeederDatabase.SeedData(app.ApplicationServices, env, Configuration);
        }
    }
}
