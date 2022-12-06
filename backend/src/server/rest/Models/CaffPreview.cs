using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CaffStore.REST.Services;
using PhotoSauce.MagicScaler;

namespace CaffStore.REST.Models
{
    public class CaffPreview
    {

        public CaffPreview(int id, string name, DateTime creationDate, byte[] file, string uploaderId, List<Comment> comments)
        {
            Id = id;
            Name = name;
            CreationDate = creationDate;
            // Generate the preview from the uploaded file.
            File = CaffParser.Parse(file);
            UploaderId = uploaderId;
            Comments = comments;
        }

        public CaffPreview(){}

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
        public string File { get; set; }
        public string UploaderId { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
