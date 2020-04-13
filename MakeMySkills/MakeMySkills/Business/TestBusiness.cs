using MakeMySkills.EDMX;
using MakeMySkills.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MakeMySkills.Utils.Constants;

namespace MakeMySkills.Business
{
    public class TestBusiness
    {
        public static TestModel GetTestBasicDetails(String testGuid)
        {
            using (var context = new MakeMySkillsEntities())
            {
                Test test = context.Tests.FirstOrDefault(x => x.TestGuid == testGuid);
                if (test != null)
                {
                    return new TestModel()
                    {
                        testId = test.TestId,
                        testName = test.TestName,
                        userId = test.UserId,
                        allowMultiple = test.AllowMultiple,
                        correctAnswerMarks = test.CorrectAnswerMarks,
                        revealAnswers = test.RevealAnswers,
                        isActive = test.IsActive,
                        negetiveMarking = test.NegetiveMarking,
                        passingPercentage = test.PassingPercentage,
                        suffleAnswers = test.SuffleAnswers,
                        suffleQuestions = test.SuffleQuestions,
                        testGuid = test.TestGuid,
                        timeLimit = test.TimeLimit,
                        topicId = test.TopicId,
                        dateAdded = test.DateAdded
                    };
                }
                else
                {
                    return null;
                }
            }
        }
        public static TestModel CreateTest(TestModel model)
        {
            using (var context = new MakeMySkillsEntities())
            {
                Test test = new Test()
                {
                    TestName = model.testName,
                    UserId = model.userId,
                    AllowMultiple = model.allowMultiple,
                    CorrectAnswerMarks = model.correctAnswerMarks,
                    RevealAnswers = model.revealAnswers,
                    IsActive = ActiveStatus.IsActive,
                    NegetiveMarking = model.negetiveMarking,
                    PassingPercentage = model.passingPercentage,
                    SuffleAnswers = model.suffleAnswers,
                    SuffleQuestions = model.suffleQuestions,
                    TestGuid = Guid.NewGuid().ToString().Replace("-", ""),
                    TimeLimit = model.timeLimit,
                    TopicId = model.topicId,
                    DateAdded = DateTime.UtcNow
                };
                context.Tests.Add(test);
                if (context.SaveChanges() > 0)
                {
                    return GetTestBasicDetails(test.TestGuid);
                }
                else
                {
                    return null;
                }
            }
        }
        public static List<QuestionModel> GetQuestionsForTest(int id)
        {
            using (var context = new MakeMySkillsEntities())
            {
                return context.QuestionBanks.Where(x => x.TestId == id).Select(x => new QuestionModel()
                {
                }).ToList();
            }
        }
        public static bool AddQuestion()
        {
            return true;
        }
    }
}