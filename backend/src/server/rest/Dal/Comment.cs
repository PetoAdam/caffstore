using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Dal
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public int UserId { get; set; }
        public int CaffId { get; set; }
    }
}
