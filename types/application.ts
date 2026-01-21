import type { Job } from './jobs';

export type Application = {
  id: number;
  documentId: string;
  job: Job;
  createdAt: string;
  resume: {
    id: number;
    documentId: string;
    url: string;
  };
};