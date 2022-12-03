using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Models
{
    public class CustomToken
    {
        public string Token { get; set; }
        public bool IsAdmin { get; set; }
    }
}