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
  Zap,
} from "lucide-react";
import Link from "next/link";

type JobDetailsPageProps = {
  companyLogoUrl: string;
  jobTitle: string;
  companyName: string;
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
};
export default function JobDetails({
  companyLogoUrl,
  jobTitle,
  companyName,
  jobAttributes,
  benefits,
  aboutRole,
  whatWeDo,
  waysToWork,
  sidebarDetails,
}: JobDetailsPageProps) {
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 font-sans">
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
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-bold text-2xl text-gray-900 leading-tight md:text-3xl bg-pink-500">
                  {companyName}
                </span>
              )}
            </div>
            <div className="grow flex flex-col gap-4 md:flex-row items-start md:items-center">
              <div className="grow mb-0">
                <h1 className="font-bold text-2xl text-gray-600">{jobTitle}</h1>
                <p className="text-base text-gray-600">{companyName}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  className="rounded-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                  variant="outline"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share job
                </Button>

                <Button className="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  Apply
                  <Zap className="ml-2 h-4 w-4" />
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
          <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
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
            <Button className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
              Apply <Zap className="ml-2 h-4 w-4" />
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
                  <span className="font-bold text-2xl text-white">T</span> // Placeholder for Transamerica
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
            <Link href="/companies/123">
            <Button className="w-full rounded-lg text-blue-600 px-4 py-2 border-blue-600 bg-white transition-all hover:bg-blue-50"  variant="outline">
              View Company
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
