create schema [Tempus];

go

create table [Tempus].[User](
    [user_id] int identity primary key,
    [username] nvarchar(128) not null unique,
    [nickname] nvarchar(128) not null,
    [email] varchar(128) not null unique,
    [password_hash] varchar(1000) not null, --hash da senha
    [password_salt] varchar(1000) not null, -- o salt da senha para descriptografar depois
)

create table [Tempus].[Team] (
     [team_id] int identity primary key,
     [team_name] nvarchar(50) not null
)

-- Tabela de junção para estabelecer a relação entre Team e User
create table [Tempus].[TeamMembers] (
     [team_id] int not null,
     [user_id] int not null,
     constraint [fk_team_id] foreign key([team_id])
     references [Tempus].[Team]([team_id]) on delete cascade,
     constraint [fk_user_id] foreign key([user_id])
     references [Tempus].[User]([user_id]) on delete cascade 
)
    
create table [Tempus].[Category](
    [category_id] int primary key,
    [category_name] nvarchar(255) not null,
    [category_content] nvarchar(512) null
)
    
create table [Tempus].[Workspace](
    [workspace_id] int identity primary key,
    [workspace_name] nvarchar(128) not null,
    [workspace_description] nvarchar(255) not null,
    [team_id] int not null,
    [workspace_admin] int not null,    

    constraint [fk_team_id] foreign key([team_id])
    references [Tempus].[Team]([team_id]) on delete cascade,
    constraint [fk_workspace_admin] foreign key([workspace_admin])
    references [Tempus].[User]([user_id]) on delete cascade
)

create table [Tempus].[Comment](
    [comment_id] int identity primary key,
    [task_id] int not null,
    [content] ntext not null,
    [comment_datetime] datetime not null,
    [user_id] int not null,

    constraint [fkUserId] foreign key([user_id])
    references [Tempus].[User]([user_id]) on delete cascade,
    constraint [fk_task_id] foreign key([task_id])
    references [Tempus].[Task]([task_id]) on delete cascade
)

create table [Tempus].[Task](
    [task_id] int identity primary key,
    [task_name] nvarchar(255) not null,
    [task_content] nvarchar(512) null,
    [workspace_id] int not null,
    [task_situation] nvarchar(128) not null,

    [task_begin] datetime not null,
    [task_end] datetime not null,
    [task_category] int not null,

    constraint [fk_workspace_id] foreign key([workspace_id])
    references [Tempus].[Workspace]([workspace_id]) on delete cascade,
    constraint [fk_task_category] foreign key([task_category])
    references [Tempus].[Category]([category_id]) on delete cascade
)

/* -=-=-=-=-=-=-=-= ÍNDICES =-=-=-=-=-=-=-=-=-=-=-=- */

create index ixUser on [Tempus].[User]([user_id], [username])
create index ixTask on [Tempus].[Task]([task_id], [task_name], [task_category])
create index ixComment on [Tempus].[Comment]([comment_id])

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

go 

/*=-=-=-=-=-=-=-=-=-=-=- STORED PROCEDURES -=-=-=-=-=-=-=-=-=-=-=*/

/*=-=-=-=-=-=-=-=-=-=-=- CREATE PROCEDURES -=-=-=-=-=-=-=-=-=-=-=*/

create or alter procedure [Tempus].[spNewTask]
    @task_name nvarchar(255), @task_content nvarchar(512), @workspace_id int, 
    @task_situation nvarchar(128), @task_begin datetime, @task_end datetime, @task_category int
as
begin 
    declare @task_without_name_msg varchar(255) = 'Tarefa sem nome'
    if @task_name = ''
    begin
        set @task_name = @task_without_name_msg
    end
    begin try
    insert into [Tempus].[Task] values 
        (@task_name, @task_content, @workspace_id, @task_situation, @task_begin, @task_end, @task_category)
    end try 
    begin catch
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1
    end catch
end

go 

create or alter procedure [Tempus].[spNewComment]
    @comment_id int, @task_id int, @content ntext, @comment_datetime datetime, @user_id int
as
begin 
    if @content is NULL
    begin
        RAISERROR('Comment content can not be null', 16, 1)
        return
    end
    begin try
    insert into [Tempus].[Comment] values 
        (@comment_id, @task_id, @content, @comment_datetime, @user_id )
    end try 
    begin catch 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1
    end catch
end

go

create or alter procedure [Tempus].[spNewWorkspace]
    @workspace_id int, @workspace_name nvarchar(128), @workspace_description nvarhcar(255),
    @workspace_admin int, @team_id int 
as
begin 

end 

go

create or alter procedure [Tempus].[spNewCategory]
    @category_id int, @category_name nvarchar(255), @category_content nvarchar(512)
as 
begin 

end

go

create or alter procedure [Tempus].[spAddTeamMember]
    @team_id int, @user_id int 
as 
begin 

end 

create or alter procedure [Tempus].[spNewTeam]
    @team_id int, @team_name int 
as 
begin 

end 

GO 

create or alter procedure [Tempus].[spNewUser]
    @user_id int, @username nvarchar(128), @nickname nvarchar(128),
    @email varchar(128), @password_hash varchar(1000), @password_salt varchar(1000)
as 
begin 

end
 
go 

/*=-=-=-=-=-=-=-=-=-=-=- Delete procedures -=-=-=-=-=-=-=-=-=-=-=*/

create or alter procedure [Tempus].[spDeleteTask]
    @task_id int
as 
begin 

end

go 

create or alter procedure [Tempus].[spDeleteComment]
    @comment_id int 
as 
begin 

end 

go 

create or alter procedure [Tempus].[spDeleteWorkspace]
    @workspace_id int
as 
begin 

end 

go

create or alter procedure [Tempus].[spDeleteCategory]
    @category_id int
as 
begin 

end 

go 

create or alter procedure [Tempus].[spRemoveTeamMember]
    @user_id int, @team_id int
as 
begin 

end 

go 

create or alter procedure [Tempus].[spDeleteTeam]
    @team_id int 
as 
begin 

end 

go 

create or alter procedure [Tempus].[spDeleteUser]
    @user_id int 
as 
begin 

end 

go 

/*=-=-=-=-=-=-=-=-=-=-=- UPDATE PROCEDURES -=-=-=-=-=-=-=-=-=-=-=*/

create or alter procedure [Tempus].[spUpdateTaskName]
    @task_id int, @task_new_name nvarchar(255)
as 
begin 

end

go 

create or alter procedure [Tempus].[spUpdateTaskContent]
    @task_id int, @task_new_content nvarchar(512)
as 
begin 

end

go 

create or alter procedure [Tempus].[spUpdateTaskSituation]
    @task_id int, @task_new_situation nvarchar(128)
as 
begin 

end