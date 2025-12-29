import JobCard from "@/components/JobCard";
import { JobSearch } from "@/components/JobSearch";

export default function Jobs() {
  const exampleJob = {
    id: 1,
    timePosted: "2 days ago",
    tags: ["Full-time", "Remote", "Senior Level"],
    companyLogoUrl: "https://logo.com/image-cdn/images/kts928pd/production/59fdc229ba87cfc476782a1ed3dd2f24e72e13c0-731x731.png?w=1080&q=72&fm=webp",
    companyName: "TechCorp",
    jobTitle: "Senior Software Engineer",
    salaryRange: "1k - 1.5k USD/Month",
    isRemote: true,
    jobType: "Full-time",
  };
  return <div>
    <JobSearch/>
    <JobCard {...exampleJob}/>
    <JobCard {...exampleJob}/>
    <JobCard {...exampleJob}/>
  </div>;
}
