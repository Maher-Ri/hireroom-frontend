"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  Briefcase,
  CalendarDays,
  Clock,
  DollarSign,
  MapPin,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import React from "react";
// import App from "next/app";
import ApplicationDialog from "./ApplicationDialog";
import { cn } from "@/lib/utils";
import AiAnalyzerDialog from "./AiAnalyzerDialog";

type JobDetailsPageProps = {
  documentId: string;
  companyLogoUrl: string;
  jobTitle: string;
  companyName: string;
  companyDocumentId: string;
  salaryRange: string;
  jobAttributes: {
    isRemote: boolean;
    jobType: string;
  };
  benefits: string[];
  aboutRole: string[];
  whatWeDo: string[];
  waysToWork: string[];
  sidebarDetails: {
    tag: string;
    workplace: string;
    jobType: string;
    pay: string;
    publishideDate: string;
    companyWebsite: string;
  };
  jobApplication?: any;
};
export default function JobDetails({
  documentId,
  companyLogoUrl,
  jobTitle,
  companyName,
  companyDocumentId,
  jobAttributes,
  benefits,
  aboutRole,
  whatWeDo,
  waysToWork,
  sidebarDetails,
  jobApplication,
}: JobDetailsPageProps) {
  const jobUrl = `${window.location.origin}/jobs/${documentId}`;
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openAnalyzerDialog, setOpenAnalyzerDialog] =
    React.useState<boolean>(false);

  const handleShare = async () => {
    if (navigator.share) {
      // Mobile / supported browsers
      try {
        await navigator.share({
          title: jobTitle,
          url: jobUrl,
        });
        toast.success("Job shared successfully!");
      } catch {
        toast.error("Failed to share job.");
      }
    } else {
      // Desktop fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(jobUrl);
        toast.success("Job link copied to clipboard!");
      } catch {
        toast.error("Failed to copy job link.");
      }
    }
  };
  // console.log("Job Application in JobDetails:", jobApplication);
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 font-sans">
      <ApplicationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        jobDocId={documentId}
      />
      <AiAnalyzerDialog
        open={openAnalyzerDialog}
        setOpen={setOpenAnalyzerDialog}
        benefits={benefits}
        aboutRole={aboutRole}
        jobAttributes={jobAttributes}
        jobTitle={jobTitle}
        waysToWork={waysToWork}
        whatWeDo={whatWeDo}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 mx-auto container max-w-7xl gap-8">
        {/* MAIN CONTENT AREA */}
        <div className="rounded-xl border border-gray-200 p-6 bg-white shadow-md lg:col-span-2 md:p-8">
          <div className="mb-6 flex items-start md:items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg">
              {companyLogoUrl ? (
                <Image
                  src={companyLogoUrl}
                  alt={`${companyName} logo`}
                  height={64}
                  width={64}
                  unoptimized
                  className="w-full h-full object-cover  border border-gray-200 rounded-lg"
                />
              ) : (
                <span className="text-lg font-bold border border-gray-100 rounded-lg h-16 w-16 flex items-center justify-center bg-purple-200">
                  {companyName.charAt(0)}
                </span>
              )}
            </div>
            <div className="grow flex flex-col gap-4 md:flex-row items-start md:items-center">
              <div className="grow mb-0">
                <h1 className="font-bold text-2xl text-gray-600">{jobTitle}</h1>
                <p className="text-base text-gray-600">{companyName}</p>
              </div>
              <div className="flex shrink-0 flex-wrap  items-center gap-2">
                <Button
                  className="rounded-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={handleShare}
                  variant="outline"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share job
                </Button>

                <Button
                  // className="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  className={cn(
                    "rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700",
                    jobApplication?.applicationStatus === "Accepted" &&
                      "bg-green-600 hover:bg-green-700",
                    jobApplication?.applicationStatus === "Rejected" &&
                      "bg-red-600 hover:bg-red-700",
                  )}
                  disabled={jobApplication}
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                >
                  {jobApplication
                    ? `Already applied (${jobApplication?.applicationStatus})`
                    : "Apply"}{" "}
                  <Zap className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  className="rounded-full px-4 py-2 text-gray-300 bg-gray-800 hover:text-gray-100 hover:bg-gray-900"
                  onClick={() => setOpenAnalyzerDialog(true)}
                  variant="outline"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI Analyzer
                </Button>
              </div>
            </div>
          </div>
          {/* Job Attributes (below header) */}
          <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600 text-sm">
            {jobAttributes.isRemote ? (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-green-500" />
                <span>Remote</span>
              </div>
            ) : null}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{jobAttributes.jobType}</span>
            </div>
          </div>

          {/* Benefits/Requirements */}
          <h2 className="mb-3 text-gray-900 text-xl font-semibold">
            Benefits:
          </h2>
          {benefits.map((benefit) => (
            <p className="mb-4 text-gray-700 leading-relaxed" key={benefit}>
              {benefit}
            </p>
          ))}
          {/* About the role */}
          <h2 className="mb-3 text-gray-900 text-xl font-semibold">
            About the Role:
          </h2>
          {aboutRole.map((p) => (
            <p className="mb-4 text-gray-700 leading-relaxed" key={p}>
              {p}
            </p>
          ))}
          {/* WHAT WE DO */}
          <h2 className="mb-3 text-gray-900 text-xl font-semibold">
            What We Do:
          </h2>
          <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
            {whatWeDo.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          {/* Ways to work with us */}
          <h2 className="mb-3 text-gray-900 text-xl font-semibold">
            Ways to work with Us:
          </h2>
          <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
            {waysToWork.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        {/* SIDE BAR AREA */}
        <div className="flex flex-col lg:col-span-1 gap-8">
          <div className="rounded-xl border border-gray-200 p-6 bg-white shadow-md">
            {/* Job Summary Card */}
            <h3 className="mb-4 font-bold text-gray-900 text-lg">{jobTitle}</h3>

            {/** biome-ignore lint/nursery/noLeakedRender: <explanation> */}
            {sidebarDetails.tag && (
              <span className="mb-4 inline-block rounded-full px-2.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold">
                {sidebarDetails.tag}
              </span>
            )}

            <ul className="mt-4 space-y-3 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 shrink-0 text-gray-500" />
                <span className="font-medium">Workplace:</span>{" "}
                {sidebarDetails.workplace}
              </li>

              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-gray-500" />
                <span className="font-medium">Job type:</span>{" "}
                {sidebarDetails.jobType}
              </li>
              <li className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 shrink-0 text-gray-500" />
                <span className="font-medium">Pay:</span> {sidebarDetails.pay}
              </li>

              <li className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 shrink-0 text-gray-500" />
                <span className="font-medium">Published on</span>{" "}
                {sidebarDetails.publishideDate}
              </li>
            </ul>
            <Button
              className={cn(
                "mt-6 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700",
                jobApplication?.applicationStatus === "Accepted" &&
                  "bg-green-600 hover:bg-green-700",
                jobApplication?.applicationStatus === "Rejected" &&
                  "bg-red-600 hover:bg-red-700",
              )}
              disabled={jobApplication}
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              {jobApplication
                ? `Already applied (${jobApplication?.applicationStatus})`
                : "Apply"}{" "}
              <Zap className="ml-2 h-4 w-4" />
            </Button>
          </div>
          {/* Company Information Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                {companyLogoUrl ? (
                  <Image
                    alt={`${companyName} logo`}
                    className="h-full w-full object-cover"
                    height={64}
                    src={companyLogoUrl}
                    width={64}
                    unoptimized
                  />
                ) : (
                  <span className="text-lg font-bold border border-gray-100 rounded-lg h-16 w-16 flex items-center justify-center bg-purple-200">
                    {companyName.charAt(0)}
                  </span>
                )}
              </div>
              <p className="font-semibold text-lg text-gray-900">
                {companyName}
              </p>
            </div>
            {/* * biome-ignore lint/nursery/noLeakedRender: <explanation> */}
            {sidebarDetails.companyWebsite && (
              <p className="mb-4 text-gray-600 text-sm">
                <span className="font-medium">Website:</span>{" "}
                <a
                  className="text-blue-600 hover:underline"
                  href={`http://${sidebarDetails.companyWebsite}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {sidebarDetails.companyWebsite}
                </a>
              </p>
            )}
            <Link href={`/companies/${companyDocumentId}`}>
              <Button
                className="w-full rounded-lg text-blue-600 px-4 py-2 border-blue-600 bg-white transition-all hover:bg-blue-50"
                variant="outline"
              >
                View Company
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
