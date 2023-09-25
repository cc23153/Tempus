create table Tempus

create table Tempus.User(
    user_id int identity primary key,
    username nvarchar(128) not null,
    email varchar(128) not null,
    password_hash varchar(1000) not null, --hash da senha
    password_salt varchar(1000) not null, -- o salt da senha para descriptografar depois
)
-- Tabela de equipe com relacionamento 1-N com membros
create table Tempus.Team(
    team_id int primary key,
    team_name nvarchar(50) not null,
    --member -- Como inserir no SQL um atributo multi valorado?
)
create table Tempus.Category(
    category_id int primary key,
    category_name nvarchar(255),
    category_content nvarchar(512)
)
create table Tempus.Workspace(
    workspace_id int identity primary key,
    workspace_name nvarchar(128) not null,
    workspace_description nvarchar(255) not null,
    team_id int not null,
    workspace_admin int not null,    

    constraint fk_team_id foreign key(team_id)
    references Tempus.Team(team_id),
    constraint fk_workspace_admin foreign key(workspace_admin)
    references Tempus.User(user_id)
)

create table Tempus.Comment(
    comment_id int identity primary key,
    content ntext not null,
    comment_datetime datetime not null,
    user_id int not null,

    constraint fkUserId foreign key(user_id)
    references Tempus.User(user_id)
)

create table Tempus.Task(
    task_id int identity primary key,
    task_name nvarchar(255) not null,
    task_content nvarchar(512) null,
    workspace_id int not null,
    -- A T E N Ç Ã O  ! ! ! ! !
    task_situation nvarchar(128) not null, -- Rever isto

    task_begin datetime not null,
    task_end datetime not null,
    task_category int not null,

    constraint fk_workspace_id foreign key(workspace_id)
    references Tempus.Workspace(workspace_id),
    constraint fk_task_category foreign key(task_category)
    references Tempus.Category(category_id)

)

create index


-- CREATE TABLE Tempus.TeamMembers (
--     member_id int primary key,
--     member_name nvarchar(50) not null
-- );


-- CREATE TABLE Tempus.Team (
--     team_id int primary key,
--     team_name nvarchar(50) not null
-- );

-- -- Tabela de junção para estabelecer a relação entre Team e TeamMembers
-- CREATE TABLE Tempus.TeamMembers (
--     team_id int,
--     member_id int,
--     FOREIGN KEY (team_id) REFERENCES Tempus.Team(team_id),
--     FOREIGN KEY (member_id) REFERENCES Tempus.TeamMembers(member_id)
-- );