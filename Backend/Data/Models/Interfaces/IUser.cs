using System;

namespace Data.Models.Interfaces
{
    public interface IUser
	{
		long Id { get; set; }

		string Firstname { get; set; }

		string Lastname { get; set; }

		string Username { get; set; }

		string Email { get; set; }

		string Password { get; set; }

		string Address { get; set; }

		DateTime Birthdate { get; set; }

		string ProfileImage { get; set; }
	}
}
