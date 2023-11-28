const router = require('express').Router()
const commentController = require('../controllers/commentController')

router.get('/', commentController.getComment)
router.post('/', commentController.postComment)
router.put('/', commentController.putComment)
router.delete('/', commentController.deleteComment)
router.patch('/', commentController.patchCommentContent)

module.exports = router