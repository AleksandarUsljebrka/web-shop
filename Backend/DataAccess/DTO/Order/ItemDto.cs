namespace DataAccess.DTO.Order
{
    public class ItemDto:IDto
    {
        public long? ArticleId { get; set; }

        public double PricePerUnit { get; set; }

        public int Quantity { get; set; }

        public string ArticleName { get; set; }

        public byte[] ArticleImage { get; set; }
    }
}
