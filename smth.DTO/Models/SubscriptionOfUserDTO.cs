using System;

namespace schoolButNot.DTO.Models
{
   public class SubscriptionOfUserDTO
    {
        public string CourseId { get; set; }
        public string StudentId { get; set; }

        public DateTime StartDate { get; set; }
    }
}