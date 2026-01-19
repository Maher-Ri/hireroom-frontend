import axios from 'axios';
import type { JobFilters } from '../types/jobs';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export async function fetchJobs({
    page,
    pageSize,
    filters
}: {
    page: number;
    pageSize: number;
    filters: JobFilters
}) {
    const query = new URLSearchParams();
    query.set('pagination[page]', String(page));
    query.set('pagination[pageSize]', String(pageSize));
    query.set('populate[benefits]', 'true');
    query.set('populate[aboutRole]', 'true');
    query.set('populate[whatWeDo]', 'true');
    query.set('populate[waysToWork]', 'true');
    query.set('populate[company][populate]', 'logo');
    // search by job title
    if (filters.search) {
        query.set('filters[jobTitle][$containsi]', filters.search);
    }
    // Rest of parameters
    if (filters.jobType) {
        query.set('filters[jobType][$eq]', filters.jobType);
    }
    if (filters.workplace) {
        query.set('filters[workplace][$eq]', filters.workplace);
    }
    if (filters.seniority) {
        query.set('filters[seniority][$eq]', filters.seniority);
    }
    const res = await axios.get(`${API_URL}/api/jobs?${query.toString()}`);
    return res.data;
}
export async function fetchJobsByDocId(documentId: string) {
    const query = new URLSearchParams();
    query.set('populate[benefits]', 'true');
    query.set('populate[aboutRole]', 'true');
    query.set('populate[whatWeDo]', 'true');
    query.set('populate[waysToWork]', 'true');
    query.set('populate[company][populate]', 'logo');
    const res = await axios.get(`${API_URL}/api/jobs/${documentId}?${query.toString()}`);
    return res.data;
}
export async function fetchCompanyByDocId(documentId: string) {
    const query = new URLSearchParams();
    query.set('populate', '*');
    const res = await axios.get(`${API_URL}/api/companies/${documentId}?${query.toString()}`);
    return res.data;
}
export async function createApplication({
    token,
    interestReason,
    skills,
    job,
    // user,
    resume
}: {
    token: string,
    interestReason: string,
    skills: string,
    job: string,
    // user: string,
    resume: string
}) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return await axios.post(`${API_URL}/api/applications`, {
        data: {
            interestReason,
            skills,
            job,
            applicationStatus: 'Pending',
            // user,
            resume
        }
    }, {
        headers
    });
}
export async function fetchApplicationStatus(jobDocId: string, session: any) {
    const headers = session ? { Authorization: `Bearer ${session?.jwt}` } : {};

    const res = await axios.get(
        `${API_URL}/api/applications?filters[job][documentId][$eq]=${jobDocId}`,
        { headers }
    );
    return res.data;
}
export async function updateUserDetails({
    documentId, firstName, lastName, resume, token,
}: {
    documentId: string,
    firstName: string,
    lastName: string,
    resume: string,
    token: string
}) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return await axios.put(`${API_URL}/api/user-details/${documentId}`,
        {
            data: { firstName, lastName, resume }
        }, {
        headers
    });
}
