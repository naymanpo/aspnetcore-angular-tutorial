using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Dtos;
namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserForRegisterDto userdto)
        {
           
           if( !ModelState.IsValid ){
               return BadRequest(ModelState);
           }

            userdto.Username = userdto.Username.ToLower();
            if (await _repo.UserExists(userdto.Username))
            {
                return BadRequest("User have already");
            };

            var userToCreate = new User
            {
                Username = userdto.Username
            };
            var createUser = await _repo.Register(userToCreate, userdto.Password);

            return StatusCode(201);
        }
    }
}