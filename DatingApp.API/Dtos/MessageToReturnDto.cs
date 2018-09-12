using System;
using DatingApp.API.Models;

namespace DatingApp.API.Dtos
{
    public class MessageToReturnDto
    {
        public int Id { set; get; }
        public int SenderId { set; get; }
        public string SenderPhotoUrl { set; get;}
        public string SenderKnownAs { set; get; }
        public int RecipientId { set; get; }
        public string RecipientUrl { set; get;}
        public string RecipientKnownAs { set; get; }
        public string Content { set; get; }
        public bool IsRead { set; get; }
        public DateTime? DateRead { set; get; }
        public DateTime MessageSend { set; get; }
    }
}