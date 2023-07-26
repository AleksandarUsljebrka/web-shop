using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.User
{
    public class PasswordDto:IDto
    {
        public string OldPassword { get; set; }

        public string NewPassword { get; set; }

    }
}
