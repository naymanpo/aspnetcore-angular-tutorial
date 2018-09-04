using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username{set; get;}
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password must between 4 to 8 characters")]
        public string Password {set; get; }
    }
}