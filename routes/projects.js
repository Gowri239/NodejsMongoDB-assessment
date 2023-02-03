const express = require('express')

const router = express.Router()

const projectController = require('../controllers/projects')
const userAuthentication = require('../middleware/auth')

router.post('/add-project',userAuthentication.authenticate,projectController.addProject)
router.post('/:pageno',userAuthentication.authenticate,projectController.getProjects)

module.exports = router
