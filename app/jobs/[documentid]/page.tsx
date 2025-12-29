import JobDetails from "@/components/JobDetails";

export default function JobDetailsPage() {
  const exampleJobDetails = {
    companyLogoUrl: "https://placehold.co/64x64/0047AB/FFFFFF.png?text=G",
    jobTitle: "Full Stack Developer",
    companyName: "GlobalTech Solutions",
    salaryRange: "90k - 120k USD/year",
    jobAttributes: {
      isRemote: true,
      jobType: "Full-time",
    },
    benefits: [
      "Health, Dental, and Vision Insurance",
      "401(k) with company match",
      "Generous Paid Time Off and Holidays",
      "Professional Development Stipend",
    ],
    aboutRole: [
      "Join our innovative development team to build scalable web applications and services using the latest technologies.",
      "We value creativity, code quality, and continuous learning. Ideal candidates are passionate about problem-solving and teamwork.",
    ],
    whatWeDo: [
      "Develop and maintain web applications with React and Node.js",
      "Implement RESTful APIs and database design",
      "Collaborate with designers, product managers, and other engineers",
      "Participate in code reviews and improve development processes",
    ],
    waysToWork: [
      "On-Site: work from our office in San Francisco",
      "Hybrid: Flexible remote and on-office schedule",
    ],
    sidebarDetails: {
      tag: "Mid-Level",
      workplace: "On-site",
      jobType: "Full-time",
      pay: "90k - 120k USD/Year",
      publishideDate: "Jul 20, 2025",
      companyWebsite: "google.com",
    },
  };

  return <JobDetails {...exampleJobDetails} />;
}
