using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Dtos;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System;

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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userlogindto){
            var userFromRepo = await _repo.Login(userlogindto.Username.ToLower(),userlogindto.Password);
            if( userFromRepo == null ){
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes("super secret Key");

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim( ClaimTypes.NameIdentifier , userFromRepo.Id.ToString()),
                    new Claim( ClaimTypes.Name , userFromRepo.Username)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken( token );
            return Ok(tokenString);
        }
    }
}