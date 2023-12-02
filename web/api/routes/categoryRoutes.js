const router = require('express').Router()
const categoryController = require('../controllers/categoryController')

router.get(('/get'), categoryController.getCategory)
router.post(('/'), categoryController.postCategory)
router.put(('/'), categoryController.putCategory)
router.delete(('/'), categoryController.deleteCategory)
router.patch(('/name'), categoryController.patchCategoryName)
router.patch(('/description'), categoryController.patchCategoryDescription)

module.exports = router

