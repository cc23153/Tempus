create schema [Tempus]

go

create table [Tempus].[User](
    [user_id] int identity primary key,
    [username] varchar(40) not null unique,
    [nickname] nvarchar(40) not null,
    [email] varchar(128) not null unique,
    [password_hash] varchar(64) not null,
    [password_salt] varchar(64) not null,
    [register_datetime] datetime not null,
    [profile_picture] varchar(2000) null
)

create table [Tempus].[Team](
    [team_id] int identity primary key,
    [team_name] nvarchar(50) not null
)

-- Tabela de junção para estabelecer a relação entre Team e User
create table [Tempus].[TeamMembers](
    [teammembers_id] int identity primary key,
    [team_id] int not null,
    [user_id] int not null,
    constraint [fk_team_id] foreign key([team_id])
    references [Tempus].[Team]([team_id]),
    constraint [fk_user_id] foreign key([user_id])
    references [Tempus].[User]([user_id])
)

create table [Tempus].[Category](
    [category_id] int identity primary key,
    [category_name] nvarchar(50) not null,
    [category_description] nvarchar(128) null
)

create table [Tempus].[Workspace](
    [workspace_id] int identity primary key,
    [workspace_name] nvarchar(50) not null,
    [workspace_description] nvarchar(128) not null,
    [team_id] int not null,
    [workspace_admin] int not null,

    constraint [fk_workspace_team_id] foreign key([team_id])
    references [Tempus].[Team]([team_id]),
    constraint [fk_workspace_admin] foreign key([workspace_admin])
    references [Tempus].[User]([user_id])
)

create table [Tempus].[Task](
    [task_id] int identity primary key,
    [task_name] nvarchar(50) not null,
    [task_content] nvarchar(512) null,
    [task_situation] nvarchar(50) not null,
    [task_image] varchar(2000) null,
    [workspace_id] int not null,
    [task_situation] nvarchar(50) not null,

    [task_begin] datetime not null,
    [task_end] datetime not null,
    [task_category] int not null,

    constraint [fk_workspace_id] foreign key([workspace_id])
    references [Tempus].[Workspace]([workspace_id]),
    constraint [fk_task_category] foreign key([task_category])
    references [Tempus].[Category]([category_id])
)

create table [Tempus].[Comment](
    [comment_id] int identity primary key,
    [task_id] int not null,
    [content] ntext not null,
    [comment_datetime] datetime not null,
    [user_id] int not null,

    constraint [fkUserId] foreign key([user_id])
    references [Tempus].[User]([user_id]),
    constraint [fk_task_id] foreign key([task_id])
    references [Tempus].[Task]([task_id])
)
