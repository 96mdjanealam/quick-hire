import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const validateJob = (req: Request, res: Response, next: NextFunction) => {
    const { title, company, location, category, description } = req.body;
    const errors: string[] = [];

    if (!title || validator.isEmpty(title)) errors.push('Title is required');
    if (!company || validator.isEmpty(company)) errors.push('Company is required');
    if (!location || validator.isEmpty(location)) errors.push('Location is required');
    if (!category || validator.isEmpty(category)) errors.push('Category is required');
    if (!description || validator.isEmpty(description)) errors.push('Description is required');

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    next();
};

export const validateApplication = (req: Request, res: Response, next: NextFunction) => {
    const { job_id, name, email, resume_link, cover_note } = req.body;
    const errors: string[] = [];

    if (!job_id || validator.isEmpty(job_id)) errors.push('Job ID is required');
    if (!name || validator.isEmpty(name)) errors.push('Name is required');
    if (!email || !validator.isEmail(email)) errors.push('Valid email is required');
    if (!resume_link || !validator.isURL(resume_link)) errors.push('Valid resume link URL is required');
    if (!cover_note || validator.isEmpty(cover_note)) errors.push('Cover note is required');

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    next();
};
