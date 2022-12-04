using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Models
{
    public class CaffFile
    {
        public CaffFile(byte[] file)
        {
            File = Services.Base64Converter.ConvertToBase64String(file, Services.Base64Converter.CAFF_HEADER);
        }
        public string File { get; set; }

    }
}
