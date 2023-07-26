using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.Salesman
{
    public class SalesmanListDto:IDto
    {
        public List<SalesmanDto> Salesmen { get; set; }
    }
}
