/*=-=-=-=-=-=-=-=-=-=-=- CREATE PROCEDURES -=-=-=-=-=-=-=-=-=-=-=*/

create or alter procedure [Tempus].[spNewTask]
    @task_name nvarchar(50),
    @task_content nvarchar(512),
    @workspace_id int,
    @task_situation nvarchar(50),
    @task_begin datetime,
    @task_end datetime,
    @task_category int
as
begin
    declare @task_without_name_msg varchar(50) = 'Tarefa sem nome'
    if @task_name = ''
    begin
        set @task_name = @task_without_name_msg
    end
    begin try
        begin transaction 
        insert into [Tempus].[Task] (task_name, task_content, workspace_id, task_situation, task_begin, task_end, task_category)
        values
            (@task_name, @task_content, @workspace_id, @task_situation, @task_begin, @task_end, @task_category)
        commit
    end try 
    begin catch
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1
    end catch
end

go

create or alter procedure [Tempus].[spNewComment]
    @task_id int,
    @content ntext,
    @comment_datetime datetime,
    @user_id int
as
begin
    if @comment_datetime is null 
    begin 
        set @comment_datetime = getdate()
    end
    if @content is null or @task_id is null or @user_id is null
    begin
        raiserror('Invalid parameters', 16, 1)
        return
    end
    begin try
        begin transaction
        insert into [Tempus].[Comment]
        values
            (@task_id, @content, @comment_datetime, @user_id)
        commit
    end try 
    begin catch 
        rollback
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1
    end catch
end

go



create or alter procedure [Tempus].[spNewWorkspace]
    @workspace_name nvarchar(50),
    @workspace_description nvarchar(128),
    @workspace_admin int,
    @team_id int
as
begin
    if @workspace_name is null or
        @workspace_description is null or
        @workspace_admin is null or
        @team_id is null
    begin
        RAISERROR('Invalid parameters', 16, 1)
        return
    end

    begin try
        begin transaction
        insert into [Tempus].[Workspace](workspace_name, workspace_description, team_id, workspace_admin)
        values
            (@workspace_name, @workspace_description, @team_id, @workspace_admin)
        commit
    end try 

    begin catch
        rollback
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1 
    end catch

end 

go

create or alter procedure [Tempus].[spNewCategory]
    @category_name nvarchar(50),
    @category_description nvarchar(128)
as
begin
    if @category_name is null or @category_description is null 
    begin 
        RAISERROR('Invalid parameters', 16, 1)
        return
    end
    begin try
        begin transaction  
        if exists (select 1 from [Tempus].[Category] where category_name = @category_name)
        begin 
            RAISERROR('Category already exists', 16, 1)
            return    
        end 
        insert into [Tempus].[Category](category_name, category_description) values 
            (@category_name, @category_description)
        commit
    end try 

    begin catch
        rollback
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
        return
    end catch

end

go

create or alter procedure [Tempus].[spAddTeamMember]
    @team_id int,
    @user_id int
as
begin
    if @team_id is null or @user_id is null 
    begin 
        RAISERROR('Invalid parameters', 16, 1)
        return
    end 
    
    if exists(SELECT 1 from [Tempus].[TeamMembers] where team_id = @team_id and user_id = @user_id)
    begin 
        RAISERROR('User is already a member', 16, 1)
        return
    end

    begin try 
        insert into [Tempus].[TeamMembers] values 
            (@team_id, @user_id)
        return
    end try 

    begin catch 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1 
    end catch

end

go

create or alter procedure [Tempus].[spNewTeam]
    @team_name nvarchar(50)
as
begin
    if @team_name is null 
    begin 
        RAISERROR('Invalid parameters', 16, 1)
        return
    end 
    begin try 
        begin transaction 
        insert into [Tempus].[Team] values 
            (@team_name)
        commit 
    end try 

    begin catch
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1 
    end catch

end 

GO

