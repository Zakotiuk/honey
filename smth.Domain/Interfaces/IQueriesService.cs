using schoolButNot.Access;
using schoolButNot.DTO;
using schoolButNot.DTO.Models;
using System.Collections.Generic;
using System.Linq;

namespace schoolButNot.Domain.Interfaces
{
  public  interface IQueriesService
    {
        public ListStudentDTO GetStudents(GetQuerieModel model);
        public ListCoursesDTO GetCourses(GetQuerieModel model);
        public ProfileDTO GetProfile(string id);
       // public List<CourseDTO> GetCoursesForStudent(string idStudent);
    }
}