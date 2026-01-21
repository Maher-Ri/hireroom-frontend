import { updateUserDetails } from "@/services/users-services";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUserDetails() {
    return useMutation({
        mutationKey: ['user-details'],
        mutationFn: async ({
            token,
            firstName,
            lastName,
            documentId,
            resume
        }: any) => {
            const response = await updateUserDetails({
                token,
                firstName,
                lastName,
                documentId,
                resume
            });
            return response.data;
        }
    });
}