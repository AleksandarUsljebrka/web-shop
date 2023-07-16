using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Helpers.Interfaces
{
    public interface IAuthHelper
    {
        public bool IsValidEmail(string email);
        public string HashPassword(string password);


    }
}
