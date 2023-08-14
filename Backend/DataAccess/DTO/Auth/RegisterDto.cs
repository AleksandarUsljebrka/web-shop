﻿using Microsoft.AspNetCore.Http;
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

		[Required(ErrorMessage = "Please enter the password!")]
		public string Password { get; set; }
		[Required(ErrorMessage = "Please confirm the password!")]

		public string ConfirmPassword { get; set; }
		[Required(ErrorMessage = "Please enter Address!")]
		public string Address { get; set; }

		[Required(ErrorMessage = "Please enter role!")]
		public string Role { get; set; }

		
		public IFormFile ProfileImage { get; set; }

		[Required(ErrorMessage = "Please enter birthdate!")]
		public DateTime Birthdate { get; set; }
	}
}
