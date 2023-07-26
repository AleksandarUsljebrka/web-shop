using DataAccess.DTO.User;
using DataAccess.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Services.Interfaces
{
    public interface IUserService
    {
        IResult GetUser(string token);
        IResult UpdateUser(string token, UserDto newUserDto);
        IResult ChangePassword(string token, PasswordDto passwordDto);

    }
}
