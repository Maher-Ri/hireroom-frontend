"use client";
import JobCard from "@/components/JobCard";
import { JobSearch } from "@/components/JobSearch";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobs } from "@/hooks/useJobs";
import type { JobFilters } from "@/types/jobs";
import moment from "moment";
import { useState } from "react";

export default function Jobs() {
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    jobType: null,
    workplace: null,
    seniority: null,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useJobs(filters);
  const jobs = data?.pages?.flatMap((page) => page.data);
  return (
    <div className="mx-3">
      <JobSearch onChnageFilters={setFilters} />
      {/** biome-ignore lint/nursery/noLeakedRender: <explanation> */}
      {isLoading && (
        <>
          <Skeleton className="mx-auto w-full max-w-5xl mt-6 h-44 rounded-xl border border-gray-200 shadow-md " />
          <Skeleton className="mx-auto w-full max-w-5xl mt-6 h-44 rounded-xl border border-gray-200 shadow-md " />
        </>
      )}
      <div className="space-y-6 pb-6">
        {jobs?.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            documentId={job.documentId}
            timePosted={moment(job.createdAt).fromNow()}
            tags={[job.seniority]}
            companyLogoUrl={
              job.company.logo
                ? process.env.NEXT_PUBLIC_API_URL + job.company.logo.url
                : ""
            }
            companyName={job.company.companyName}
            jobTitle={job.jobTitle}
            salaryRange={job.salaryRange}
            isRemote={job.workplace === "Remote"}
            location={job.location}
            jobType={job.jobType}
          />
        ))}
      </div>
      {/* load more section */}

      {/** biome-ignore lint/nursery/noLeakedRender: <explanation> */}
      {hasNextPage && (
        <div className="flex justify-center pb-8">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-6 text-lg bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
