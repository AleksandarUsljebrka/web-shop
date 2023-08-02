using System.Collections.Generic;

namespace DataAccess.DTO.Order
{
    public class OrderListDto:IDto
    {
        public List<OrderDto> Orders { get; set; }
    }
}
