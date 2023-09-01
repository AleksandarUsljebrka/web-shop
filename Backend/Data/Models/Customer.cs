using Data.Models.Interfaces;
using System;
using System.Collections.Generic;

namespace Data.Models
{
    public class Customer : User, ICustomer
	{

		public ICollection<Order> Orders { get; set; }

        public Customer(string firstname, string lastname, string username, string email, string address, string profileImage, DateTime birthdate)
           : base(firstname, lastname, username, email, address, profileImage, birthdate)
        {
           
            Orders = new List<Order>();
        }
    }
}
