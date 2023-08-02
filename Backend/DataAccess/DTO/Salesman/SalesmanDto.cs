using Data.Models.Interfaces;
using System;

namespace DataAccess.DTO.Salesman
{
    public class SalesmanDto:IDto
    {
		public string Firstname { get; set; }

		public string Lastname { get; set; }

		public string Username { get; set; }

		public string Email { get; set; }

		public string Password { get; set; }

		public string Address { get; set; }

		public byte[] SellerProfileImage { get; set; }

		public DateTime Birthdate { get; set; }

		public SalesmanStatus ApprovalStatus { get; set; }
	}
}
