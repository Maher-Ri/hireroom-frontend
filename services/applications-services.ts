import axios from 'axios';
import { API_URL } from '@/lib/api';

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
export async function fetchJobsApplied({
    page,
    pageSize,
    token,
    applicationStatus
}: {
    page: number;
    pageSize: number;
    token: string,
    applicationStatus: string,
}) {
    const query = new URLSearchParams();
    // ✅ populate only the `url` field from job.company.logo
    query.append(
        'populate[job][populate][company][populate][logo][fields][0]',
        'url'
    );
    //pagination
    query.append('pagination[page]', String(page));
    query.append('pagination[pageSize]', String(pageSize));
    // filters
    //   query.append('filters[user][id][$eq]', String(userId));
    query.append('filters[applicationStatus][$eq]', applicationStatus);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    // This will now work perfectly with a 200 OK
    const res = await axios.get(`${API_URL}/api/applications?${query.toString()}`, { headers });
    return res.data;
}