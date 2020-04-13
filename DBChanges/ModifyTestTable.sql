ALTER TABLE Test Add TimeLimit int not null default 0;
ALTER TABLE Test Add CorrectAnswerMarks int not null default 0;
ALTER TABLE Test Add NegetiveMarking int not null default 0;
ALTER TABLE Test Add PassingPercentage int not null default 0;
ALTER TABLE Test Add SuffleQuestions int not null default 0;
ALTER TABLE Test Add SuffleAnswers int not null default 0;
ALTER TABLE Test Add AllowMultiple int not null default 0;
ALTER TABLE Test Add RevealAnswers int not null default 0;
ALTER TABLE Test Add TestGuid varchar(50) not null;
ALTER TABLE Test Add DateAdded DateTime not null default GETDATE();

ALTER TABLE Test ADD UserId int not null FOREIGN KEY REFERENCES [dbo].[User](UserId)

