"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { IoMdHome } from "react-icons/io";
import { useTranslations } from "next-intl";
import CardSection from "./card-sectoin";
import DashTable from "./dash-table";
import { useLastSync } from "../_hooks/use-branshes";
import { Clock } from "lucide-react";
import BranchesLastSyncTable from "./branches-last-sync-table";
import type { BranchLastSync } from "@/lib/api/branches.api";

export default function DashBoard({
  homeStates,
  branchesLastSync,
}: {
  homeStates: homeStates;
  branchesLastSync: BranchLastSync[];
}) {
  const t = useTranslations();
  const { data: lastSync, isLoading: lastSyncLoading } = useLastSync();

  return (
    <div className=" space-y-8 px-6 xl:px-10 py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2 font-homenaje rtl:font-almarai text-sm text-gray-400">
              <IoMdHome size={28} color="black" className="-mt-2" />
              {t("navigation.dashboard")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-10 space-y-8">
        <div className="w-full bg-white rounded-xl border p-4 flex items-center gap-3">
          <Clock className="text-slate-600" />
          <div className="text-sm">
            <span className="text-gray-600">{t("dashboard.lastSync")}:</span>
            <span className="ml-2 font-medium text-gray-900">
              {lastSyncLoading
                ? "..."
                : lastSync?.synced_at
                ? new Date(lastSync.synced_at).toLocaleString()
                : t("dashboard.noData")}
            </span>
          </div>
        </div>
        <CardSection syncJobsStats={homeStates} />
        {/* <ChartsSectoin syncJobsStats={homeStates} /> */}
        <BranchesLastSyncTable rows={branchesLastSync} />
        <DashTable syncJobs={homeStates.jobs} showDeleteAction={true} />
      </div>
    </div>
  );
}
