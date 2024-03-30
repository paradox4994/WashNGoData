const express = require('express');
const router = express.Router();
const cors = require('cors');
const upload = require('../helpers/multerConfig'); 
const {projects, saveProjects, viewProjects, deleteProjects} = require('../controllers/projectControllers');

// Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
);


router.post('/', projects);
router.post('/viewproject', viewProjects);
router.post('/saveproject', upload.single('file'), saveProjects);
router.post('/deleteproject', deleteProjects);

module.exports = router;
