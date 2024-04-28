const express = require('express')
const router = express.Router()

const jobController = require('../controllers/jobControlller')
const verifyToken = require('../middlewares/verifyAuth')

router.post("/create",verifyToken,jobController.createJobPost)
router.get("/job-details/:jobId",jobController.getJobDetailById)
router.get("/get-all",jobController.getAllJobs)
router.put("/update-job/:jobId",verifyToken,jobController.updateJobDetailsById)

module.exports = router;