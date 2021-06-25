using System.Collections.Generic;

namespace schoolButNot.DTO.Models
{
   public class ListCoursesDTO
    {
        public List<CourseDTO> Courses { get; set; }
        public int sizeOfPage { get; set; }
        public int totalCount { get; set; }
    }
}