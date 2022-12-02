using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Models
{
    public class CaffPreview
    {
        public CaffPreview(int id, string name, DateTime date, byte[] file, int uploaderId)
        {
            Id = id;
            Name = name;
            Date = date;
            UploaderId = uploaderId;

            // Generate the preview from the uploaded file.
            File = Parse(file);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public byte[] File { get; set; }
        public int UploaderId { get; set; }

        private byte[] Parse(byte[] caff)
        {
            ProcessStartInfo parser = new ProcessStartInfo();
            Console.WriteLine(System.IO.Directory.GetCurrentDirectory());
            parser.FileName = @"..\..\parser\build\parser";
            parser.Arguments = 
            return null;
        }
    }
}
