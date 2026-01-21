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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCreateApplication } from "@/hooks/queries/useApplication";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  interestReason: z
    .string()
    .min(1, { message: "This field is required." })
    .max(500, { message: "Maximum 500 characters." }),
  skills: z.string().min(1, { message: "This field is required." }),
  resume: z.any().nullable(),
});

export default function ApplicationDialog({ open, setOpen, jobDocId }: any) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for this job</DialogTitle>
            <DialogDescription>
              please fill out the form below to submit your application.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm jobDocId={jobDocId} />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Apply for this job</DrawerTitle>
            <DrawerDescription>
              please fill out the form below to submit your application.
            </DrawerDescription>
          </DrawerHeader>
          <ProfileForm jobDocId={jobDocId} />
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

function ProfileForm({ jobDocId }: any) {
  const { data: session }: any = useSession();
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);
  const [resumeId, setResumeId] = React.useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interestReason: "",
      skills: "",
      resume: null,
    },
  });
  async function handleFileUpload(file: File, jwt: string) {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("files", file);

      const uploadRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResumeId(uploadRes.data[0]?.id);
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  }
  const { mutate, isPending } = useCreateApplication();
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const resume = resumeId ? [resumeId] : session?.user?.resume?.id || null;
    mutate(
      {
        token: session?.jwt,
        interestReason: values.interestReason,
        skills: values.skills,
        job: jobDocId,
        // userId: "g282e53lzs0oxky0jrehlm55",
        resume,
      },
      {
        onSuccess: () => {
          toast.success("You have successfully applied for this job.");
          router.push("/jobs");
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 mt-4"
      >
        <FormField
          control={form.control}
          name="interestReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why are you interested for this role?</FormLabel>
              <FormControl>
                <Textarea placeholder="Maximum 500 characters." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What relevant skills/experience do you bring?
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Type your Skills here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resume Upload */}
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {session?.user?.resume ? (
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm">
                        Current Resume:{" "}
                        <a
                          className="text-purple-700 font-medium underline"
                          href={
                            process.env.NEXT_PUBLIC_API_URL +
                            session?.user?.resume?.url
                          }
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          View Resume
                        </a>
                      </p>
                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 border-dashed bg-gray-50 p-4 text-gray-500 text-sm hover:bg-gray-100">
                        {field.value?.[0]?.name ||
                          "Click to upload your resume"}
                        <input
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={async (e) => {
                            // biome-ignore lint/nursery/noLeakedRender: <explanation>
                            if (e.target.files && e.target.files.length > 0) {
                              field.onChange(e.target.files);
                              await handleFileUpload(e.target.files[0], "");
                            }
                          }}
                          type="file"
                        />
                      </label>
                      <p className="text-gray-500 text-xs">
                        You can replace your existing resume.
                      </p>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 border-dashed bg-gray-50 p-4 text-gray-500 text-sm hover:bg-gray-100">
                      {field.value?.[0]?.name || "Click to upload your resume"}
                      <input
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={async (e) => {
                          // biome-ignore lint/nursery/noLeakedRender: <explanation>
                          if (e.target.files && e.target.files.length > 0) {
                            field.onChange(e.target.files);
                            await handleFileUpload(e.target.files[0], "");
                          }
                        }}
                        type="file"
                      />
                    </label>
                  )}
                </div>
              </FormControl>
              {/** biome-ignore lint/nursery/noLeakedRender: <explanation> */}
              {uploading && (
                <p className="mt-1 text-gray-500 text-sm">Uploading...</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          className="w-full bg-blue-700 hover:bg-blue-600 transition duration-300"
          disabled={isPending || uploading}
          type="submit"
        >
          {isPending ? "Applying..." : "Apply Now"}
        </Button>
      </form>
    </Form>
  );
}
