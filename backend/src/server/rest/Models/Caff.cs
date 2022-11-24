using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Models
{
    public class Caff
    {
        public Caff(int id, string name, DateTime date, byte[] file, int uploaderId)
        {
            Id = id;
            Name = name;
            Date = date;
            File = file;
            UploaderId = uploaderId;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public byte[] File { get; set; }
        public int UploaderId { get; set; }
    }
}
