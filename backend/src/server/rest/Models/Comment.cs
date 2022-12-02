using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Models
{
    public class Comment
    {

        public Comment(int id, string text, DateTime creationDate, int userId, int caffId, string userName)
        {
            Id = id;
            Text = text;
            CreationDate = creationDate;
            UserId = userId;
            CaffId = caffId;
            UserName = userName;
        }

        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public int UserId { get; set; }
        public int CaffId { get; set; }
        public string UserName { get; set; }
    }
}
