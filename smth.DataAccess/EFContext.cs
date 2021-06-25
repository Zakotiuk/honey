using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using schoolButNot.DataAccess.Entity;

namespace schoolButNot.Access
{
   public class EFContext : IdentityDbContext<ApplicationUser>
    {
        public EFContext(DbContextOptions<EFContext> options) : base (options){}
        public DbSet<Course> Courses { get; set; }
        public DbSet<SubscriptionOfUser> Subscriptions { get; set; }
    }
}