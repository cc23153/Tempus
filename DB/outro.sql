/* -=-=-=-=-=-=-=-= ÍNDICES =-=-=-=-=-=-=-=-=-=-=-=- */

create index ixUser on [Tempus].[User]([user_id], [username])
create index ixTask on [Tempus].[Task]([task_id], [task_name], [task_category])
create index ixTeam on [Tempus].[Team]([team_id], [team_name])
create index ixTeamMembers on [Tempus].[TeamMembers]([teammembers_id])
create index ixComment on     [Tempus].[Comment]([comment_id])
create index ixCategory on    [Tempus].[Category]([category_id], [category_name])
create index ixWorkspace on   [Tempus].[Workspace]([workspace_id], [workspace_name])

go
/* -=-=-=-=-=-=-=-=-=-=-= VIEWS =-=-=-=-=-=-=-=-=-=- */
create or alter view [Tempus].[NumMembers]
as
    select count(team_id, user_id) from [Tempus].[TeamMembers]

go

create or alter view [Tempus].[TasksWithComments]
as 
    select T.task_id, T.task_name, C.comment_id, C.content from 
    ([Tempus].[Comment] C join [Tempus].[Task] T on C.task_id = T.task_id)

go 

create or alter view [Tempus].[UserTeams]
as
    select T.team_id, T.team_name, U.user_id, U.username from [Tempus].[Team] T,
        ([Tempus].[TeamMembers] TM join [Tempus].[User] U on TM.user_id = U.user_id) where TM.team_id = T.team_id 


/* -=-=-=-=-=-=-=-=-=-= TRIGGERS -=-=-=-=-=-=-=-=-=- */
go 

-- Trigger para TeamMembers
CREATE TRIGGER trDeleteTeamMembers
ON [Tempus].[Team]
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    DELETE tm
    FROM [Tempus].[TeamMembers] tm
    INNER JOIN deleted d ON tm.team_id = d.team_id;
END;

go 

-- Trigger para Workspace
CREATE TRIGGER trDeleteWorkspace
ON [Tempus].[Team]
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    DELETE w
    FROM [Tempus].[Workspace] w
    INNER JOIN deleted d ON w.team_id = d.team_id;
END;

go 

-- Trigger para Task
CREATE TRIGGER trDeleteTask
ON [Tempus].[Workspace]
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    DELETE t
    FROM [Tempus].[Task] t
    INNER JOIN deleted d ON t.workspace_id = d.workspace_id;
END;

go 

-- Trigger para Comment
CREATE TRIGGER trDeleteComment
ON [Tempus].[Task]
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    DELETE c
    FROM [Tempus].[Comment] c
    INNER JOIN deleted d ON c.task_id = d.task_id;
END;

go 

-- Trigger para User
CREATE TRIGGER trDeleteUser
ON [Tempus].[User]
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    DELETE tm
    FROM [Tempus].[TeamMembers] tm
    INNER JOIN deleted d ON tm.user_id = d.user_id;
END;

go 

-- Trigger para Team
CREATE TRIGGER trDeleteTeam
ON [Tempus].[Team]
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    DELETE tm
    FROM [Tempus].[TeamMembers] tm
    INNER JOIN deleted d ON tm.team_id = d.team_id;
END;

go
