using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Models
{
    public class NewUser
    {
        public string Email { get; set; }
        public string Password{get; set; }
        public string Name { get; set; }
    }
}
