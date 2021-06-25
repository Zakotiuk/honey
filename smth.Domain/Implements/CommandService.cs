using Microsoft.AspNetCore.Identity;
using schoolButNot.Access;
using schoolButNot.DataAccess.Entity;
using schoolButNot.Domain.Interfaces;
using schoolButNot.DTO;
using schoolButNot.DTO.Models;
using System;
using System.Linq;
using Hangfire;
using smth.Helper;
using smth.Domain.Interfaces;
using smth.Domain.Helper;
using System.Security.Claims;
using smth.DTO.Models;

namespace schoolButNot.Domain.Implements
{
    public class CommandService : ICommandService
    {
        private EFContext context;
        private readonly IEmailService emailService;
        private UserManager<ApplicationUser> userManager;
        public CommandService(EFContext context,
                                                IEmailService email,
                                                UserManager<ApplicationUser> manager)
        {
            this.context = context;
            emailService = email;
            userManager = manager;
        }

        public void AddCourse(AddCourseDTO model)
        {
            context.Courses.Add(new Course
            {
                Image = model.Image,
                Title = model.Title
            });
            context.SaveChanges();
        }

        public void DeleteCourse(int id)
        {
            var removeItem = context.Courses.FirstOrDefault(c => c.Id == id);
            context.Courses.Remove(removeItem);
            context.SaveChanges();
        }

        public void EditStudent(EditStudentDTO model)
        {
            var editStudent = context.Users.FirstOrDefault(s => s.Id == model.Id);
            editStudent.Name = model.Name;
            editStudent.Lastname = model.Lastname;
            editStudent.Age = model.Age;
            editStudent.Email = model.Email;
            context.SaveChanges();
        }
        public void SubscriptionOfuser(SubscriptionOfUserDTO model)
        {
            // var userId = System.Web.HttpContext.Current.User.Identity.Name;
            //var userId = ApplicationUser.FindFirstValue(ClaimTypes.NameIdentifier);
           // var userId = userManager.GetUserId(curentUser);
            context.Subscriptions.Add(new SubscriptionOfUser
            {
                CourseId = Convert.ToInt32(model.CourseId),
                StartDate = model.StartDate,
                UserId = model.StudentId 
            });
            
            Days daysConstants = new Days(model.StartDate);
            EmailRequest request = new EmailRequest();
            var student = context.Users.FirstOrDefault(t => t.Id == model.StudentId);
            if (student != null) 
            {
                var currentDate = DateTime.UtcNow;
                request.Subject = "Notification";
                request.ToEmail = student.Email;
                request.StudyDate = student.StudyDate;
                if (model.StartDate > currentDate) 
                {
                    if (currentDate.AddDays(+7) <= model.StartDate)
                    {
                        var job7days = BackgroundJob.Schedule(
                            () => emailService.SendEmailAsync(request), daysConstants.SevenDay);
                    }
                    else if (currentDate.AddDays(+30) <= model.StartDate)
                    {
                        var job30days = BackgroundJob.Schedule(
                             () => emailService.SendEmailAsync(request), daysConstants.ThirtyDays);
                    }
                    else
                    {
                        var job1day = BackgroundJob.Schedule(
                             () => emailService.SendEmailAsync(request), daysConstants.OneDays);
                    }
                }
            } 
            context.SaveChanges();
        }

        public void Unsubscription(UnsubscriptionOfUserDTO model)
        {
            var subs = context.Subscriptions.FirstOrDefault(t => t.UserId == model.StudentId && t.CourseId == Convert.ToInt32( model.CourseId));
            context.Subscriptions.Remove(subs);
            context.SaveChanges();
        }
    }
}