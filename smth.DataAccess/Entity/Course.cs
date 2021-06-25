using FluentValidation;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace schoolButNot.DataAccess.Entity
{
    [Table("tblCourses")]
     public  class Course
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public List<SubscriptionOfUser> Subscriptions { get; set; }

    }

    public class CourseValidation : AbstractValidator<Course>
    {
        public CourseValidation()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Image).NotEmpty();
        }
    }
}