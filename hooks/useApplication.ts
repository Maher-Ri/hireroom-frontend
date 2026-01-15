import { createApplication, fetchApplicationStatus } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateApplication() {
    return useMutation({
        mutationKey: ['application'],
        mutationFn: async ({
            token,
            interestReason,
            skills,
            job,
            userId,
            resume
        }: any) => {
            const response = await createApplication({
                token,
                interestReason,
                skills,
                job,
                user: userId,
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