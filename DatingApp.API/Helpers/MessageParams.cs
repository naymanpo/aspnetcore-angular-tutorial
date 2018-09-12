namespace DatingApp.API.Helpers
{
    public class MessageParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { set; get; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value <= MaxPageSize) ? value : MaxPageSize; }
        }
        public int UserId { set; get; }
        public string MessageContainer { set; get;} = "Unread";
    }
}