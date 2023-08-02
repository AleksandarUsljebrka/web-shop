namespace DataAccess.DTO.User
{
    public class PasswordDto:IDto
    {
        public string OldPassword { get; set; }

        public string NewPassword { get; set; }

    }
}
