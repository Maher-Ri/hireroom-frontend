import { createApplication, fetchApplicationStatus, fetchJobsApplied } from "@/services/applications-services";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export function useCreateApplication() {
    return useMutation({
        mutationKey: ['application'],
        mutationFn: async ({
            token,
            interestReason,
            skills,
            job,
            // userId,
            resume
        }: any) => {
            const response = await createApplication({
                token,
                interestReason,
                skills,
                job,
                // user: userId,
                resume
            });
            return response.data;
        }
    });
}
export function useApplicationStatus(jobDocId: string, session: any) {
    return useQuery({
        queryKey: ['application', jobDocId, session],
        queryFn: () => fetchApplicationStatus(jobDocId, session),
        staleTime: 0, // disable caching
    });
}
export function useJobsApplied(
    token: string,
    // userId: number,
    applicationStatus: string
) {
    return useInfiniteQuery({
            queryKey: ['jobs-applied', token, applicationStatus],
        queryFn: ({ pageParam = 1 }) => fetchJobsApplied({
            page: pageParam,
            pageSize: 2,
            token,
            // userId,
            applicationStatus
        }),
        getNextPageParam: (lastPage) => {
            const { page, pageCount } = lastPage.meta.pagination;
            if (page < pageCount) {
                return page + 1;
            }
            return;
        },
        initialPageParam: 1,
    });
};
