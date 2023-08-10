using Data.Models.Interfaces;
using Microsoft.AspNetCore.Http;

namespace DataAccess.Helpers.Interfaces
{
    public interface IUserHelper
    {
        public bool UserExists(string username, string email);
        public IUser UserByEmail(string email);
        public IUser UserByUsername(string username);
        public IUser UserByToken(string token, ITokenHelper _tokenHelper);
       
    }
}
