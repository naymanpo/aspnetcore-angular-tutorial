using System;
using System.Collections.Generic;
using DatingApp.API.Models;

namespace DatingApp.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { set; get; }
        public string Username { set; get; }
        public byte[] PasswordHash { set; get; }
        public byte[] PasswordSalt { set; get; }

        public string Gender { get; set; }
        public int Age { set; get; }
        public string KnownAs { set; get; }
        public DateTime Created { set; get; }
        public DateTime LastActive { set; get; }
        public string Introducation { set; get; }
        public string LookingFor { set; get; }
        public string Interests { set; get; }
        public string City { set; get; }
        public string Country { set; get; }
        public string PhotoUrl;
        public ICollection<PhotoForDetailedDto> Photos { set; get; }

       
    }
}