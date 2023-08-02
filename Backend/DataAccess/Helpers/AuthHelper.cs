using DataAccess.Helpers.Interfaces;
using System;
using System.Net.Mail;

namespace DataAccess.Helpers
{
    public class AuthHelper: IAuthHelper
    {
        public string HashPassword(string password)
        {
            //string salt = BCrypt.Net.BCrypt.GenerateSalt(12);
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        public bool IsValidEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return false;
            }
            try
            {
                var mailAddress = new MailAddress(email);
                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }
    
        public bool IsPasswordValid(string pass, string hashPass)
        {
            return BCrypt.Net.BCrypt.Verify(pass, hashPass);
        }

    }
}
