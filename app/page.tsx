"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("molly@bank.com");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission with 2 second delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Form submitted with email:", email);
      toast.success("Thank you for signing up!");

      // Route to brand page after successful submission
      router.push("/brand");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Back Button */}
      <Button
        variant="outline"
        className="absolute top-6 left-6 shadow-sm hover:shadow-md transition-shadow duration-200"
        size="sm"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="rotate-180"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        Back
      </Button>

      <form onSubmit={handleSubmit} className="text-left md:w-1/3 w-full px-9">
        <Image src="/logo.svg" alt="Swiirl Pulse" width={75} height={75} priority />
        <h1 className="text-3xl font-semibold text-gray-900 mt-16 md:mt-12 ">
          Welcome to Swiirl
        </h1>
        <p className="text-base text-gray-500 mtt-2">
          To get started, please sign up
        </p>
        <div className="mt-10">
          <label htmlFor="email" className="text-gray-500 text-sm font-medium text-prim">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            id="email"
            className="border-[1.5px] mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          className="mt-4 w-full h-10 bg-slate-900 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing up...</span>
            </div>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </div>
  )
}
