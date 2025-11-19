import { useMutation } from "@tanstack/react-query";
import deleteSyncJob from "../actions/delete-sync-job";

export default function useDeleteSyncJob() {
  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const payload = await deleteSyncJob(id);
      if ("errors" in payload) {
        throw new Error("Error deleting sync job");
      }
      return payload;
    },
  });

  return {
    DeleteSyncJob: mutate,
    DeleteSyncJobAsync: mutateAsync,
    DeletePending: isPending,
    DeleteError: error,
  };
}

