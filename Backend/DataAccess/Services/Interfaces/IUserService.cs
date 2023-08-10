using DataAccess.DTO.User;
using DataAccess.Results;

namespace DataAccess.Services.Interfaces
{
    public interface IUserService
    {
        IResult GetUser(string token);
        IResult UpdateUser(string token, UserDto newUserDto);
        IResult ChangePassword(string token, PasswordDto passwordDto);
        IResult GetProfileImage(string token);
        IResult UpdateProfilImage(FormFileDto profilImage, string token);

    }
}
