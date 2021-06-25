using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using schoolButNot.Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace schoolButNot.API.Helper
{
    public class SeederDatabase
    {
        public static void SeedData(IServiceProvider services,
        IWebHostEnvironment env,
        IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();
                SeedUsers(manager, managerRole); 
            }
        }
        public static void SeedUsers(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var roleName = "Admin";
            if (roleManager.FindByNameAsync(roleName).Result == null)
            {
                var resultAdminRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Admin"
                }).Result;
            }
            roleName = "Student";
            if (roleManager.FindByNameAsync(roleName).Result == null)
            {
                var resultStudentRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Student"
                }).Result;
            }

            string email = "admin@gmail.com";
            var admin = new ApplicationUser
            {
                Email = email,
                UserName = email,
                Age = 30,
                Name = "Name",
                Lastname = "Lustname"
            };

            email = "student@gmail.com";
            var student = new ApplicationUser
            {
                Email = email,
                UserName = email,
                Age = 15,
                Name = "Viktoria",
                Lastname = "Zakotiuk",
                RegistrationDate = DateTime.Now.ToShortDateString(),
            };

         
            var resultStudent = userManager.CreateAsync(student, "Qwerty-1").Result;
            resultStudent = userManager.AddToRoleAsync(student, "Student").Result;

            var resultAdmin = userManager.CreateAsync(admin, "Qwerty1-").Result;
            resultAdmin = userManager.AddToRoleAsync(admin, "Admin").Result;
        }
    }
}