/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <explanation> */
"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import JobCard from "./JobCard";
import type { CompanyOverviewPageProps } from "@/types/company";

export default function CompanyOverviewPage({
  id,
  companyLogoUrl,
  companyName,
  totalJobs,
  overviewContent,
  jobs,
  sidebarDetails,
}: CompanyOverviewPageProps) {
  const [activeTab, setActiveTab] = React.useState<"Overview" | "Jobs">(
    "Overview"
  );
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 font-sans">
      <div className="container max-w-7xl mx-auto">
        {/* Company Header Section */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg">
              {companyLogoUrl ? (
                <Image
                  alt={`${companyName} logo`}
                  className="h-full w-full object-cover border border-gray-200 rounded-lg"
                  height={64}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://placeholder.co/64x64/FF0000/FFFFFF.png?text=Logo";
                  }}
                  src={companyLogoUrl}
                  unoptimized
                  width={64}
                />
              ) : (
                <span className="text-lg font-bold uppercase border border-gray-100 rounded-lg h-16 w-16 flex items-center justify-center bg-purple-200">
                  {companyName.charAt(0)}
                </span>
              )}
            </div>
            <h1 className="font-bold text-2xl text-gray-900 leading-tight md:text-3xl">
              {companyName}
            </h1>
          </div>

          {/* Tabs for Overview / Jobs */}
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1 shadow-sm">
            <Button
              className={`rounded-md px-6 py-2 font-medium text-base transition-colors duration-200 ${activeTab === "Overview" ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700" : "text-gray-700 hover:bg-gray-200 "}`}
              onClick={() => setActiveTab("Overview")}
              variant={activeTab === "Overview" ? "default" : "ghost"}
            >
              Overview
            </Button>
            <Button
              className={`ml-1 rounded-md px-6 py-2 font-medium text-base transition-colors duration-200 ${activeTab === "Jobs" ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700" : "text-gray-700 hover:bg-gray-200 "}`}
              onClick={() => setActiveTab("Jobs")}
              variant={activeTab === "Jobs" ? "default" : "ghost"}
            >
              Jobs ({totalJobs})
            </Button>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content (overview or Jobs List) */}
          <div className="lg:col-span-2">
            {activeTab === "Overview" ? (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
                <h2 className="mb-4 font-semibold text-gray-900 text-xl">
                  About {companyName}
                </h2>
                {overviewContent.about.map((paragraph) => (
                  <p
                    className="mb-4 text-gray-700 leading-relaxed"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {jobs.length > 0 ? (
                  jobs.map((job) => <JobCard key={job.id} {...job} />)
                ) : (
                  <div className="rounded-xl bg-white p-6 text-center text-gray-600 shadow-md">
                    No jobs found for <strong>{companyName}</strong> at this
                    time.
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Sidebar Area */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            {/* company information card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                  {companyLogoUrl ? (
                    <Image
                      alt={`${companyName} logo`}
                      className="h-full w-full object-cover border border-gray-200 rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placeholder.co/64x64/FF0000/FFFFFF.png?text=Logo";
                      }}
                      height={64}
                      src={companyLogoUrl}
                      unoptimized
                      width={64}
                    />
                  ) : (
                    <span className="text-lg font-bold uppercase border border-gray-100 rounded-lg h-16 w-16 flex items-center justify-center bg-purple-200">
                      {companyName.charAt(0)}
                    </span>
                  )}
                </div>
                <p className="font-semibold text-gray-900 text-lg">
                  {companyName}
                </p>
              </div>
              {/** biome-ignore lint/nursery/noLeakedRender: <explanation> */}
              {sidebarDetails.companyWebsite && (
                <p className="mb-4 text-gray-600 text-sm">
                  <span className="font-medium">Website:</span>
                  <a
                    className="text-blue-600 hover:underline"
                    href={sidebarDetails.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sidebarDetails.companyWebsite}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
