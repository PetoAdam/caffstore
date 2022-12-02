using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Models
{
    public class NewCaff
    {
        public string Name { get; set; }
        public string File { get; set; }
        public int UploaderId { get; set; }
    }
}
