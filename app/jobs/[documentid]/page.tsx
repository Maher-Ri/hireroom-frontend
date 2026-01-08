"use client";

import JobDetails from "@/components/JobDetails";
import { useJob } from "@/hooks/useJobs";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import type { Job } from "@/types/jobs";

export default function JobDetailsPage() {
  const { documentId } = useParams();
  const { data, error, isLoading } = useJob(documentId as string);
  const job = data?.data as Job;
 
  const jobDetailsData = {
    documentId: job?.documentId,
    companyLogoUrl: job?.company?.logo
      ? process.env.NEXT_PUBLIC_API_URL + job.company.logo.url
      : "",
    jobTitle: job?.jobTitle,
    companyName: job?.company.companyName,
    companyDocumentId: job?.company.documentId,
    salaryRange: job?.salaryRange,
    jobAttributes: {
      isRemote: job?.workplace === "Remote",
      jobType: job?.jobType,
    },
    benefits:
      job?.benefits?.map((benefit: { text: string }) => benefit.text) || [],
    aboutRole: job?.benefits?.map((item: { text: string }) => item.text) || [],
    whatWeDo: job?.benefits?.map((item: { text: string }) => item.text) || [],
    waysToWork: job?.benefits?.map((item: { text: string }) => item.text) || [],
    sidebarDetails: {
      tag: job?.seniority,
      workplace: job?.workplace,
      jobType: job?.jobType,
      pay: job?.salaryRange,
      publishideDate: moment(job?.createdAt).format("MMM Do, YYYY"),
      companyWebsite: job?.company?.companyWebsite,
    },
  };

  if (isLoading) {
    return (
      <div className="container mx-auto grid h-[80vh] max-w-7xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <Skeleton className="mx-auto h-full w-full rounded-xl border border-gray-200 p-6 shadow-md md:p-8 lg:col-span-2" />

        {/* Sidebar Area */}
        <div className="flex flex-col gap-8 lg:col-span-1">
          <Skeleton className="mx-auto h-full w-full rounded-xl border border-gray-200 shadow-md" />

          <Skeleton className="mx-auto h-full w-full rounded-xl border border-gray-200 shadow-md" />
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error loading job details.</div>;
  }
  return <JobDetails {...jobDetailsData} />;
}
