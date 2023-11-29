const { PrismaClient } = require('@prisma/client')
const { patchCategoryNameSchema, getCategorySchema, putCategorySchema, postCategorySchema, deleteCategorySchema, patchCategoryDescSchema } = require('../database/yup/categorySchemas')
const prisma = new PrismaClient()


exports.getCategory = (('/'), async (req, res)=> {
    const category_id = req.body.category_id

    await getCategorySchema.validate({category_id})
        .then(async () => {
            const category = await prisma.category.findUnique({
                where: {
                    category_id: category_id
                }
            })
            if(!category){
                res.status(404).json({error: true, message: 'not found'})
                return
            }
            res.status(200).json({error: false, category})

        })
        .catch((err) => {
            res.status(400).json({error: true, message: err.message})
        })
})

exports.postCategory = (('/'), async (req, res)=> {
    const category_name = req.body.category_name
    const category_description = req.body.category_description

    await postCategorySchema.validate({category_name, category_description})
        .then(async () => {
            await prisma.$queryRaw`exec Tempus.spNewCategory ${category_name}, ${category_description}`
            res.status(201).json({error: false, message: 'succesfully created'})
        })
        .catch((err) => {
            res.status(400).json({error: true, message: err.message})
        })
})

exports.putCategory = (('/'), async (req, res)=> {
    const category_id = req.body.category_id
    const category_name = req.body.category_name
    const category_description = req.body.category_description

    await putCategorySchema.validate({category_id, category_name, category_description})
        .then(async () => {
            const category = await prisma.category.findUnique({
                where: {
                    category_id: category_id
                }
            })
            if(!category){
                res.status(404).json({error: true, message: 'not found'})
                return
            }
            
            await prisma.$queryRaw`exec Tempus.spUpdateCategory ${category_id}, ${category_name}, ${category_description}`
            res.status(201).json({error: false, message: 'category succesfully updated'})
        })
        .catch((err) => {
            res.status(400).json({error: true, message: err.message})
        })
})

exports.deleteCategory = (('/'), async (req, res)=> {
    const category_id = req.body.category_id

    await deleteCategorySchema.validate({category_id})
        .then(async () => {
            const category = await prisma.category.findUnique({
                where: {
                    category_id: category_id
                }
            })
            if(!category){
                res.status(404).json({error: true, message: 'not found'})
                return
            }
            
            await prisma.$queryRaw`exec Tempus.spDeleteCategory ${category_id}`
            res.status(201).json({error: false, message: 'category succesfully deleted'})
        })
        .catch((err) => {
            res.status(400).json({error: true, message: err.message})
        })
})

exports.patchCategoryName = (('/'), async (req, res)=> {
    const category_id = req.body.category_id
    const category_name = req.body.category_name

    await patchCategoryNameSchema.validate({category_id, category_name})
        .then(async () => {
            const category = await prisma.category.findUnique({
            where: {
                    category_id: category_id
                }
            })
            if(!category){
                res.status(404).json({error: true, message: 'not found'})
                return
            }

            await prisma.$queryRaw`exec Tempus.spUpdateCategoryName ${category_id}, ${category_name}`
            res.status(200).json({error: false, message: 'succesfully updated'})
        })
        .catch((err) => {
            res.status(400).json({error: true, message: err.message})
        })
})

exports.patchCategoryDescription = (('/'), async (req, res)=> {
    const category_id = req.body.category_id
    const category_description = req.body.category_description

    await patchCategoryDescSchema.validate({category_id, category_description})
        .then(async () => {
            const category = await prisma.category.findUnique({
                where: {
                        category_id: category_id
                    }
                })
                if(!category){
                    res.status(404).json({error: true, message: 'not found'})
                    return
                }
    
                await prisma.$queryRaw`exec Tempus.spUpdateCategoryContent ${category_id}, ${category_description}`
                res.status(200).json({error: false, message: 'succesfully updated'})
        })
        .catch((err) => {
            res.status(400).json({error: true, message: err.message})
        })
})

module.exports