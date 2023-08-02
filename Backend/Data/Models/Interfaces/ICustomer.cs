using System.Collections.Generic;

namespace Data.Models.Interfaces
{
    public interface ICustomer : IUser
	{
		/// <summary>
		/// Navigational property.
		/// </summary>
		ICollection<Order> Orders { get; set; }
	}
}
