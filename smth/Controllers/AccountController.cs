using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using schoolButNot.Access;
using schoolButNot.API.Helper;
using schoolButNot.Domain.Implements;
using schoolButNot.DTO;
using smth.Domain.Helper;
using smth.Domain.Interfaces;
using smth.DTO.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace schoolButNot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly EFContext context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IJWTTokenService jwtTokenService;
        private readonly IFacebookAuthService facebookAuthService;
        private readonly IEmailService mailService;
        public AccountController(EFContext context,
                                                UserManager<ApplicationUser> userManager,
                                                SignInManager<ApplicationUser> signInManager,
                                                IJWTTokenService services,
                                                IFacebookAuthService facebookAuthService,
                                                IEmailService mailService)
        {
            this.context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
            jwtTokenService = services;
            this.facebookAuthService = facebookAuthService;
            this.mailService = mailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not valid password or email");
            }

            var emailCheck = context.Users.FirstOrDefault(t => t.Email == model.Email);
            if (emailCheck != null)
            {
                return BadRequest("Email already exists");
            }

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                Age = model.Age,
                Lastname = model.Lastname,
                Name = model.Name,
                RegistrationDate = DateTime.Now.ToShortDateString()
            };

            IdentityResult result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(CustomValidator.GetErrorsByIdentityResult(result));
            }
            await userManager.AddToRoleAsync(user, "Student");
            context.SaveChanges(); // викинути це в сервіс

            var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = Url.Action(
                "ConfirmEmail",
                "Account",
                new { userId = user.Id, code = code },
                protocol: HttpContext.Request.Scheme);

            var request = new EmailRequest();
            request.Subject = "Confirm your account";
            request.ToEmail = model.Email;
            request.IsRegistration = true;
            request.CallbackURL = callbackUrl;

            await mailService.SendEmailAsync(request);

            return Ok(
                new
                {
                    token = jwtTokenService.CreateToken(user)
                });
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return BadRequest("Error");
            }
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("Error");
            }
            var result = await userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
                return BadRequest("Error");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please, enter all fields");
            }
            var result = signInManager
                  .PasswordSignInAsync("user@gmail.com", model.Password,
                                                       false, false).Result;

            if (result.Succeeded)
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                if (!await userManager.IsEmailConfirmedAsync(user))
                {
                    return BadRequest("Your email is not confirmed");
                }
                else
                {
                    await signInManager.SignInAsync(user, false);
                    return Ok(
                              new
                              {
                                  token = jwtTokenService.CreateToken(user)
                              });
                }
            }
            else
            {
                return BadRequest("There is no user with this login and password");
            };
        }

        [HttpPost("facebook-login")]
        public async Task<IActionResult> LoginWithFacebookAsync([FromBody] UserFacebookLoginDTO model)
        {
            var validatedTokenReslt = await facebookAuthService.ValidateAccessTokenAsync(model.accessToken);
            if (!validatedTokenReslt.Data.is_valid)
            {
                return BadRequest("Incorrect facebook login");
            }
            else
            {
                var user = await userManager.FindByEmailAsync(model.email);
                if (user == null)
                {
                    var identityUser = new ApplicationUser
                    {
                        Email = model.email,
                        UserName = model.email,
                        Name = model.first_name,
                        Lastname = model.last_name,
                        Age = 0,
                        RegistrationDate = DateTime.UtcNow.ToShortDateString()
                    };

                    var createdResult = await userManager.CreateAsync(identityUser);
                    if (!createdResult.Succeeded)
                    {
                        return BadRequest(createdResult.Errors);
                    }
                    else
                    {
                        await userManager.AddToRoleAsync(identityUser, "Student");
                        return Ok(new
                        {
                            token = jwtTokenService.CreateToken(identityUser)
                        });
                    }
                }
                return Ok(new
                {
                    token = jwtTokenService.CreateToken(user)
                });
            }
        }
    }
}