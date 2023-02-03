const express = require('express')

const router = express.Router()

const taskController = require('../controllers/tasks')
const userAuthentication = require('../middleware/auth')

router.post('/add-task/:projectId',userAuthentication.authenticate,taskController.addTask)
router.post('/:pageno',userAuthentication.authenticate,taskController.getTasks)

module.exports = router
