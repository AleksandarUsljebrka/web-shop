using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.Auth
{
    public class GoogleLoginDto:IDto
    {
        public string Credential { get; set; }
        public string ClientId { get; set; }
        public string SelectBy { get; set; }
    }

}
