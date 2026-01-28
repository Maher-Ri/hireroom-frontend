/** biome-ignore-all lint/style/useFilenamingConvention: <explanation> */
"use client";
import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { Textarea } from "./ui/textarea";
import React from "react";

export default function AiAnalyzerDialog({
  open,
  setOpen,
  benefits,
  aboutRole,
  jobAttributes,
  jobTitle,
  waysToWork,
  whatWeDo,
}: any) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Job Qualification AI Analyser</DialogTitle>
            <DialogDescription>
              <b>Job Title:</b> {jobTitle}
            </DialogDescription>
          </DialogHeader>
          <AiAnalyzer
            benefits={benefits}
            aboutRole={aboutRole}
            jobAttributes={jobAttributes}
            jobTitle={jobTitle}
            waysToWork={waysToWork}
            whatWeDo={whatWeDo}
          />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Job Qualification AI Analyser</DrawerTitle>
            <DrawerDescription>
              <b>Job Title:</b> {jobTitle}
            </DrawerDescription>
          </DrawerHeader>
          <AiAnalyzer
            benefits={benefits}
            aboutRole={aboutRole}
            jobAttributes={jobAttributes}
            jobTitle={jobTitle}
            waysToWork={waysToWork}
            whatWeDo={whatWeDo}
          />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
export function AiAnalyzer({
  benefits,
  aboutRole,
  jobAttributes,
  jobTitle,
  waysToWork,
  whatWeDo,
}: any) {
  const [skills, setSkills] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [analysis, setAnalysis] = React.useState<string>("");
  return (
    <div className="h-fit max-h-[80vh] space-y-6 overflow-y-auto p-6">
      <div className="bg-white">
        <label
          className="mb-2 block font-medium text-gray-700 text-sm"
          htmlFor="skills"
        >
          Your Skills/Specialties
        </label>
        <Textarea
          className="w-full border-gray-300"
          id="skills"
          onChange={(e) => setSkills(e.target.value)}
          placeholder="List your skills, experience, etc..."
          rows={6}
          value={skills}
        />
      </div>
    </div>
  );
}
