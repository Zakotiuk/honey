using schoolButNot.DTO;
using smth.DTO.Models;

namespace smth.Domain.Interfaces
{
   public interface IAuthService
    {
        public void Register(UserRegisterDto model);
        public void Login(UserLoginDTO model);
        public void LoginWithFacebookAsync(UserFacebookLoginDTO model);
    }
}
