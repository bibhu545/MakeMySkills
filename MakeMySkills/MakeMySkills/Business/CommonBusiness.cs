using MakeMySkills.EDMX;
using MakeMySkills.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MakeMySkills.Utils.Constants;

namespace MakeMySkills.Business
{
    public class CommonBusiness
    {
        public static System.Web.Mvc.JsonResult GetErrorResponse(string errorMessage = "")
        {
            return new System.Web.Mvc.JsonResult
            {
                Data = new ApiRespnoseWrapper
                {
                    status = ApiRespnoseStatus.Failed,
                    errorMessage = errorMessage
                }
            };
        }

        public static List<TopicModel> GetAllSubjects()
        {
            using (var context = new MakeMySkillsEntities())
            {
                List<Topic> topicsFromDB = context.Topics.Where(x => x.IsActive == ActiveStatus.IsActive).ToList();

                List<TopicModel> allTopics = topicsFromDB.Where(x => x.SubjectId == null).Select(x => new TopicModel()
                {
                    topicName = x.TopicName,
                    subjectId = x.SubjectId,
                    isActive = x.IsActive,
                    topicId = x.TopicId
                }).ToList();

                foreach (var item in allTopics)
                {
                    item.subTopics = topicsFromDB.Where(x => x.SubjectId == item.topicId).Select(x => new TopicModel()
                    {
                        topicName = x.TopicName,
                        subjectId = x.SubjectId,
                        isActive = x.IsActive,
                        topicId = x.TopicId
                    }).ToList();
                }
                return allTopics;
            }
        }

    }
}