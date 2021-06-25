using schoolButNot.DTO.Models;
using System.Collections.Generic;

namespace schoolButNot.DTO
{
   public class ProfileDTO
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public List<CourseDTO> Courses { get; set; }
    }
}