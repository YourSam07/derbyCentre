const express= require('express')
const { registerUser, loginrUser, getrUserData }= require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginrUser)
router.get('/data', protect, getrUserData)

module.exports = router