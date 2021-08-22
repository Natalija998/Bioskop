using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Bioskop.Models;
using System.Text.Json;

namespace Bioskop
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

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Bioskop", Version = "v1" });
            });
            services.AddCors(p => 
            {
                p.AddPolicy("CORS", builder => 
                {
                    builder.AllowAnyMethod()
                           .AllowAnyOrigin()
                           .AllowAnyHeader();
                });
            });
            services.AddDbContext<BioskopContext>(options => 
            {
                options.UseSqlServer(Configuration.GetConnectionString("BioskopCS"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Bioskop v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CORS");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
    // public class Startup
    // {
    //     public Startup(IConfiguration configuration)
    //     {
    //         Configuration = configuration;
    //     }

    //     public IConfiguration Configuration { get; }

    //     // This method gets called by the runtime. Use this method to add services to the container.
    //     public void ConfigureServices(IServiceCollection services)
    //     {

    //         services.AddDbContext<BioskopContext>(options =>
    //         {
    //             // Radi se o SQL Server bazi podataka (LocalDB)
    //             options.UseSqlServer(
    //                 // Ovako može da se preuzme connection string koji je u appsettings.json
    //                 Configuration.GetConnectionString("BioskopCS"));
    //         });
    //         services.AddMvc().AddJsonOptions(options =>
    //         {
    //             // CamelCase je standard koji JSON koristi i treba ga se pridržavati
    //             // Ukoliko se ne stavi ništa, takođe će default da bude CamelCase
    //             // null je da nema transformacije, pa ukoliko su Property-ji u C#-u nazvani po standardu, koristiće se PascalCase
    //             options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    //         });

    //         // Cors mora da se omogući, putem servisa i na nivou aplikacije, kontrolera ili metode
    //         services.AddCors(options => 
    //         {
    //             // CORS je naziv policy koja će da se koristi, a builder podešava policy
    //             options.AddPolicy("CORS", builder =>
    //             {
    //                 builder.AllowAnyHeader()
    //                        .AllowAnyMethod()
    //                        .WithOrigins("http://127.0.0.1:5500",
    //                                     "http://localhost:5500",
    //                                     "http://127.0.0.1:8080",
    //                                     "http://localhost:8080",
    //                                     "http://localhost:5001",
    //                                     "http://localhost:5000"
    //                                     );
    //                         // Dodati bilo koji drugi IP, adresu ili port sa
    //                         // kojeg Web API treba da može da se pozove

    //                         // Da bi omogućili pozivanje sa bilo koje adrese i porta...
    //                         //.AllowAnyOrigin();
    //             });
    //         });
    //         services.AddControllers();
    //         services.AddSwaggerGen(c =>
    //         {
    //             c.SwaggerDoc("v1", new OpenApiInfo { Title = "Bioskop", Version = "v1" });
    //         });
    //     }

    //     // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    //     public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    //     {
            
    //         if (env.IsDevelopment())
    //         {
    //             app.UseDeveloperExceptionPage();
    //             app.UseSwagger();
    //             app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Bioskop v1"));
    //         }

    //         app.UseHttpsRedirection();

    //         app.UseRouting();

    //         app.UseAuthorization();

    //         app.UseEndpoints(endpoints =>
    //         {
    //             endpoints.MapControllers();
    //         });
    //     }
    // }
}
