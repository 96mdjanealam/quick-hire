import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
    title: string;
    company: string;
    company_logo: string;
    location: string;
    category: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

const jobSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    company_logo: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model<IJob>('Job', jobSchema);
