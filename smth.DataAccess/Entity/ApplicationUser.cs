using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using schoolButNot.DataAccess.Entity;

namespace schoolButNot.Access
{
    public class ApplicationUser : IdentityUser
    {
        [Required(ErrorMessage = "Name is required" )]
        public string Name { get; set; }
        [Required(ErrorMessage = "LastName is required")]
        public string Lastname { get; set; }
        [Required(ErrorMessage = "Age is required")]
        public int Age { get; set; }
        public string RegistrationDate { get; set; }
        public string StudyDate { get; set; }
        public List<SubscriptionOfUser> MyCourses { get; set; }
    }
}