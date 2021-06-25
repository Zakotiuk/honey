using FluentValidation;
using System;

namespace schoolButNot.DTO
{
    public class UserRegisterDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public int Age { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime StudyDate { get; set; }
    }

    public class UserRegisterValidation : AbstractValidator<UserRegisterDto>
    {
        public UserRegisterValidation()
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Lastname).NotEmpty();
            RuleFor(x => x.Age).NotEmpty();
        }
    }
}