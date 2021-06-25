using schoolButNot.DTO;
using schoolButNot.DTO.Models;
using smth.DTO.Models;

namespace schoolButNot.Domain.Interfaces
{
   public interface ICommandService
    {
        public void EditStudent(EditStudentDTO model);
        public void AddCourse(AddCourseDTO model);
        public void DeleteCourse(int id);
        public void SubscriptionOfuser(SubscriptionOfUserDTO model);
        public void Unsubscription(UnsubscriptionOfUserDTO model);
    }
}