create or alter procedure [Tempus].[spNewUser]
    @username nvarchar(40),
    @nickname nvarchar(40),
    @email varchar(128),
    @password_hash varchar(64),
    @password_salt varchar(64)
as
begin
    if @username is null or @nickname is null or @email is null 
       or @password_hash is null or @password_salt is null
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end 
    begin try
    begin transaction
        insert into [Tempus].[User](username, nickname, email, password_hash, password_salt, register_datetime) 
        values (@username, @nickname, @email, @password_hash, @password_salt, getdate())
        commit
    end try

    begin catch
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1 
    end catch

end
 
go

/*=-=-=-=-=-=-=-=-=-=-=- Delete procedures -=-=-=-=-=-=-=-=-=-=-=*/

create or alter procedure [Tempus].[spDeleteTask]
    @task_id int
as
begin
    if @task_id is null 
    begin 
        raiserror('Task_id can''t be null', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Task] where task_id = @task_id)
    begin 
        raiserror('The task doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        delete from [Tempus].[Task] where task_id = @task_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch 

end

go

create or alter procedure [Tempus].[spDeleteComment]
    @comment_id int
as
begin
    if @comment_id is null 
    begin 
        raiserror('Comment_id can''t be null', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Comment] where comment_id = @comment_id)
    begin 
        raiserror('The comment doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        delete from [Tempus].[Comment] where comment_id = @comment_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch 
end 

go

create or alter procedure [Tempus].[spDeleteWorkspace]
    @workspace_id int
as
begin
    if @workspace_id is null 
    begin 
        raiserror('Workspace_id can''t be null', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Workspace] where workspace_id = @workspace_id)
    begin 
        raiserror('The workspace doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        delete from [Tempus].[Workspace] where workspace_id = @workspace_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch 
end 

go

create or alter procedure [Tempus].[spDeleteCategory]
    @category_id int
as
begin
    if @category_id is null 
    begin 
        raiserror('Category_id can''t be null', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Category] where category_id = @category_id)
    begin 
        raiserror('The category doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        delete from [Tempus].[Category] where category_id = @category_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch 
end 

go

create or alter procedure [Tempus].[spRemoveTeamMember]
    @user_id int,
    @team_id int
as
begin
    if @user_id is null or @team_id is null
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[TeamMembers] where team_id = @team_id and user_id = @user_id)
    begin 
        raiserror('The user is not part of the team', 16, 1)
        return
    end
    begin try 
        begin transaction
        delete from [Tempus].[TeamMembers] where team_id = @team_id and user_id = @user_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end 

go

create or alter procedure [Tempus].[spDeleteTeam]
    @team_id int
