using DataAccess.DTO.Auth;
using DataAccess.Results;

namespace DataAccess.Services.Interfaces
{
    public interface IAuthService
    {
        public IResult Register(RegisterDto regDto);
        public IResult Login(LoginDto logDto);
        public IResult GoogleLogin(GoogleLoginDto idToken);
        public IResult GoogleRegister(GoogleLoginDto idToken);

    }
}
