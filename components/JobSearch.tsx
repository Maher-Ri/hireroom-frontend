"use client";
import {
  Briefcase,
  Building2,
  ChevronDown,
  Crown,
  Search,
} from "lucide-react";
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

type JobType = "Full-Time" | "Contract" | "Part-Time" | null;
type WorkPlaceType = "On-Site" | "Hybrid" | "Remote" | null;
type SeniorityLevel =
  | "Entry-Level"
  | "Mid-Level"
  | "Senior"
  | "Manager"
  | "Director"
  | "Executive"
  | null;

export function JobSearch() {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [selectedJbType, setSelectedJbType] = useState<JobType>(null);
  const [selectedWorkPlace, setSelectedWorkPlace] =
    useState<WorkPlaceType>(null);
  const [selectedSeniority, setSelectedSeniority] =
    useState<SeniorityLevel>(null);

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };
  const handleSearch = () => {
    console.log(jobTitle);
    console.log(selectedJbType);
    console.log(selectedWorkPlace);
    console.log(selectedSeniority);
  };
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
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedJbType("Full-Time");
                  }}
                >
                  Full-time
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedJbType("Part-Time");
                  }}
                >
                  Part-time
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedJbType("Contract");
                  }}
                >
                  Contract
                </DropdownMenuItem>
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
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedWorkPlace("On-Site");
                  }}
                >
                  On-Site
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedWorkPlace("Remote");
                  }}
                >
                  Remote
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedWorkPlace("Hybrid");
                  }}
                >
                  Hybrid
                </DropdownMenuItem>
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
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedSeniority("Entry-Level");
                  }}
                >
                  Entry-Level
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedSeniority("Mid-Level");
                  }}
                >
                  Mid-Level
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedSeniority("Senior");
                  }}
                >
                  Senior
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedSeniority("Manager");
                  }}
                >
                  Manager
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedSeniority("Director");
                  }}
                >
                  Director
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedSeniority("Executive");
                  }}
                >
                  Executive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
