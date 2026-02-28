import { Request, Response, NextFunction } from 'express';
import Job from '../models/Job.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobs = await Job.find().sort({ created_at: -1 });
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Admin
export const createJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'company_logos');
            req.body.company_logo = result.secure_url;
        }

        const job = await Job.create(req.body);
        res.status(201).json({ success: true, data: job });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Admin
export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        res.status(200).json({ success: true, message: 'Job deleted' });
    } catch (error) {
        next(error);
    }
};
