"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { DeleteDialog } from "@/components/common/delete -dialog";
import { HiMiniTrash } from "react-icons/hi2";
import useDeleteSyncJob from "../_hooks/use-delete-sync-job";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "failed":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "synced":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export default function DashTable({
  syncJobs,
  showDeleteAction = false,
}: {
  syncJobs: homeStates["jobs"];
  showDeleteAction?: boolean;
}) {
  const t = useTranslations("dashboard");
  const { DeleteSyncJobAsync } = useDeleteSyncJob();

  return (
    <Card className="bg-background max-w-screen-2xl mx-auto rounded-2xl py-6 ">
      <div className="mb-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-7">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-homenaje rtl:font-almarai text-foreground">
              {t("recentSyncJobs")}
            </h2>
            <Badge
              variant="secondary"
              className="bg-[#535862] font-homenaje rtl:font-almarai text-white hover:bg-[#535862]"
            >
              {syncJobs.length}
            </Badge>
          </div>
        </div>

        {/* Table */}
        <div className="border">
          <Table className="px-5">
            <TableHeader>
              <TableRow className="px-7">
                <TableHead className="text-start font-homenaje rtl:font-almarai text-lg   text-gray-400 lg:w-[25%]">
                  {t("employee")}
                </TableHead>
                <TableHead className="text-center font-homenaje rtl:font-almarai text-lg   text-gray-400 lg:w-[15%]">
                  {t("orderCode")}
                </TableHead>
                <TableHead className="text-center font-homenaje rtl:font-almarai text-lg   text-gray-400 lg:w-[15%]">
                  {t("status")}
                </TableHead>
                <TableHead className="text-center font-homenaje rtl:font-almarai text-lg   text-gray-400 lg:w-[15%]">
                  {t("photos")}
                </TableHead>
                <TableHead className="text-center font-homenaje rtl:font-almarai text-lg   text-gray-400 lg:w-[15%]">
                  {t("amount")}
                </TableHead>
                <TableHead className="text-center font-homenaje rtl:font-almarai text-lg   text-gray-400 lg:w-[15%]">
                  {t("shift")}
                </TableHead>
                {showDeleteAction && (
                  <TableHead className="text-center w-[200px]"></TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {syncJobs.length > 0 ? (
                syncJobs.map((job, index) => (
                  <TableRow
                    key={job.id}
                    className={`px-7 h-[70px] ${
                      index % 2 === 0 ? "bg-[#E9EAEB]" : "bg-white"
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src="/assets/avatar.png"
                            alt={job.employeeName}
                          />
                          <AvatarFallback>
                            {job.employeeName.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium font-homenaje rtl:font-almarai text-lg">
                            {job.employeeName}
                          </span>
                          <span className="text-sm text-gray-500">
                            {job.orderphone}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-homenaje rtl:font-almarai text-lg font-medium text-muted-foreground">
                      {job.orderprefixcode}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`font-homenaje rtl:font-almarai font-normal text-sm ${getStatusColor(
                          job.status
                        )}`}
                      >
                        {job.status.charAt(0).toUpperCase() +
                          job.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-homenaje rtl:font-almarai text-lg font-medium text-muted-foreground">
                      {job.number_of_photos}
                    </TableCell>
                    <TableCell className="text-center font-homenaje rtl:font-almarai text-lg font-medium text-muted-foreground">
                      {job.pay_amount.toFixed(2)} L.E
                    </TableCell>
                    <TableCell className="text-center font-homenaje rtl:font-almarai text-lg font-medium text-muted-foreground">
                      {job.shift_name}
                    </TableCell>
                    {showDeleteAction && (
                      <TableCell className="text-center">
                        <DeleteDialog
                          action={() => DeleteSyncJobAsync({ id: job.id })}
                          description="Are you sure you want to delete this sync job? This action cannot be undone."
                          title="Delete Sync Job"
                          successMessage="Sync job deleted successfully!"
                          errorMessage="Failed to delete sync job. Please try again."
                        >
                          <button className="">
                            <HiMiniTrash className="text-black text-2xl" />
                          </button>
                        </DeleteDialog>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={showDeleteAction ? 7 : 6}
                    className="text-center py-8"
                  >
                    <p className="text-muted-foreground">
                      {t("noSyncJobsFound")}
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
