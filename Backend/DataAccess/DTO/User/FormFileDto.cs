using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.User
{
    public class FormFileDto:IDto
    {
        public IFormFile ProfileImage { get; set; }

    }
}
