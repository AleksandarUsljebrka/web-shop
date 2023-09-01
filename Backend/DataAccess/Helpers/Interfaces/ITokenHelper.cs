using Data.Models.Interfaces;
using Google.Apis.Auth;

namespace DataAccess.Helpers.Interfaces
{
    public interface ITokenHelper
    {
        bool PasswordValidation(string loginDtoPassword, string userPassword);
        string GetToken(IUser user);
        string GetTokenGoogle(IUser user);

        string GetClaim(string tokenStr, string type);
        string GetTokenFromGooglePayload(GoogleJsonWebSignature.Payload payload);


    }
}
