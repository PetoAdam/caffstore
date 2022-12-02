using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaffStore.REST.Services
{
    public static class Base64Converter
    {
        public static string GIF_HEADER = "data:image/gif;base64,";

        public static byte[] ConvertToByteArray(string base64)
        {
            if (base64 == null)
                return null;
            byte[] bitmapData = new byte[base64.Length];
            bitmapData = Convert.FromBase64String(FixBase64ForImage(base64));
            return bitmapData;

        }

        public static string ConvertToExtension(string base64)
        {
            if (base64 == null)
                return null;
            string extension = base64.Substring(0, base64.IndexOf(",") + 1);
            return extension;

        }

        public static string ConvertToBase64String(byte[] byteArray, string header)
        {
            if (byteArray == null && header == null)
                return null;
            string base64 = header + Convert.ToBase64String(byteArray);
            return base64;
        }

        public static string FixBase64ForImage(string image)
        {
            StringBuilder sbText = new StringBuilder(image, image.Length);
            sbText.Replace("\r\n", String.Empty);
            sbText.Replace(" ", String.Empty);
            string str = sbText.ToString();
            string result = str.Substring(str.IndexOf(",") + 1);
            return result;
        }

    }
}
