const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const workspaceExist =  async (workspace_id) => {
    const workspace = await prisma.workspace.findUnique({
        where: {
            workspace_id: workspace_id
        }
    })
    return workspace
}

const teamExist = async (team_id) => {
    const team = await prisma.team.findUnique({
        where: {
            team_id: team_id   
        }
    })
    return team
}

const userExist = async (user_id) => {
    const user = await prisma.user.findUnique({
        where: {
            user_id: user_id   
        }
    })
    return user
}

exports.getWorkspace = (('/'), async(req, res)=>{
    const workspace_id = req.body.workspace_id
    const workspace = await workspaceExist(workspace_id)
    if(!workspace){
        res.status(400).json({error: true, message : "Workspace doesn't exist"})
        return
    }
    res.status(200).json(workspace)
})

exports.postWorkspace = (('/'), async(req, res)=> {
    const workspace_name = req.body.workspace_name
    const workspace_description = req.body.workspace_description
    const workspace_admin = req.body.workspace_admin
    const team_id = req.body.team_id
    

    if(!userExist(workspace_admin)){
        res.status(400).json({error: true, message : "User doesn't exist"})
        return
    }
    if(!teamExist(team_id)){
        res.status(400).json({error: true, message : "Team doesn't exist"})
        return
    }

   await prisma.$queryRaw`exec Tempus.spNewWorkspace 
        ${workspace_name}, ${workspace_description},  
        ${workspace_admin}, ${team_id}`
   res.status(200).json({error: false, message: "Workspace succesfully inserted"})
})

exports.putWorkspace = (('/'), async(req, res)=> {
    const workspace_id = req.body.workspace_id
    const workspace_name = req.body.workspace_name
    const workspace_description = req.body.workspace_description
    const workspace_admin = req.body.workspace_admin

    const workspace = await workspaceExist(workspace_id)
    const user = await userExist(workspace_admin)

    if(!workspace){
        res.status(400).json({error: true, message : "Workspace doesn't exist"})
        return
    }
    if(!user){
        res.status(400).json({error: true, message : "User doesn't exist"})
        return
    }
   
   await prisma.$queryRaw`exec Tempus.spUpdateWorkspace  
        ${workspace_id}, ${workspace_name}, 
        ${workspace_description}, ${workspace_admin}`
   res.status(200).json({error: false, message: "Workspace succesfully updated"})
})

exports.deleteWorkspace = (('/'), async(req, res)=> {
    const workspace_id = req.body.workspace_id
    const workspace = await workspaceExist(workspace_id)
    if(!workspace){
        res.status(400).json({error: true, message : "Workspace doesn't exist"})
        return
   }
   
   await prisma.$queryRaw`exec Tempus.spDeleteWorkspace ${workspace_id}`
   res.status(200).json({error: false, message: "Workspace succesfully deleted"})
})

exports.patchWorkspaceName = (('/'), async(req, res)=> {
    const workspace_id = req.body.workspace_id
    const workspace_name = req.body.workspace_name
    const workspace = await workspaceExist(workspace_id)
    if(!workspace){
        res.status(400).json({error: true, message : "Workspace doesn't exist"})
        return
   }
   console.log(workspace_name)
   await prisma.$queryRaw`exec Tempus.spUpdateworkspaceName ${workspace_id}, ${workspace_name}`
   res.status(200).json({error: false, message: "Workspace succesfully updated"})
})

exports.patchWorkspaceDescription = (('/'), async(req, res)=> {
    const workspace_id = req.body.workspace_id
    const workspace_description = req.body.workspace_description
    const workspace = await workspaceExist(workspace_id)
    if(!workspace){
        res.status(400).json({error: true, message : "Workspace doesn't exist"})
        return
   }
   
   await prisma.$queryRaw`exec Tempus.spUpdateworkspaceDescription ${workspace_id}, ${workspace_description}`
   res.status(200).json({error: false, message: "Workspace succesfully updated"})
})

exports.patchWorkspaceAdmin = (('/'), async(req, res)=> {
    const workspace_id = req.body.workspace_id
    const workspace_admin = req.body.workspace_admin
    const workspace = await workspaceExist(workspace_id)
    const admin = await userExist(workspace_admin)
    if(!workspace){
        res.status(400).json({error: true, message : "Workspace doesn't exist"})
        return
    }
    if(!admin){
        res.status(400).json({error: true, message : "User doesn't exist"})
        return
    }
   
   await prisma.$queryRaw`exec Tempus.spUpdateworkspaceAdmin ${workspace_id}, ${workspace_admin}`
   res.status(200).json({error: false, message: "Workspace succesfully updated"})
})


module.exports 