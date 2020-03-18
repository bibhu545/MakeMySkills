using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMySkills.Models
{
    public class LoginRequestModel
    {
        public String email { get; set; }
        public String password { get; set; }
    }
    public class LoginResponseModel
    {
        public int loggedIn { get; set; }
        public int userId { get; set; }
        public String email { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public int userType { get; set; }
    }
}