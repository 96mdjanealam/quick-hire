export interface Job {
  _id: string;
  title: string;
  company: string;
  company_logo: string;
  location: string;
  category: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface JobsApiResponse {
  success: boolean;
  count: number;
  data: Job[];
}

export interface JobApiResponse {
  success: boolean;
  data: Job;
}

export interface Application {
  _id: string;
  job_id: {
    _id: string;
    title: string;
    company: string;
  };
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationsApiResponse {
  success: boolean;
  count: number;
  data: Application[];
}

export interface GenericApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}
