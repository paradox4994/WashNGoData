const express = require('express')
const router = express.Router()
const cors = require('cors')
const {templates, saveTemplate, viewTemplate} = require('../controllers/templateControllers')

//Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.post('/', templates)
router.post('/savetemplate', saveTemplate)
router.post('/viewtemplate', viewTemplate)
module.exports = router