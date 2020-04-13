ALTER TABLE AnswerBank ADD IsAnswer int null 
ALTER TABLE QuestionBank ADD UserId int not null FOREIGN KEY REFERENCES [dbo].[User](UserId)