"use client";
import { Briefcase, Building2, ChevronDown, Crown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import type { JobFilters } from "@/types/jobs";

// type JobType = "Full-time" | "Contract" | "Part-time" | null;
// type WorkPlaceType = "On-site" | "Hybrid" | "Remote" | null;
// type SeniorityLevel =
//   | "Entry-Level"
//   | "Mid-Level"
//   | "Senior"
//   | "Manager"
//   | "Director"
//   | "Executive"
//   | null;

type JobSearchProps = {
  onChnageFilters: (filters: JobFilters) => void;
};

export function JobSearch({ onChnageFilters }: JobSearchProps) {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [selectedJbType, setSelectedJbType] =
    useState<JobFilters["jobType"]>(null);
  const [selectedWorkPlace, setSelectedWorkPlace] =
    useState<JobFilters["workplace"]>(null);
  const [selectedSeniority, setSelectedSeniority] =
    useState<JobFilters["seniority"]>(null);

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };
  const updateFilters = (newFilters?: Partial<JobFilters>) => {
    const filters: JobFilters = {
      search: newFilters?.search ?? jobTitle,
      jobType: newFilters?.jobType ?? selectedJbType,
      workplace: newFilters?.workplace ?? selectedWorkPlace,
      seniority: newFilters?.seniority ?? selectedSeniority,
    };
    onChnageFilters(filters);
  };

  const clearAllFilters = () => {
    setJobTitle("");
    setSelectedJbType(null);
    setSelectedWorkPlace(null);
    setSelectedSeniority(null);
    onChnageFilters({
      search: "",
      jobType: null,
      workplace: null,
      seniority: null,
    });
  };
  const handleSearch = () => {
    updateFilters({ search: jobTitle });
  };
  // Active filters for displaying pills
  const activeFilters = [
    jobTitle ? { label: `Title: ${jobTitle}`, key: 'search' } : null,
    selectedJbType
      ? { label: `Type: ${selectedJbType}`, key: 'jobType' }
      : null,
    selectedWorkPlace
      ? { label: `Workplace: ${selectedWorkPlace}`, key: 'workplace' }
      : null,
    selectedSeniority
      ? { label: `Seniority: ${selectedSeniority}`, key: 'seniority' }
      : null,
  ].filter(Boolean) as { label: string; key: keyof JobFilters }[];

  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-full max-w-5xl rounded-2xl border border-gray-200 p-2 bg-white shadow-sm transition-all duration-200 ease-in-out hover:border-purple-400 hover:shadow-purple-300">
        <div className="rounded-xl bg-[#faf8fc] p-6 md:p-8">
          {/* Main Search Bar */}
          <div className="flex items-center space-x-2 rounded-full bg-white border-gray-200 mb-6 p-1 shadow-sm transition-all duration-200 ease-in-out focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
            <Input
              className="shadow-none grow text-lg rounded-full ring-0 border-none px-4 py-3 focus-visible:ring-0 focus-within:ring-offset-0  "
              placeholder="Serach by Job Title"
              type="text"
              onChange={handleJobTitleChange}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              value={jobTitle}
            />
            <Button
              aria-label="Search"
              onClick={handleSearch}
              className="bg-purple-600 rounded-full p-3 text-white transition-color duration-200 hover:bg-purple-800 shrink-0"
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {/* jobType */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white border border-gray-200 text-gray-700 text-sm font-semibold flex items-center gap-2 rounded-full transition-all duration-200 ease-in-out hover:bg-purple-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Briefcase className="w-4 h-4" />
                  {selectedJbType || "Job type"}
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-white border rounded shadow-md p-2">
                <DropdownMenuLabel>Job Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Full-time", "Contract", "Part-time"].map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => {
                      setSelectedJbType(type);
                      updateFilters({ jobType: type });
                    }}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* workspace */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white border border-gray-200 text-gray-700 text-sm font-semibold flex items-center gap-2 rounded-full transition-all duration-200 ease-in-out hover:bg-purple-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Building2 className="w-4 h-4" />
                  {selectedWorkPlace || "workplace"}
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-white border rounded shadow-md p-2">
                <DropdownMenuLabel>workplace</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["On-site", "Hybrid", "Remote"].map((place) => (
                  <DropdownMenuItem
                    key={place}
                    onClick={() => {
                      setSelectedWorkPlace(place);
                      updateFilters({ workplace: place });
                    }}
                  >
                    {place}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* seniority */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white border border-gray-200 text-gray-700 text-sm font-semibold flex items-center gap-2 rounded-full transition-all duration-200 ease-in-out hover:bg-purple-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Crown className="w-4 h-4" />
                  {selectedSeniority || "Seniority"}
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-white border rounded shadow-md p-2">
                <DropdownMenuLabel>Seniority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  "Entry-Level",
                  "Mid-Level",
                  "Senior",
                  "Manager",
                  "Director",
                  "Executive",
                ].map((lvl) => (
                  <DropdownMenuItem
                    key={lvl}
                    onClick={() => {
                      setSelectedSeniority(lvl);
                      updateFilters({ seniority: lvl });
                    }}
                  >
                    {lvl}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Reaset all filters */}
            {/** biome-ignore lint/nursery/noLeakedRender: <explanation> */}
            {(jobTitle ||
              selectedJbType ||
              selectedWorkPlace ||
              selectedSeniority) && (
              <Button
                variant="outline"
                className="bg-purple-600 rounded-full p-3 text-white transition-color duration-200 hover:bg-purple-800 hover:text-white"
                onClick={clearAllFilters}
              >
                Reset
              </Button>
            )}
          </div>
           {/* Active Filters Pills */}
          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilters.map((f) => (
                <span
                  className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-sm"
                  key={f.key}
                >
                  {f.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
