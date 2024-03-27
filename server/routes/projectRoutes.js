const express = require('express')
const router = express.Router()
const cors = require('cors')
const {projects, saveProjects, viewProjects} = require('../controllers/projectControllers')


//Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.post('/', projects)
router.post('/viewproject', viewProjects)
router.post('/saveproject', saveProjects)

module.exports = router