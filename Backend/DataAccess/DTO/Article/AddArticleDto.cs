using Microsoft.AspNetCore.Http;

namespace DataAccess.DTO.Article
{
    public class AddArticleDto : IDto
	{

		public string Name { get; set; }

		public string Description { get; set; }

		public int Quantity { get; set; }

		public double Price { get; set; }

		public IFormFile ProductImage { get; set; }
	}
}
