using System;

namespace DatingApp.API.Dtos
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public string Url { set; get; }
        public string Descriptions { set; get; }
        public DateTime DateAdded { set; get; }
        public bool IsMain { set; get; }
        public string PublicId { set; get; }
    }
}