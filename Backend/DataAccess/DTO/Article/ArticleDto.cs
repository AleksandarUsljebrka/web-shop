namespace DataAccess.DTO.Article
{
    public class ArticleDto:IDto
    {
		public long Id { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public int Quantity { get; set; }

		public double Price { get; set; }

		public byte[] ProductImage { get; set; }
	}
}
