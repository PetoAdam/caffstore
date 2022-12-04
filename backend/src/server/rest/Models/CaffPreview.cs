using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

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
            File = Parse(file);
            UploaderId = uploaderId;
            Comments = comments;
        }

        public CaffPreview()
        {
            
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
        public string File { get; set; }
        public string UploaderId { get; set; }
        public List<Comment> Comments { get; set; }

        public string Parse(byte[] caff)
        {
            if(caff == null)
            {
                return null;
            }

            var pwd = System.IO.Directory.GetCurrentDirectory();

            // Send byte[] to .caff file in filesystem
            var filePath = Path.Combine(pwd, "..", "..", "parser", "build", "in.caff");
            System.IO.File.WriteAllBytes(filePath, caff);

            // Run docker container to get gif file
            var pwdDocker = pwd.Replace("\\", "/");
            var processInfo = new ProcessStartInfo("docker", "run -v "+ pwdDocker + "/../../parser/build:/parser parser");

            processInfo.CreateNoWindow = true;
            processInfo.UseShellExecute = false;
            processInfo.RedirectStandardOutput = true;
            processInfo.RedirectStandardError = true;

            int exitCode;
            using (var process = new Process())
            {
                process.StartInfo = processInfo;

                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();
                process.WaitForExit(1200000);
                if (!process.HasExited)
                {
                    process.Kill();
                }

                exitCode = process.ExitCode;
            }

            // Convert to base64 string
            string gifPath = Path.Combine(pwd, "..", "..", "parser", "build", "out.gif");

            if(!System.IO.File.Exists(gifPath))
            {
                return null;
            }

            byte[] imageArray = System.IO.File.ReadAllBytes(gifPath);
            string base64 = Services.Base64Converter.ConvertToBase64String(imageArray, Services.Base64Converter.GIF_HEADER);

            // Delete unneccessary files
            System.IO.File.Delete(Path.Combine(pwd, "..", "..", "parser", "build", "in.caff"));
            System.IO.File.Delete(Path.Combine(pwd, "..", "..", "parser", "build", "out.gif"));

            return base64;
        }
    }
}
