//using Microsoft.AspNetCore.Identity;
//using schoolButNot.Access;
//using schoolButNot.Domain.Implements;
//using schoolButNot.DTO;
//using smth.Domain.Interfaces;
//using smth.DTO.Models;
//using System.Linq;

//namespace smth.Domain.Implements
//{
//    public class AuthService : IAuthService
//    {

//        private readonly EFContext context;
//        private readonly UserManager<ApplicationUser> userManager;
//        private readonly SignInManager<ApplicationUser> signInManager;
//        private readonly IJWTTokenService jwtTokenService;
//        private readonly IFacebookAuthService facebookAuthService;
//        private readonly IEmailService mailService;
//        public AuthService (EFContext context,
//                                                UserManager<ApplicationUser> userManager,
//                                                SignInManager<ApplicationUser> signInManager,
//                                                IJWTTokenService services,
//                                                IFacebookAuthService facebookAuthService,
//                                                IEmailService mailService)
//        {
//            this.context = context;
//            this.userManager = userManager;
//            this.signInManager = signInManager;
//            jwtTokenService = services;
//            this.facebookAuthService = facebookAuthService;
//            this.mailService = mailService;
//        }


//        public void Login(UserLoginDTO model) // дописати це щастя
//        {
//            var emailCheck = context.Users.FirstOrDefault(t => t.Email == model.Email);
//            if (emailCheck != null)
//            {
//                return BadRequest("Email already exists");
//            }

//            var user = new ApplicationUser
//            {
//                UserName = model.Email,
//                Email = model.Email,
//                Age = model.Age,
//                Lastname = model.Lastname,
//                Name = model.Name,
//                RegistrationDate = DateTime.Now.ToShortDateString()
//            };

//            IdentityResult result = await userManager.CreateAsync(user, model.Password);

//            if (!result.Succeeded)
//            {
//                return BadRequest(CustomValidator.GetErrorsByIdentityResult(result));
//            }
//            await userManager.AddToRoleAsync(user, "Student");
//            context.SaveChanges(); // викинути це в сервіс

//            var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
//            var callbackUrl = Url.Action(
//                "ConfirmEmail",
//                "Account",
//                new { userId = user.Id, code = code },
//                protocol: HttpContext.Request.Scheme);

//            var request = new EmailRequest();
//            request.Subject = "Confirm your account";
//            request.ToEmail = model.Email;
//            request.IsRegistration = true;
//            request.CallbackURL = callbackUrl;

//            await mailService.SendEmailAsync(request);
//        }

//        public void LoginWithFacebookAsync(UserFacebookLoginDTO model)
//        {
//            throw new System.NotImplementedException();
//        }

//        public void Register(UserRegisterDto model)
//        {
//            throw new System.NotImplementedException();
//        }
//    }
//}