as
begin
    if @team_id is null 
    begin 
        raiserror('Team_id can''t be null', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Team] where team_id = @team_id)
    begin 
        raiserror('The team doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        delete from [Tempus].[Team] where team_id = @team_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end 

go

create or alter procedure [Tempus].[spDeleteUser]
    @user_id int
as
begin
    if @user_id is null 
    begin 
        raiserror('User_id can''t be null', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[User] where user_id = @user_id)
    begin 
        raiserror('The user doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        delete from [Tempus].[User] where user_id = @user_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end 

go

/*=-=-=-=-=-=-=-=-=-=-=- UPDATE PROCEDURES -=-=-=-=-=-=-=-=-=-=-=*/

create or alter procedure [Tempus].[spUpdateTaskName]
    @task_id int,
    @task_new_name nvarchar(50)
as
begin
    if @task_id is null or @task_new_name is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Task] where task_id = @task_id)
    begin 
        raiserror('The task doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[Task] set task_name = @task_new_name where task_id = @task_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end

go

create or alter procedure [Tempus].[spUpdateTaskDescription]
    @task_id int,
    @task_new_description nvarchar(512)
as
begin
    if @task_id is null or @task_new_description is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Task] where task_id = @task_id)
    begin 
        raiserror('The task doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[Task] set task_content = @task_new_description where task_id = @task_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end

go

create or alter procedure [Tempus].[spUpdateTaskSituation]
    @task_id int,
    @task_new_situation nvarchar(50)
as
begin
    if @task_id is null or @task_new_situation is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Task] where task_id = @task_id)
    begin 
        raiserror('The task doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[Task] set task_situation = @task_new_situation where task_id = @task_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end

go

create or alter procedure [Tempus].[spUpdateWorkspaceName]
    @workspace_id int,
    @workspace_new_name nvarchar(50)
as
begin
    if @workspace_id is null or @workspace_new_name is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Workspace] where workspace_id = @workspace_id)
    begin 
        raiserror('The workspace doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[Workspace] set workspace_name = @workspace_new_name where workspace_id = @workspace_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end

go

create or alter procedure [Tempus].[spUpdateWorkspaceDescription]
    @workspace_id int,
    @workspace_new_description nvarchar(128)
as
begin
    if @workspace_id is null or @workspace_new_description is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Workspace] where workspace_id = @workspace_id)
    begin 
        raiserror('The workspace doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[Workspace] set workspace_description = @workspace_new_description where workspace_id = @workspace_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end
go

create or alter procedure [Tempus].[spUpdateWorkspaceAdmin]
    @workspace_id int,
    @workspace_new_admin int
as
begin
    if @workspace_id is null or @workspace_new_admin is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[User] where user_id = @workspace_new_admin)
    begin 
        raiserror('The user doesn''t exist', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Workspace] where workspace_id = @workspace_id)
    begin 
        raiserror('The workspace doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[Workspace] set workspace_admin = @workspace_new_admin where workspace_id = @workspace_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end

go

create or alter procedure [Tempus].[spUpdateCategoryName]
    @category_id int,
    @category_new_name nvarchar(50)
as
begin
    if @category_id is null or @category_new_name is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Category] where category_id = @category_id)
    begin 
        raiserror('The category doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[Category] set category_name = @category_new_name where category_id = @category_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch

end

go

create or alter procedure [Tempus].[spUpdateCategoryContent]
    @category_id int,
    @category_new_content nvarchar(128)
as
begin
     if @category_id is null or @category_new_content is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Category] where category_id = @category_id)
    begin 
        raiserror('The category doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[Category] set category_description = @category_new_content where category_id = @category_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
    
end

go

create or alter procedure [Tempus].[spUpdateTeamName]
    @team_id int,
    @team_new_name nvarchar(50)
as
begin
    if @team_id is null or @team_new_name is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Team] where team_id = @team_id)
    begin 
        raiserror('The team doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[Team] set team_name = @team_new_name where team_id = @team_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
    
end

go

create or alter procedure [Tempus].[spUpdateUserNickname]
    @user_id int,
    @user_new_nickname nvarchar(40)
as
begin
    if @user_id is null or @user_new_nickname is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[User] where user_id = @user_id)
    begin 
        raiserror('The user doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[User] set nickname = @user_new_nickname where user_id = @user_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch

end

go

create or alter procedure [Tempus].[spUpdateUserEmail]
    @user_id int,
    @user_new_email varchar(40)
as
begin
    if @user_id is null or @user_new_email is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[User] where user_id = @user_id)
    begin 
        raiserror('The user doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[User] set email = @user_new_email where user_id = @user_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end

go

create or alter procedure [Tempus].[spUpdateUsername]
    @user_id int,
    @user_new_username varchar(40)
as
begin
    if @user_id is null or @user_new_username is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[User] where user_id = @user_id)
    begin 
        raiserror('The user doesn''t exist', 16, 1)
        return
    end
    if exists (select 1 from [Tempus].[User] where username = @user_new_username and user_id != @user_id)
    begin 
        raiserror('The username is already taken', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[User] set username = @user_new_username where user_id = @user_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end

go

create or alter procedure [Tempus].[spUpdateUserPassword]
    @user_id int, @password_hash varchar(64), @password_salt varchar(64)
as
begin 
    if @user_id is null or @password_hash is null or @password_salt is null 
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[User] where user_id = @user_id)
    begin 
        raiserror('The user doesn''t exist', 16, 1)
        return
    end
    begin try
        begin transaction 
        update [Tempus].[User] 
        set password_hash = @password_hash, password_salt = @password_salt  
        where user_id = @user_id
        commit 
    end try

    begin catch
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1 
    end catch
