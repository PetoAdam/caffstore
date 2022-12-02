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
            File = file;
        }
        public byte[] File { get; set; }

    }
}
