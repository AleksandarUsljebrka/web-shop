using System.ComponentModel.DataAnnotations;

namespace DataAccess.DTO.Auth
{
    public class LoginDto: IDto
    {
        [Required(ErrorMessage = "Please enter username!")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Please enter password!")]
        public string Password { get; set; }
        public string GoogleToken { get; set; }
    }
}
