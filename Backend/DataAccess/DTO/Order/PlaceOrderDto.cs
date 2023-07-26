using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.Order
{
	public class PlaceOrderDto : IDto
	{
		[Required(ErrorMessage = "Please enter comment!")]
		public string Comment { get; set; }

		[Required(ErrorMessage = "Please enter Address")]
		public string Address { get; set; }

		
		public ICollection<PlacedItemDto> Items { get; set; }
	}
}
