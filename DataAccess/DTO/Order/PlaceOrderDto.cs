using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.Order
{
	public class PlaceOrderDto : IDto
	{
		public string Comment { get; set; }

		public string Address { get; set; }

		public ICollection<PlacedItemDto> Items { get; set; }
	}
}
