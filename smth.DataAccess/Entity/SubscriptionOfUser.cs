using schoolButNot.Access;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace schoolButNot.DataAccess.Entity
{
    [Table("tblSubscriptionOfUser")]
   public class SubscriptionOfUser
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        [ForeignKey("Course")]
        public int CourseId { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual Course Course { get; set; }
    }
}