using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DatingApp.API.Models
{
    public class User
    {
        public int Id { set; get; }
        public string Username { set; get; }
        public byte[] PasswordHash { set; get; }
        public byte[] PasswordSalt { set; get;}

        public string Gender { get; set; }
        public DateTime DateOfBirth { set; get; }
        public string KnownAs { set; get; }
        public DateTime Created { set; get; }
        public DateTime LastActive { set; get; }
        public string Introduction { set; get; }
        public string LookingFor { set; get; }
        public string Interests { set; get; }
        public string City { set; get; }
        public string Country { set; get;}

        public ICollection<Photo> Photos { set; get; }
        public ICollection<Like> Liker { set; get;}
        public ICollection<Like> Likee { set;get;}

        public ICollection<Message> MessagesSent { set; get;}
        public ICollection<Message> MessagesReceived { set; get;}

        public User() {
            Photos = new Collection<Photo>();
        }
    }
}