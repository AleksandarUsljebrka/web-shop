using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.Order
{
	public class PlacedItemDto : IDto
	{
		public int Quantity { get; set; }

		public long ArticleId { get; set; }
	}
}
