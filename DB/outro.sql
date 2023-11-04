/* -=-=-=-=-=-=-=-= ÍNDICES =-=-=-=-=-=-=-=-=-=-=-=- */

create index ixUser on [Tempus].[User]([user_id], [username])
create index ixTask on [Tempus].[Task]([task_id], [task_name], [task_category])
create index ixTeam on [Tempus].[Team]([team_id], [team_name])
create index ixTeamMembers on [Tempus].[TeamMembers]([teammembers_id])
create index ixComment on [Tempus].[Comment]([comment_id])
create index ixCategory on [Tempus].[Category]([category_id], [category_name])
create index ixWorkspace on [Tempus].[Workspace]([workspace_id], [workspace_name])

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

/* -=-=-=-=-=-=-=-=-=-= TRIGGERS -=-=-=-=-=-=-=-=-=- */
go 

create trigger deleteComment on [Tempus].[Task]
instead of delete as
begin 
    declare @task_id int 
    select @task_id = task_id from deleted
    delete from [Tempus].[Comment] where task_id = @task_id
    delete from [Tempus].[Task] where task_id = @task_id
end

select * from Empresa2.V_Onde_Trabalha where sobrenome = 'Wong'