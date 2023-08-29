using FluentEmail.Core;

namespace DataAccess.Helpers.Interfaces
{
    public interface IAuthHelper
    {
        bool IsValidEmail(string email);
        string HashPassword(string password);

        bool IsPasswordValid(string pass, string hashPass);
        void SendEmail(string message);

    }
}
