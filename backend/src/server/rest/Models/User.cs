using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Models
{
    public class User
    {
        public User(int id, string name, bool admin)
        {
            Id = id;
            Name = name;
            Admin = admin;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool Admin { get; set; }
    }
}
