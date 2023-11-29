const yup = require('yup')

const category_id = yup.number().positive('category_id must be a positive number')
                .required('category_id is required').defined('category_id must be defined')
                .nonNullable('category_id can\'t be null')

const category_name = yup.string().required()
                    .strict(true).typeError('username must be a string')
                    .nonNullable().min(1)
                    .max(50)

const category_description = yup.string().strict(true)
                             .typeError('category_description must be a string').min(5)
                             .max(128)

exports.getCategorySchema = yup.object().shape({
    category_id: category_id
})

exports.postCategorySchema = yup.object().shape({
    category_name: category_name,
    category_description: category_description
})

exports.putCategorySchema = yup.object().shape({
    category_id: category_id,
    category_name: category_name, 
    category_description: category_description
})

exports.deleteCategorySchema = yup.object().shape({
    category_id: category_id
})

exports.patchCategoryNameSchema = yup.object().shape({
    category_id: category_id,
    category_name: category_name
})

exports.patchCategoryDescSchema = yup.object().shape({
    category_id: category_id,
    category_description: category_description
})

