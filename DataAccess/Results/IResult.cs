using DataAccess.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Results
{
    public interface IResult
    {
        bool Successfull { get; set; }
        string ErrorMess { get; set; }
        IDto Dto { get; set; }
        ErrorCode ErrorCode { get; set; }
    }
}
