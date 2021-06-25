using FluentValidation;

namespace schoolButNot.DTO
{
    public class UserLoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserLoginValidation : AbstractValidator<UserLoginDTO> {
        public UserLoginValidation()
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}