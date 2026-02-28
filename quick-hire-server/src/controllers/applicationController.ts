import { Request, Response, NextFunction } from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';

// @desc    Submit job application
// @route   POST /api/applications
// @access  Public
export const submitApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { job_id } = req.body;
        
        // Check if job exists
        const job = await Job.findById(job_id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        const application = await Application.create(req.body);
        res.status(201).json({ success: true, data: application });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete job application
// @route   DELETE /api/applications/:id
// @access  Private/Admin
export const deleteApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        await application.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};
