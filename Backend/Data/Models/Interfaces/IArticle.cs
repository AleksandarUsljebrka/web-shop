using System.Collections.Generic;

namespace Data.Models.Interfaces
{
    public interface IArticle
	{
		long Id { get; set; }

		string Name { get; set; }

		string Description { get; set; }

		int Quantity { get; set; }

		double Price { get; set; }

		string ProductImage { get; set; }

		/// <summary>
		/// Foreign key.
		/// </summary>
		long SalesmanId { get; set; }

		/// <summary>
		/// Navigational property.
		/// </summary>
		Salesman Salesman{ get; set; }

		/// <summary>
		/// Navigational property.
		/// </summary>
		ICollection<Item> Items { get; set; }
	}
}
