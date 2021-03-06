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
using Microsoft.Extensions.Configuration;
using AutoMapper;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        IConfiguration _config;
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo,IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _mapper = mapper;
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

          
           var userToCreate = _mapper.Map<User>(userdto);
            var createUser = await _repo.Register(userToCreate, userdto.Password);
            var userReturn = _mapper.Map<UserForDetailedDto>(createUser);

            return CreatedAtAction("GetUser", new {controller = "users", id = createUser.Id},userReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userlogindto){
            var userFromRepo = await _repo.Login(userlogindto.Username.ToLower(),userlogindto.Password);
            if( userFromRepo == null ){
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:token").Value);

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
            return Ok(new {tokenString});
        }
    }
}