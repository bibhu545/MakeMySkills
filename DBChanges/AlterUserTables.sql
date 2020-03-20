ALTER TABLE [dbo].[User]
ADD UserType int not null;

ALTER TABLE [dbo].[User]
ADD JoinedOn DATETIME not null;

ALTER TABLE [dbo].[User]
ADD IsLoggedIn INT not null DEFAULT(0);

--Also change password field to nvarchar(255)