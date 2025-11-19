/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAuthToken } from "@/lib/utils/auth.token";
import { revalidatePath } from "next/cache";

export default async function deleteSyncJob(id: number) {
  const token = await getAuthToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/sync-jobs/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete sync job");
  }

  const payload: APIResponse<any> = await response.json();
  revalidatePath("/");

  return payload;
}

