using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMySkills.Models
{
    public class TestModel
    {
        public int testId { get; set; }
        public int userId { get; set; }
        public string testName { get; set; }
        public int isActive { get; set; }
        public int topicId { get; set; }
        public int timeLimit { get; set; }
        public int correctAnswerMarks { get; set; }
        public int negetiveMarking { get; set; }
        public int passingPercentage { get; set; }
        public int suffleQuestions { get; set; }
        public int suffleAnswers { get; set; }
        public int allowMultiple { get; set; }
        public int revealAnswers { get; set; }
        public string testGuid { get; set; }
        public DateTime dateAdded { get; set; }
    }
    public class QuestionModel
    {
        public int questionId { get; set; }
        public int topicId { get; set; }
        public int userId { get; set; }
        public int testId { get; set; }
        public string questionText { get; set; }
        public int isActive { get; set; }
        public List<AnswerModel> options { get; set; }
    }
    public class AnswerModel
    {
        public int answerId { get; set; }
        public int questionId { get; set; }
        public string answerText { get; set; }
        public string explaination { get; set; }
        public int isActive { get; set; }
        public Nullable<int> isAnswer { get; set; }
    }
}