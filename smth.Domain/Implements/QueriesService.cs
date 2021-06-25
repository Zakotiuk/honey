using Microsoft.EntityFrameworkCore;
using schoolButNot.Access;
using schoolButNot.Domain.Interfaces;
using schoolButNot.DTO;
using schoolButNot.DTO.Models;
using System.Linq;
using System.Collections.Generic;
using System;

namespace schoolButNot.Domain.Implements
{
    public class QueriesService : IQueriesService
    {
        private EFContext context;
        public QueriesService(EFContext context)
        {
            this.context = context;
        }

        public ListCoursesDTO GetCourses(GetQuerieModel model)
        {
            var listStudent = context.Courses.AsNoTracking().Select(s => new CourseDTO
            {
                Id = s.Id,
                Image = s.Image,
                Title = s.Title,
            })
                                                                                            .Where(b => b.Title.ToLower().Contains(model.searchText.ToLower()));

            var count = listStudent.Count();
            var items = listStudent.Skip((model.Page - 1) * model.sizeOfPage)
                                                .Take(model.sizeOfPage)
                                                .ToList();

            return new ListCoursesDTO
            {
                Courses = items,
                sizeOfPage = model.sizeOfPage,
                totalCount = count
            };
        }

        public ProfileDTO GetProfile(string id)
        {
            var user = context.Users.FirstOrDefault(t => t.Id == id);
            //var courses = GetCoursesForStudent(id);
            ProfileDTO profile = new ProfileDTO
            {
                Age = user.Age,
                Email = user.Email,
                Name = user.Name,
                Lastname = user.Lastname,
                Courses = null //courses
            };
            return profile;
        }

        public ListStudentDTO GetStudents(GetQuerieModel model)
        {
            IQueryable<StudentDTO> students = context.Users.Where(u => u.Lastname.Contains(model.searchText)
                                                                                                                || u.Name.Contains(model.searchText)
                                                                                                                || u.Email.Contains(model.searchText))
                                                                                                .Include(t => t.MyCourses)
                                                                                                .Select(s => new StudentDTO
                                                                                                {
                                                                                                    Age = s.Age.ToString(),
                                                                                                    Email = s.Email,
                                                                                                    Name = s.Name,
                                                                                                    Lastname = s.Lastname,
                                                                                                    Courses = null,
                                                                                                    Key = s.Id
                                                                                                });
            var count = students.Count();
            var items = students.Skip((model.Page - 1) * model.sizeOfPage)
                                             .Take(model.sizeOfPage)
                                             .ToList();
            return new ListStudentDTO
            {
                Students = items,
                sizeOfPage = model.sizeOfPage,
                totalCount = count
            };
        }
        // сортування
        //public List<CourseDTO> GetCoursesForStudent(string idStudent)
        //{
        //    var subscriptions = context.Subscriptions.Where(t => t.UserId == idStudent).ToList();
        //    List<CourseDTO> result = new List<CourseDTO>();
        //    foreach (var subscription in subscriptions)
        //    {
        //        var course = context.Courses.FirstOrDefault(t => t.Id == subscription.CourseId);
        //        var studentCourse = new CourseDTO
        //        {
        //            Id = course.Id,
        //            Image = course.Image,
        //            StartDate = subscription.StartDate.ToShortDateString(),
        //            Title = course.Title
        //        };
        //        result.Add(studentCourse);
        //    }
        //    return result;
        //}
    }
}