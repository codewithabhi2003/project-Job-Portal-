import { Application } from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.jobId; // ✅ Corrected jobId retrieval

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required ⚠️",
                success: false
            });
        }

        // Check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job ❌",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found ❌",
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save(); // ✅ Fixed missing space issue

        return res.status(201).json({
            message: "Job applied successfully 🎉",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


// Admin: Get applicants for a job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;  
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found. 🚫",
                success: false
            });
        }

        return res.status(200).json({
            job, 
            success: true, // ✅ Fixed typo from "succees" to "success"
            message: "Applicants fetched successfully! ✅"
        });

    } catch (error) {
        console.error("Error fetching applicants ❌:", error);
        return res.status(500).json({
            message: "Server error. Please try again later. ⚠️",
            success: false
        });
    }
};


export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id; // ✅ Fixed variable name

        if (!status) {
            return res.status(400).json({
                message: "Status is required ⚠️",
                success: false
            });
        }

        // Find the application by ID
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found ❌",
                success: false
            });
        }

        // Update the status
        application.status = status.toLowerCase(); // ✅ Fixed incorrect function call
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully 🎉",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};
