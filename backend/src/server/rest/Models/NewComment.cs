using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Models
{
    public class NewComment
    {
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
        public string UserId { get; set; }
        public int CaffId { get; set; }
    }
}
