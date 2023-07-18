using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.Order
{
    public class OrderListDto:IDto
    {
        public List<OrderDto> Orders { get; set; }
    }
}
