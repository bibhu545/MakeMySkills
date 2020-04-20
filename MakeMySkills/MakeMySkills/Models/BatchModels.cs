using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMySkills.Models
{
    public class BatchModel
    {
        public int batchId { get; set; }
        public int userId { get; set; }
        public string batchCode { get; set; }
        public string batchDetails { get; set; }
        public int regnoRequired { get; set; }
        public int approvalRequired { get; set; }
        public int memberApproval { get; set; }
        public DateTime createdOn { get; set; }
        public DateTime lastupdatedOn { get; set; }
        public int isActive { get; set; }
    }

    public class BatchUserModel
    {
        public int batchUserId { get; set; }
        public int batchId { get; set; }
        public int userId { get; set; }
        public DateTime joinedOn { get; set; }
        public int? approvedBy { get; set; }
        public int isActive { get; set; }
    }
}