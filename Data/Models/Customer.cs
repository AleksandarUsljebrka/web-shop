using Data.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
	public class Customer : User, ICustomer
	{
		public ICollection<Order> Orders { get; set; }
	}
}
