import axios from 'axios';
import { API_URL } from '@/lib/api';

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