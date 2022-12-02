using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Dal
{
    public class Caff
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
        public byte[] CaffFile { get; set; }
        public int UploaderId { get; set; }
    }
}
