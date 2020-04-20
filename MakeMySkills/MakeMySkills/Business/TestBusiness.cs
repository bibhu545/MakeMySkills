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
                Test test = context.Tests.FirstOrDefault(x => x.TestGuid == testGuid && x.IsActive == ActiveStatus.IsActive);
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
        public static TestModel UpdateTestDetails(TestModel model)
        {
            using (var context = new MakeMySkillsEntities())
            {
                if (model.testId != 0)
                {
                    var test = context.Tests.FirstOrDefault(x => x.TestId == model.testId && x.IsActive == ActiveStatus.IsActive);
                    if (test != null)
                    {
                        test.TestName = model.testName;
                        test.NegetiveMarking = model.negetiveMarking;
                        test.PassingPercentage = model.passingPercentage;
                        test.RevealAnswers = model.revealAnswers;
                        test.SuffleAnswers = model.suffleAnswers;
                        test.AllowMultiple = model.allowMultiple;
                        test.CorrectAnswerMarks = model.correctAnswerMarks;
                        test.TimeLimit = model.timeLimit;
                        if (context.SaveChanges() > 0)
                        {
                            return GetTestBasicDetails(test.TestGuid);
                        }
                    }
                    return null;
                }
                else
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
        }
        public static List<QuestionModel> GetQuestionsForTest(int id)
        {
            using (var context = new MakeMySkillsEntities())
            {
                List<QuestionModel> questions = context.QuestionBanks.Where(x => x.TestId == id && x.IsActive == ActiveStatus.IsActive).Select(x => new QuestionModel()
                {
                    isActive = x.IsActive,
                    questionText = x.QuestionText,
                    questionId = x.QuestionId,
                    testId = x.TestId,
                    topicId = x.TopicId,
                    userId = x.UserId
                }).ToList();
                foreach (var item in questions)
                {
                    item.options = context.AnswerBanks.Where(x => x.QuestionId == item.questionId && x.IsActive == ActiveStatus.IsActive).Select(x => new AnswerModel()
                    {
                        answerId = x.AnswerId,
                        answerText = x.AnswerText,
                        explaination = x.Explaination,
                        isActive = x.IsActive,
                        isAnswer = x.IsAnswer,
                        questionId = x.QuestionId
                    }).ToList();
                }
                return questions;
            }
        }
        public static bool AddQuestions(QuestionModel model)
        {
            using (var context = new MakeMySkillsEntities())
            {
                int added = 0;
                QuestionBank question = new QuestionBank()
                {
                    QuestionText = model.questionText,
                    TestId = model.testId,
                    IsActive = ActiveStatus.IsActive,
                    TopicId = model.topicId,
                    UserId = model.userId
                };
                context.QuestionBanks.Add(question);
                added += context.SaveChanges();
                if (model.options != null)
                {
                    added = AddOptionsToQuestion(model, question.QuestionId);
                }
                return added > 0;
            }
        }
        public static bool EditQuestions(QuestionModel model)
        {
            using (var context = new MakeMySkillsEntities())
            {
                int updated = 0;
                var question = context.QuestionBanks.FirstOrDefault(x => x.QuestionId == model.questionId);
                if (question != null)
                {
                    question.QuestionText = model.questionText;
                    question.TopicId = model.topicId;

                    context.AnswerBanks.RemoveRange(context.AnswerBanks.Where(x => x.QuestionId == model.questionId));
                    context.SaveChanges();

                    if (model.options.Count > 0)
                    {
                        updated = AddOptionsToQuestion(model, model.questionId);
                    }
                }
                return updated > 0;
            }
        }
        public static int AddOptionsToQuestion(QuestionModel model, int questionId)
        {
            using (var context = new MakeMySkillsEntities())
            {
                int updated = 0;
                List<AnswerBank> options = new List<AnswerBank>();
                foreach (var item in model.options)
                {
                    options.Add(new AnswerBank()
                    {
                        AnswerText = item.answerText,
                        Explaination = item.explaination,
                        IsActive = ActiveStatus.IsActive,
                        QuestionId = questionId,
                        IsAnswer = item.isAnswer
                    });
                }
                if (options.Count > 0)
                {
                    context.AnswerBanks.AddRange(options);
                    updated += context.SaveChanges();
                }
                return updated;
            }
        }
        public static bool DeleteQuestions(QuestionModel model)
        {
            using (var context = new MakeMySkillsEntities())
            {
                var question = context.QuestionBanks.FirstOrDefault(x => x.QuestionId == model.questionId);
                if (question != null)
                {
                    question.IsActive = ActiveStatus.Deleted;
                    var answers = context.AnswerBanks.Where(x => x.QuestionId == model.questionId);
                    foreach (var item in answers)
                    {
                        item.IsActive = ActiveStatus.Deleted;
                    }
                    return context.SaveChanges() > 0;
                }
                return false;
            }
        }
        public static List<TestModel> GetTestsByUser(int id)
        {
            using (var context = new MakeMySkillsEntities())
            {
                return context.Tests.Where(x => x.UserId == id && x.IsActive == ActiveStatus.IsActive).Select(x => new TestModel()
                {
                    testName = x.TestName,
                    dateAdded = x.DateAdded,
                    correctAnswerMarks = x.CorrectAnswerMarks,
                    isActive = x.IsActive,
                    negetiveMarking = x.NegetiveMarking,
                    passingPercentage = x.PassingPercentage,
                    revealAnswers = x.RevealAnswers,
                    suffleAnswers = x.SuffleAnswers,
                    suffleQuestions = x.SuffleQuestions,
                    testGuid = x.TestGuid,
                    testId = x.TestId,
                    timeLimit = x.TimeLimit,
                    topicId = x.TopicId,
                    allowMultiple = x.AllowMultiple
                }).ToList();
            }
        }
    }
}