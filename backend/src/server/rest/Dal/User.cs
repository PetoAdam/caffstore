﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaffStore.REST.Dal
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Admin { get; set; }
    }
}