using DataAccess.DTO.Auth;
using DataAccess.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Services.Interfaces
{
    public interface IAuthService
    {
        public IResult Register(RegisterDto regDto);
    }
}
