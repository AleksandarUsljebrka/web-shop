using DataAccess.Helpers.Interfaces;
using FluentEmail.Core;
using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

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

        public  void SendEmail( string message)
        {
            string recipientEmail = "primalac.web2testmail@gmail.com";
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("WebShop", "aleksandar.web2testmail@gmail.com"));
            emailMessage.To.Add(new MailboxAddress("", recipientEmail));
            emailMessage.Subject = "Approval message";
            emailMessage.Body = new TextPart("html") { Text = message };

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                client.Authenticate("aleksandar.web2testmail@gmail.com", "zwsfthhntmciwwla");
                client.Send(emailMessage);
                client.Disconnect(true);
            }
        }

        




    }
}
