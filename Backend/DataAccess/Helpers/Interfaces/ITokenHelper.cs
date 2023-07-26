using Data.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Helpers.Interfaces
{
    public interface ITokenHelper
    {
        public bool PasswordValidation(string loginDtoPassword, string userPassword);
        public string GetToken(IUser user);
        public string GetClaim(string tokenStr, string type);

    }
}
