import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchJobs,fetchJobsByDocId } from "@/services/jobs-services";
import type { JobFilters } from "../../types/jobs";

export function useJobs(filters: JobFilters) {

    return useInfiniteQuery({
        queryKey: ['jobs', filters],
        queryFn: ({ pageParam = 1 }) => fetchJobs({ page: pageParam, pageSize: 2, filters }),
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

export function useJob(documentId: string) {

    return useQuery({
        queryKey: ['job', documentId],
        queryFn: () => fetchJobsByDocId(documentId),
        enabled: !!documentId,
    });
}