end

go 
create or alter procedure [Tempus].[spUpdateUser]
    @user_id int,
    @username nvarchar(40),
    @nickname nvarchar(40), @email varchar(40) 
as
begin
    if @user_id is null or @username is null or @nickname is null or @email is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if exists (select 1 from [Tempus].[User] where username = @username and user_id != @user_id)
    begin 
        raiserror('The username is already taken', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[User] where user_id = @user_id)
    begin 
        raiserror('The user doesn''t exist', 16, 1)
        return
    end
    begin try 
        begin transaction
        update [Tempus].[User] set username = @username, nickname = @nickname, email = @email where user_id = @user_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end

go 

create or alter procedure [Tempus].[spUpdateTask]
    @task_id int,
    @task_name nvarchar(50),
    @task_content nvarchar(512),
    @workspace_id int,
    @task_situation nvarchar(50),
    @task_begin datetime,
    @task_end datetime,
    @task_category int
as
begin
    if @task_id is null or @task_name is null 
        or @task_content is null or @workspace_id is null 
        or @task_situation is null or @task_begin is null 
        or @task_end is null or @task_category is null  
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Task] where task_id = @task_id)
    begin 
        raiserror('The task doesn''t exist', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Workspace] where workspace_id = @workspace_id)
    begin 
        raiserror('The workspace doesn''t exist', 16, 1)
        return
    end

    begin try 
        begin transaction
        update [Tempus].[Task] 
            set task_name = @task_name, task_content = @task_content, 
                workspace_id = @workspace_id, task_situation = @task_situation, 
                task_begin = @task_begin, task_end = @task_end, 
                task_category = @task_category 
            where task_id = @task_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end

go

create or alter procedure [Tempus].[spUpdateCategory]
    @category_id int,
    @category_name nvarchar(50),
    @category_description nvarchar(128)
as
begin
    if @category_id is null or @category_name is null 
        or @category_description is null
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Category] where category_id = @category_id)
    begin 
        raiserror('The category doesn''t exist', 16, 1)
        return
    end

    begin try 
        begin transaction
        update [Tempus].[Category] 
            set category_name = @category_name, category_description = @category_description
            where category_id = @category_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end

go 


create or alter procedure [Tempus].[spUpdateWorkspace]
    @workspace_id int,
    @workspace_name nvarchar(50),
    @workspace_description nvarchar(128),
    @workspace_admin int
as
begin
    if @workspace_id is null or @workspace_name is null 
        or @workspace_description is null or @workspace_admin is null
    begin 
        raiserror('Invalid parameters', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[Workspace] where workspace_id = @workspace_id)
    begin 
        raiserror('The workspace doesn''t exist', 16, 1)
        return
    end
    if not exists (select 1 from [Tempus].[User] where user_id = @user_id)
    begin 
        raiserror('The user doesn''t exist', 16, 1)
        return
    end

    begin try 
        begin transaction
        update [Tempus].[Workspace] 
            set workspace_name = @workspace_name, workspace_description = @workspace_description, 
                workspace_admin = @workspace_admin
            where workspace_id = @workspace_id
        commit
    end try 

    begin catch 
        rollback 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1  
    end catch
end

go 

/*=-=-=-=-=-=-=-=-=-=-=- OUTRO PROCEDURES -=-=-=-=-=-=-=-=-=-=-=*/
create or alter procedure [Tempus].[spNumMembersTeam]
    @team_id int,
    @num int output
as
begin
    select @num = count([user_id])
    from [Tempus].[TeamMembers]
    where team_id = @team_id
    return @num
end
