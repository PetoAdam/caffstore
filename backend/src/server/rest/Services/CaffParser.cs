using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PhotoSauce.MagicScaler;

namespace CaffStore.REST.Services
{
    public static class CaffParser
    {
        public static int ResizedWidth = 300;
        public static string Parse(byte[] caff)
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

            // Resize gif
            string gifPath = Path.Combine(pwd, "..", "..", "parser", "build", "out.gif");
            string resizedGifPath = Path.Combine(pwd, "..", "..", "parser", "build", "resized.gif");
            if(!System.IO.File.Exists(gifPath))
            {
                return null;
            }

            MagicImageProcessor.ProcessImage(gifPath, resizedGifPath, new ProcessImageSettings { Width = ResizedWidth });

            // Convert to base64 string
            byte[] imageArray = System.IO.File.ReadAllBytes(resizedGifPath);
            string base64 = Services.Base64Converter.ConvertToBase64String(imageArray, Services.Base64Converter.GIF_HEADER);

            // Delete unneccessary files
            System.IO.File.Delete(filePath);
            System.IO.File.Delete(gifPath);
            System.IO.File.Delete(resizedGifPath);

            return base64;
        }
    }
}
