using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMySkills.Models
{
    public class ApiRespnoseWrapper
    {
        public int status { get; set; }
        public string errorMessage { get; set; }
        public string message { get; set; }
        public ArrayList results { get; set; }
    }
    public class DropdownModel
    {
        public int value { get; set; }
        public String text { get; set; }
    }
}