using schoolButNot.DTO.Models;
using System.Collections.Generic;

namespace schoolButNot.DTO
{
   public class StudentDTO
    {
        public string Key { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Age { get; set; }
        public string Email { get; set; }
        public string RegistrationDate { get; set; } 
        public string StudyDate { get; set; }
        public List<CourseDTO> Courses { get; set; }
    }
}