/*=-=-=-=-=-=-=-=-=-=-=- CREATE PROCEDURES -=-=-=-=-=-=-=-=-=-=-=*/

create or alter procedure [Tempus].[spNewTask]
    @task_name nvarchar(255),
    @task_content nvarchar(512),
    @workspace_id int,
    @task_situation nvarchar(128),
    @task_begin datetime,
    @task_end datetime,
    @task_category int
as
begin
    declare @task_without_name_msg varchar(255) = 'Tarefa sem nome'
    if @task_name = ''
    begin
        set @task_name = @task_without_name_msg
    end
    begin try
    insert into [Tempus].[Task]
    values
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
    @task_id int,
    @content ntext,
    @comment_datetime datetime,
    @user_id int
as
begin
    if @content is null
    begin
        raiserror('Comment content can not be null', 16, 1)
        return
    end
    begin try
    insert into [Tempus].[Comment]
    values
        (@task_id, @content, @comment_datetime, @user_id )
    end try 
    begin catch 
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1
    end catch
end

go



create or alter procedure [Tempus].[spNewWorkspace]
    @workspace_id int = null,
    @workspace_name nvarchar(128),
    @workspace_description nvarchar(255),
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
        if @workspace_id is null 
        begin
        if not exists (select 1 from [Tempus].[Workspace] where workspace_id = @workspace_id)
            begin
            insert into [Tempus].[Workspace]
                (workspace_name, workspace_description, team_id, workspace_admin)
            values
                (@workspace_name, @workspace_description, @team_id, @workspace_admin)
        end
        return
    end 
        else 
        begin
        insert into [Tempus].[Workspace]
        values
            (@workspace_id, @workspace_name, @workspace_description, @team_id, @workspace_admin)
    end 
    end try 

    begin catch
        declare @error_message nvarchar(2048)
        set @error_message = 'Erro: '+Error_Message();
        throw 51200, @error_message, 1 
    end catch

end 

go

create or alter procedure [Tempus].[spNewCategory]
    @category_id int,
    @category_name nvarchar(255),
    @category_description nvarchar(512)
as
begin
    if @category_id is null or @category_name is null or @category_description is null 
    begin 
        RAISERROR('Invalid parameters', 16, 1)
        return
    end
    begin try
        begin transaction  
        if exists (select 1 from [Tempus].[Category] where category_id = @category_id)
        begin 
            RAISERROR('Category already exists', 16, 1)
            return    
        end 
        insert into [Tempus].[Category] values 
            (@category_id, @category_name, @category_description)
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
    @team_id int,
    @team_name int
as
begin
    if @team_name is null 
    begin 
        RAISERROR('Invalid parameters', 16, 1)
        return
    end 
    if exists(SELECT 1 from [Tempus].[Team] where team_id = @team_id)
    begin 
        RAISERROR('Team already exists', 16, 1)
        return
    end
    begin try 
        begin transaction 
        insert into [Tempus].[Team] values 
            (@team_id, @team_name)
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
    @username nvarchar(128),
    @nickname nvarchar(128),
    @email varchar(128),
    @password_hash varchar(100),
    @password_salt varchar(100)
as
begin
    if @username is null or @nickname is null or @email is null 
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
    @user_id int,
    @team_id int
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
    @task_id int,
    @task_new_name nvarchar(255)
as
begin

end

go

create or alter procedure [Tempus].[spUpdateTaskContent]
    @task_id int,
    @task_new_description nvarchar(512)
as
begin

    end

go

create or alter procedure [Tempus].[spUpdateTaskSituation]
    @task_id int,
    @task_new_situation nvarchar(128)
as
begin

    end

go

create or alter procedure [Tempus].[spUpdateWorkspaceName]
    @workspace_id int,
    @workspace_new_name nvarchar(128)
as
begin

    end

go

create or alter procedure [Tempus].[spUpdateWorkspaceDescription]
    @workspace_id int,
    @workspace_new_description nvarchar(255)
as
begin

    end

go

create or alter procedure [Tempus].[spUpdateWorkspaceTeam]
    @workspace_id int,
    @workspace_new_team int
as
begin

    end

go

create or alter procedure [Tempus].[spUpdateWorkspaceAdmin]
    @workspace_id int,
    @workspace_new_admin int
as
begin

    end

go

create or alter procedure [Tempus].[spUpdateCategoryName]
    @category_id int,
    @category_new_name nvarchar(255)
as
begin

    end

go

create or alter procedure [Tempus].[spUpdateCategoryContent]
    @category_id int,
    @category_new_content nvarchar(512)
as
begin

    end

go

create or alter procedure [Tempus].[spUpdateTeamName]
    @team_id int,
    @team_new_name nvarchar(128)
as
begin

    end

go

create or alter procedure [Tempus].[spUpdateUserNickname]
    @user_id int,
    @user_new_nickname nvarchar(128)
as
begin

    end

go

create or alter procedure [Tempus].[spUpdateUserEmail]
    @user_id int,
    @user_new_email varchar(128)
as
begin

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
