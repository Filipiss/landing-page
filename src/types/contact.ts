export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmissionPayload extends ContactFormData {
  access_key: string;
  subject: string;
  from_name: string;
}

export type ContactStatus = 'idle' | 'sending' | 'success' | 'error';
