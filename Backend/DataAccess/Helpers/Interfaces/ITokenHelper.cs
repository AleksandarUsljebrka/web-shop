using Data.Models.Interfaces;

namespace DataAccess.Helpers.Interfaces
{
    public interface ITokenHelper
    {
        public bool PasswordValidation(string loginDtoPassword, string userPassword);
        public string GetToken(IUser user);
        public string GetClaim(string tokenStr, string type);

    }
}
