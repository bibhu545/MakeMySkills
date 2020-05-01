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
        public int userId { get; set; }
        public String email { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public int userType { get; set; }
        public DateTime joinedOn { get; set; }
        public int IsLoggedIn { get; set; }
        public String message { get; set; }
    }
    public class SignupModel
    {
        public int userId { get; set; }
        public String email { get; set; }
        public String password { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public int userType { get; set; }
    }
    public class ProfileModel
    {
        public LoginResponseModel userDetails { get; set; }
        public List<TestModel> tests { get; set; }
    }
}