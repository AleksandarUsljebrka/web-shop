using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Interfaces
{
	public interface ISalesman : IUser
	{
		/// <summary>
		/// Navigational property specifying that a seller can have many articles.
		/// </summary>
		ICollection<Article> Articles { get; set; }

		SalesmanStatus ApprovalStatus { get; set; }
	}
}
