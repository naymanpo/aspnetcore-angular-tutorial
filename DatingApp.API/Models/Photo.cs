using System;

namespace DatingApp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { set; get; }
        public string Descriptions { set; get; }
        public DateTime DateAdded { set; get; }
        public bool IsMain { set; get; }

        public User User { set; get; }
        public int UserId { set; get; }

    }
}