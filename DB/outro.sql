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

go 
/* pega uma lista de tarefas com seus IDs, nomes e a contagem de comentarios */
CREATE OR ALTER VIEW [Tempus].[CommentsPerTask]
AS
    SELECT T.task_id, T.task_name, COUNT(C.comment_id) AS num_comments
    FROM [Tempus].[Task] T
    LEFT JOIN [Tempus].[Comment] C ON T.task_id = C.task_id
    GROUP BY T.task_id, T.task_name;

go
/*Pega os nomes e usernames dos times*/
CREATE OR ALTER VIEW [Tempus].[UsersByTeam]
AS
SELECT T.team_name, U.username, U.nickname
FROM [Tempus].[Team] T
INNER JOIN [Tempus].[TeamMembers] TM ON T.team_id = TM.team_id
INNER JOIN [Tempus].[User] U ON TM.user_id = U.user_id;


go
/* pega as categorias e as tasks concluidas de cada categoria*/
CREATE OR ALTER VIEW [Tempus].[CompletedTasksByCategory]
AS
SELECT C.category_name, COUNT(T.task_id) AS completed_tasks
FROM [Tempus].[Task] T
INNER JOIN [Tempus].[Category] C ON T.task_category = C.category_id
WHERE T.task_situation = 'Concluída'
GROUP BY C.category_name;

go
/* pega o nome task, o nome da categoria e o nome do time selecionado*/
CREATE OR ALTER VIEW [Tempus].[TasksByUserAndTeam]
AS 
SELECT U.username, T.task_name, Te.team_name
FROM [Tempus].[Task] T
INNER JOIN [Tempus].[Workspace] W ON T.workspace_id = W.workspace_id
INNER JOIN [Tempus].[Team] Te ON W.team_id = Te.team_id
INNER JOIN [Tempus].[TeamMembers] TM ON Te.team_id = TM.team_id
INNER JOIN [Tempus].[User] U ON TM.user_id = U.user_id;

go
/* o nome da categoria, pega o nome task e o nome do time*/
CREATE OR ALTER VIEW [Tempus].[TasksByCategoryAndTeam]
AS 
SELECT C.category_name, T.task_name, Te.team_name
FROM [Tempus].[Task] T
INNER JOIN [Tempus].[Category] C ON T.task_category = C.category_id
INNER JOIN [Tempus].[Workspace] W ON T.workspace_id = W.workspace_id
INNER JOIN [Tempus].[Team] Te ON W.team_id = Te.team_id;

go
/* -=-=-=-=-=-=-=-=-=-= TRIGGERS -=-=-=-=-=-=-=-=-=- */


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

--Tregger que Previne a deletação de uma categoria com task
CREATE TRIGGER trPreventCategoryDeletion
ON [Tempus].[Category]
INSTEAD OF DELETE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM [Tempus].[Task] WHERE task_category IN (SELECT deleted.category_id FROM deleted))
    BEGIN
        RAISERROR('Não é possível excluir categorias com tarefas associadas!', 16, 1);
    END
    ELSE
    BEGIN
        DELETE FROM [Tempus].[Category] WHERE category_id IN (SELECT category_id FROM deleted);
    END
END;

go
--Mostra a situação da tesk apos a alteração
CREATE TRIGGER trUpdateTaskSituation
ON [Tempus].[Task]
AFTER UPDATE
AS
BEGIN
    -- Atualiza a situação da tarefa automaticamente quando for alterada
    UPDATE T
    SET T.task_situation = I.task_situation
    FROM [Tempus].[Task] T
    INNER JOIN inserted I ON T.task_id = I.task_id;
END;