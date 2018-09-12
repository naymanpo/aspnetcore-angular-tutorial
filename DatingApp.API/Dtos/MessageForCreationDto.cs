using System;

namespace DatingApp.API.Dtos
{
    public class MessageForCreationDto
    {
        public int SenderId { set; get; }
        public int RecipientId { set; get;}
        public DateTime MessageSend { set; get;}
        public string Content { set; get; }
        public MessageForCreationDto()
        {   
            MessageSend = DateTime.Now;
        }

    }
}