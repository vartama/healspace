const express = require('express')
const UserController = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/', authentication, UserController.findOne)
router.put('/', authentication, UserController.update)
router.get('/bookmarks', authentication, UserController.findBookmarks)
router.get('/bookmarks/:id', authentication, UserController.findBookmark)
router.post('/bookmarks/:id', authentication, UserController.addBookmark)
router.delete('/bookmarks/:id', authentication, UserController.deleteBookmark)

module.exports = router