using MakeMySkills.EDMX;
using MakeMySkills.Models;
using MakeMySkills.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MakeMySkills.Utils.Constants;

namespace MakeMySkills.Business
{
    public class AdminBusiness
    {
        public static bool AddTopic(TopicModel model)
        {
            using (var context = new MakeMySkillsEntities())
            {
                int updateStatus = 0;
                Topic topic = new Topic();
                topic.TopicName = model.topicName;
                topic.IsActive = ActiveStatus.IsActive;
                topic.SubjectId = model.subjectId;
                context.Topics.Add(topic);
                updateStatus += context.SaveChanges();
                if (model.subTopics != null)
                {
                    foreach (var item in model.subTopics)
                    {
                        Topic subTopic = new Topic();
                        subTopic.TopicName = item.topicName;
                        subTopic.IsActive = ActiveStatus.IsActive;
                        subTopic.SubjectId = topic.TopicId;
                        context.Topics.Add(subTopic);
                        updateStatus += context.SaveChanges();
                    }
                }
                return updateStatus > 0;
            }
        }
        public static bool EditTopic(TopicModel model)
        {
            using (var context = new MakeMySkillsEntities())
            {
                if (model.subjectId != null)
                {
                    var topic = context.Topics.FirstOrDefault(x => x.TopicId == model.topicId);
                    topic.TopicName = model.topicName;
                    return context.SaveChanges() > 0;
                }
                else
                {
                    var topics = context.Topics.Where(x => x.TopicId == model.topicId || x.SubjectId == model.topicId).ToList();
                    if (topics != null || topics.Count > 0)
                    {
                        var topic = topics.FirstOrDefault(x => x.SubjectId == null);
                        if (topic != null)
                        {
                            topic.TopicName = model.topicName;
                        }
                        bool updated = false;
                        if (model.subTopics != null)
                        {
                            foreach (var item in model.subTopics)
                            {
                                if (item.topicId == 0)
                                {
                                    item.subjectId = model.topicId;
                                    updated = AddTopic(item);
                                }
                            }
                        }
                        return context.SaveChanges() > 0 || updated;
                    }
                }
                return false;
            }
        }
        public static bool DeleteTopic(TopicModel model)
        {
            using (var context = new MakeMySkillsEntities())
            {
                var topics = context.Topics.Where(x => x.TopicId == model.topicId || x.SubjectId == model.topicId).ToList();
                if (topics == null || topics.Count == 0)
                {
                    return false;
                }
                else
                {
                    foreach (var item in topics)
                    {
                        item.IsActive = ActiveStatus.Deleted;
                    }
                    return context.SaveChanges() > 0;
                }
            }
        }
    }
}