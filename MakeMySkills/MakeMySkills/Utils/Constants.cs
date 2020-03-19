using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMySkills.Utils
{
    public class EncryptionKey
    {
        public const string LoginPartialEncKey = "06AD4231-185F-#12343E1-AF67-CCF0228B188#!@#@8ETYfadda423";
    }

    public class Constants
    {
        public class ApiRespnoseStatus
        {
            public const int Success = 1;
            public const int Failed = 2;
            public const int AuthenticationFailed = 3;
            public const int Duplicate = 4;
        }
        public class ActiveStatus
        {
            public const int Deleted = 0;
            public const int IsActive = 1;
        }
    }
}