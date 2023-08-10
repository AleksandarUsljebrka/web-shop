using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.User
{
    public class ImgByteDto:IDto
    {
        public byte[] ProfileImage { get; set; }

    }
}
