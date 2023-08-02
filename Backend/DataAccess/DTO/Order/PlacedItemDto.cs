namespace DataAccess.DTO.Order
{
    public class PlacedItemDto : IDto
	{
		public int Quantity { get; set; }

		public long ArticleId { get; set; }
	}
}
