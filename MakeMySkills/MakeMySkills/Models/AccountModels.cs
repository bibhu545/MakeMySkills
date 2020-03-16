using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMySkills.Models
{
    public class LoginRequestModel
    {
        public String userName { get; set; }
        public String password { get; set; }
    }
    public class LoginResponsetModel
    {
        public String userName { get; set; }
        public String password { get; set; }
    }
}