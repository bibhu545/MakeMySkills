using MakeMySkills.EDMX;
using MakeMySkills.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MakeMySkills.Utils.Constants;

namespace MakeMySkills.Business
{
    public class BatchBusiness
    {
        public static bool AddBatch(BatchModel model)
        {
            using (var context = new MakeMySkillsEntities())
            {
                context.Batches.Add(new Batch()
                {
                    BatchCode = model.batchCode,
                    BatchDetails = model.batchDetails,
                    CreatedOn = DateTime.UtcNow,
                    LastupdatedOn = DateTime.UtcNow,
                    ApprovalRequired = model.approvalRequired,
                    IsActive = ActiveStatus.IsActive,
                    RegnoRequired = model.regnoRequired,
                    MemberApproval = model.memberApproval,
                    UserId = model.userId
                });
                return context.SaveChanges() > 0;
            }
        }
    }
}