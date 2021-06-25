using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using schoolButNot.Access;
using schoolButNot.Domain.Implements;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace schoolButNot.Domain.Interfaces
{
    public class JWTTokenService : IJWTTokenService
    {
        private readonly EFContext context;
        private readonly IConfiguration configuration;
        private readonly UserManager<ApplicationUser> userManager;
        public JWTTokenService(EFContext context, IConfiguration configuration, UserManager<ApplicationUser> userManager)
        {
            this.configuration = configuration;
            this.context = context;
            this.userManager = userManager;
        }

        public string CreateToken(ApplicationUser user)
        {
            var roles = userManager.GetRolesAsync(user).Result;
            var claims = new List<Claim> {
                new Claim("id", user.Id),
                new Claim("email", user.Email),
                };

            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            string jwtToketSecretKey = configuration["SecretPhrase"];
            var signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtToketSecretKey));
            var signInCredentias = new SigningCredentials(signInKey, SecurityAlgorithms.HmacSha256);

            var jwtToken = new JwtSecurityToken(
                signingCredentials: signInCredentias,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(14)
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }
    }
}