
using Data.Models;
using Data.Models.Interfaces;
using DataAccess.Helpers.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Helpers
{
    public class TokenHelper:ITokenHelper
    {
        string _key;

        readonly int sslPort = 44365;

        public TokenHelper(IConfiguration configuration)
        {
            _key = configuration.GetSection("SecretKey").Value;
        }
        public bool PasswordValidation(string loginDtoPassword, string userPassword)
        {
            if (BCrypt.Net.BCrypt.Verify(loginDtoPassword, userPassword))
                return true;
            else
                return false;

        }

        public string GetToken(IUser user)
        {
            List<Claim> claims = new List<Claim>();

            if (user is Admin)
            {

                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                claims.Add(new Claim("role", "Admin"));
                claims.Add(new Claim("id", user.Id.ToString()));
                claims.Add(new Claim("username", user.Username));

            }
            else if(user is Salesman)
            {
                claims.Add(new Claim(ClaimTypes.Role, "Salesman"));
                claims.Add(new Claim("role", "Salesman"));
                claims.Add(new Claim("id", user.Id.ToString()));
                claims.Add(new Claim("username", user.Username));
                claims.Add(new Claim("status", ((Salesman)user).ApprovalStatus.ToString()));
            }
            else if(user is Customer)
            {
                claims.Add(new Claim(ClaimTypes.Role, "Customer"));
                claims.Add(new Claim("role", "Customer"));
                claims.Add(new Claim("id", user.Id.ToString()));
                claims.Add(new Claim("username", user.Username));
            }

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: $"http://localhost:{sslPort}", //url servera koji je izdao token
                claims: claims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: signinCredentials
            );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }

        public string GetClaim(string tokenStr, string type)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.ReadJwtToken(tokenStr);

            string claim = token.Claims.Where(c => c.Type == type).FirstOrDefault().Value;

            return claim;
        }
    }
}
