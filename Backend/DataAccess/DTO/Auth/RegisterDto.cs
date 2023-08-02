using System;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.DTO.Auth
{
    public class RegisterDto : IDto
    {
		[Required(ErrorMessage ="Please enter first name!")]
		public string Firstname { get; set; }

		[Required(ErrorMessage = "Please enter last name!")]
		public string Lastname { get; set; }
		
		[Required(ErrorMessage = "Please enter username!")]
		public string Username { get; set; }

		[Required(ErrorMessage = "Please enter email!")]
		public string Email { get; set; }

		[Required(ErrorMessage = "Please enter password!")]
		public string Password { get; set; }
		public string ConfirmPassword { get; set; }
		[Required(ErrorMessage = "Please enter Address!")]
		public string Address { get; set; }

		[Required(ErrorMessage = "Please enter role!")]
		public string Role { get; set; }

		//[Required(ErrorMessage = "Please enter profile image!")]
		//public IFormFile ProfileImage { get; set; }

		[Required(ErrorMessage = "Please enter birthdate!")]
		public DateTime Birthdate { get; set; }
	}
}
