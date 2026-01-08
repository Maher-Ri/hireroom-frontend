"use client";

// biome-ignore assist/source/organizeImports: <explanation>
import { useCompany } from "@/hooks/useCompany";
import CompanyOverviewPage from "@/components/companyOverviewPage";
import { useParams } from "next/navigation";
import moment from "moment";
import type { Company, CompanyOverviewPageProps } from "@/types/company";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyPage() {
  const { documentId } = useParams();
  const { data, isLoading, error } = useCompany(documentId as string);
  const company = data?.data as Company;

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
    return <p className="mx-auto max-w-7xl px-4 py-8">Error loading Company.</p>;
  }

  const companyData = {
    id: company?.id,
    documentId: company?.documentId,
    companyLogoUrl: company?.logo
      ? process.env.NEXT_PUBLIC_API_URL + company.logo.url
      : "",
    companyName: company?.companyName,
    totalJobs: company?.jobs?.length,
    overviewContent: {
      about: company?.about?.map((item: { text: string }) => item.text) || [],
    },
    jobs: company?.jobs?.map((job) => ({
      id: job.id,
      documentId: job.documentId,
      timePosted: moment(job.createdAt).fromNow(),
      tags: [`${job.seniority}`],
      companyLogoUrl: company?.logo
        ? process.env.NEXT_PUBLIC_API_URL + company.logo.url
        : "",
      jobTitle: job.jobTitle,
      companyName: company?.companyName,
      salaryRange: job.salaryRange,
      isRemote: job?.workplace === "Remote",
      location: job?.workplace,
      jobType: job.jobType,
    })),
    sidebarDetails: {
      companyWebsite: company?.companyWebsite,
    },
  } as CompanyOverviewPageProps;

  console.log("companyData:", company);
  console.log(documentId);
  return <CompanyOverviewPage {...companyData} />;
}
