namespace DatingApp.API.Models
{
    public class Like
    {
        public int LikerId {set;get;}
        public int LikeeId { set; get; }
        public User Liker {set;get;}
        public User Likee { set; get;}
    }
}