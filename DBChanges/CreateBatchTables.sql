CREATE TABLE [dbo].[Batch](
	[BatchId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[BatchCode] [varchar](50) NOT NULL,
	[BatchDetails] [text] NULL,
	[RegnoRequired] [int] NOT NULL,
	[ApprovalRequired] [int] NOT NULL,
	[MemberApproval] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[LastupdatedOn] [datetime] NOT NULL,
	[IsActive] [int] NOT NULL,
 CONSTRAINT [PK_Batch] PRIMARY KEY CLUSTERED 
(
	[BatchId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Batch]  WITH CHECK ADD  CONSTRAINT [FK_Batch_Batch] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO

ALTER TABLE [dbo].[Batch] CHECK CONSTRAINT [FK_Batch_Batch]
GO


CREATE TABLE [dbo].[BatchUsers](
	[BatchUserId] [int] NOT NULL,
	[BatchId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[JoinedOn] [datetime] NULL,
	[ApprovedBy] [int] NULL,
	[IsActive] [int] NULL,
 CONSTRAINT [PK_BatchUsers] PRIMARY KEY CLUSTERED 
(
	[BatchUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[BatchUsers]  WITH CHECK ADD  CONSTRAINT [FK_BatchUsers_ApprovedByUser] FOREIGN KEY([ApprovedBy])
REFERENCES [dbo].[User] ([UserId])
GO

ALTER TABLE [dbo].[BatchUsers] CHECK CONSTRAINT [FK_BatchUsers_ApprovedByUser]
GO

ALTER TABLE [dbo].[BatchUsers]  WITH CHECK ADD  CONSTRAINT [FK_BatchUsers_Batch] FOREIGN KEY([BatchId])
REFERENCES [dbo].[Batch] ([BatchId])
GO

ALTER TABLE [dbo].[BatchUsers] CHECK CONSTRAINT [FK_BatchUsers_Batch]
GO

ALTER TABLE [dbo].[BatchUsers]  WITH CHECK ADD  CONSTRAINT [FK_BatchUsers_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO

ALTER TABLE [dbo].[BatchUsers] CHECK CONSTRAINT [FK_BatchUsers_User]
GO
