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
