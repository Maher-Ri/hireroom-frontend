"use client";

import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type JobCardProps = {
  id: number;
  documentId: string;
  timePosted: string;
  tags: string[];
  companyLogoUrl: string;
  companyName: string;
  jobTitle: string;
  salaryRange: string;
  isRemote: boolean;
  location: string;
  jobType: string;
};
export default function JobCard({
  documentId,
  timePosted,
  tags,
  companyLogoUrl,
  companyName,
  jobTitle,
  salaryRange,
  isRemote,
  jobType,
}: JobCardProps) {
  return (
    <Link
      href={`/jobs/${documentId}`}
      className="mx-auto w-full max-w-5xl p-6 cursor-pointer flex flex-col gap-4 rounded-xl border border-gray-300 bg-white shadow-sm transition ease-in-out hover:border-purple-400 hover:shadow-purple-300"
    >
      {/* header part */}
      <div className="flex items-start justify-between ">
        <div className="flex flex-row md:items-center gap-2">
          <span className="text-gray-500 text-sm font-medium">
            {timePosted}
          </span>
          <div className="flex items-center flex-wrap gap-2">
            {tags?.map((tag) => (
              <span
                className="rounded px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* middle part */}
      <div className="flex flex-col items-start md:flex-row md:items-center gap-4">
        <div className="flex shrink-0 items-center justify-center w-14 h-14 overflow-hidden rounded-lg">
          {companyLogoUrl ? (
            <Image
              height={56}
              width={56}
              className="h-full w-full object-cover border border-gray-200 rounded-lg"
              src={companyLogoUrl}
              alt={`${companyName} Logo`}
              unoptimized
              // onError={(e) => {
              //   const target = e.target as HTMLImageElement;
              //   target.src =
              //     "https://logo.com/image-cdn/images/kts928pd/production/59fdc229ba87cfc476782a1ed3dd2f24e72e13c0-731x731.png?w=1080&q=72&fm=webp";
              // }}
            />
          ) : (
            <span className="text-lg font-bold border border-gray-100 rounded-lg h-14 w-14 flex items-center justify-center bg-purple-200">{companyName?.charAt(0)}</span>
          )}
        </div>
        <div className="grow">
          <h3 className="text-lg font-semibold text-gray-900">{jobTitle}</h3>
          <p className="text-gray-500 text-sm">{companyName}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-lg font-bold text-gray-900">{salaryRange}</p>
        </div>
      </div>
      {/* bottom part */}
      <div className="flex flex-wrap items-center text-sm gap-x-6 gap-y-2 text-gray-600">
        {/** biome-ignore lint/nursery/noLeakedRender: <explanation> */}
        {isRemote && (
          <div className="flex gap-1 items-center">
            <MapPin className="w-4 h-4 text-green-600" />
            <span>Remote</span>
          </div>
        )}
        <div className="flex gap-1 items-center">
          <Clock className="w-4 h-4 text-gray-500" />
          <span>{jobType}</span>
        </div>
      </div>
    </Link>
  );
}
