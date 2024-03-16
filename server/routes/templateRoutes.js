const express = require('express')
const router = express.Router()
const cors = require('cors')
const {templates} = require('../controllers/templateControllers')

//Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.get('/', templates)
module.exports = router