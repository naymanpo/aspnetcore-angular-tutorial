using System;

namespace DatingApp.API.Models
{
    public class Message
    {
        public int Id { set; get;}
        public int SenderId {set;get;}
        public User Sender { set;get;}
        public int RecipientId { set; get;}
        public User Recipient { set; get;}
        public string Content { set; get;}
        public bool IsRead { set; get; }
        public DateTime? DateRead { set; get;}
        public DateTime MessageSend { set; get;}
        public bool SenderDeleted { set; get;}
        public bool RecipientDeleted { set; get; }
    }
}