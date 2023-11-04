exec Tempus.spNewUser 'zbl4ck', 'Bijardin', 'bijardin@protonmail.com', '8349a724c0e39806b09ea29871c94852e0678406d56761a1dfc342118e71be8c', 'mskjh23iu23s9_ljd%ius82'
exec Tempus.spNewUser 'manlkihvonhultz', 'Mankilh Von Hültz', 'aufdaswiedersehan@kraken.com', '25568d24ce9730df69babeee7456a399037e622741abb06e133f1f3fa0574f87', '*sdjhfi7ys8u7gjshgdfj'
exec Tempus.spNewUser 'schmetterling', 'Schmetterling', 'schmet@deutschland.de', '335a707558147bbbbeacf2e1792624546da916abff03a4f0706e6e1692969a80', '83i$ykjb#d!h$gfalj2_8'
exec Tempus.spNewUser 'vladpetro', 'Petrov', 'mungerdasrt@gmail.com', '68b2c5d030c2ebf807792e85b5f07a1f9c8c501fd8f461990423cac6c0fd2196', 'd!kshsd\fut876342hs84'
exec Tempus.spNewUser 'carlsontenet', 'Tenet', 'contact.carlsontenet@gmail.com', 'dbe4a105e771bbef7b8b5ef177b0eadb1734c067bf29cb7a5113a8f6f8560d6a', '9d78yfudh35nv$%3q!_gj'
exec Tempus.spNewUser 'snowden', 'Edward', 'ashflunde@protonmail.com', 'f476ac6e7279f49946f47ec035946fb4deb3bd5a2aa7f301b26fce0ba5dc80b8', '0xDEADBEEF_X2!Y&ZNABG'
exec Tempus.spNewUser 'roman', 'Legio Aeterna', 'legio@therome.org', 'b2cf65186994a531c6ba6b97ee9a6beca057cfed041d11a932a5037808d3b35a', '*lglatn374bdc_8@!785'

exec Tempus.spNewTeam 'Grupo G Matutino'

exec Tempus.spNewCategory 'Bug Fix', 'Tarefas de para correção de bugs'
exec Tempus.spNewCategory 'Documentation', 'Mudanças necessárias na documentação'

exec TEmpus.spNewWorkspace 'Workspace I', 'Workspace de teste', 1, 1

exec Tempus.spNewTask 'Tarefa I', 'Resolver problema X na linha Y do código Z, para não impactar serviço Alpha', 1, 'Em progresso', '2023-11-03', '2023-11-10', 1

exec Tempus.spNewComment 1, 'Está tudo errado isso ai', '2023-11-03', 1

exec Tempus.spAddTeamMember 1, 1

-- Select all
select * from Tempus.[User]
select * from Tempus.Team  
select * from Tempus.Category
select * from Tempus.Workspace
select * from Tempus.Task
select * from Tempus.Comment
select * from Tempus.TeamMembers

-- Reset identities
DBCC CHECKIDENT('Tempus.[Task]', reseed, 0)
DBCC CHECKIDENT('Tempus.[Team]', reseed, 0)
DBCC CHECKIDENT('Tempus.[User]', reseed, 0)
DBCC CHECKIDENT('Tempus.[Category]', reseed, 0)
DBCC CHECKIDENT('Tempus.[Comment]', reseed, 0)
DBCC CHECKIDENT('Tempus.[TeamMembers]', reseed, 0)
