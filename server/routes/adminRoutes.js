const express = require('express')
const router = express.Router()
const cors = require('cors')
const {users,viewProjects,deleteUsers} = require('../controllers/adminControllers')

//Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.get('/', users)
router.post('/viewproject', viewProjects)
router.post('/deleteuser', deleteUsers)
module.exports = router