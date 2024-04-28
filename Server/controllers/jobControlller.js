const JobModel = require("../models/job");

const createJobPost = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;

    const {
      companyName,
      title,
      description,
      logoUrl,
      salary,
      location,
      duration,
      locationType,
      information,
      jobType,
      skills,
    } = req.body;

    if (
      !companyName ||
      !title ||
      !description ||
      !logoUrl ||
      !salary ||
      !location ||
      !duration ||
      !locationType ||
      !information ||
      !jobType ||
      !skills ||
      !currentUserId
    ) {
      return res.status(400).json({ errorMessage: "Bad Request" });
    }

    const jobDetails = new JobModel({
      companyName,
      title,
      description,
      logoUrl,
      salary,
      location,
      duration,
      locationType,
      information,
      jobType,
      skills,
      refUserId: currentUserId,
    });

    const result = await jobDetails.save();

    if (!result) {
      res
        .status(500)
        .json({ errorMessage: "Something went wrong while creating job post" });
    }

    res.status(200).json({ message: "Job post created Sucessfully!." });
  } catch (error) {
    next(error);
  }
};

const getJobDetailById = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res
        .status(400)
        .json({ errorMessage: "Bad Request, JobId is not provided." });
    }

    const jobDetails = await JobModel.findOne({ _id: jobId });

    if (!jobDetails) {
      return res
        .status(400)
        .json({
          errorMessage: `No Job details found for this jobId ${jobId}.`,
        });
    }

    res.status(200).json({
      jobDetails,
    });
  } catch (error) {
    next(error);
  }
};

const updateJobDetailsById = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const currentUserId = req.currentUserId;
    const {
      companyName,
      title,
      description,
      logoUrl,
      salary,
      location,
      duration,
      locationType,
      information,
      jobType,
      skills,
    } = req.body;

    if (
      !companyName ||
      !title ||
      !description ||
      !logoUrl ||
      !salary ||
      !location ||
      !duration ||
      !locationType ||
      !information ||
      !jobType ||
      !skills ||
      !currentUserId
    ) {
      return res.status(400).json({ errorMessage: "Bad Request" });
    }

    if (!jobId) {
      return res
        .status(400)
        .json({ errorMessage: "Bad Request, JobId is not provided." });
    }

    let isJobExist = await JobModel.findOne({ _id : jobId });

    if (!isJobExist) {
      return res
        .status(400)
        .json({ errorMessage: `Job doesn't exist for this ${jobId} jobId` });
    }

    await JobModel.updateOne(
      { _id: jobId },
      {
        $set: {
          companyName,
          title,
          description,
          logoUrl,
          salary,
          location,
          duration,
          locationType,
          information,
          jobType,
          skills,
        },
      }
    );

    res.status(200).json({ message: "Job post updated Sucessfully!." });
  } catch (error) {
    next(error)
  }
};

const getAllJobs = async ( req , res , next) => {
  try {
    const jobList =  await JobModel.find({},{companyName : 1 , title : 1, description : 1})
    res.status(200).json({ data: jobList });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createJobPost,
  getJobDetailById,
  updateJobDetailsById,
  getAllJobs
};
