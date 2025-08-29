"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu02Icon } from "@hugeicons/core-free-icons";
import { FileUpload } from "@/components/file-upload";



export default function BrandPage() {
    const [currentStep, setCurrentStep] = useState(1);

    // Profile form state
    const [profileData, setProfileData] = useState({
        name: "",
        company: "",
        role: "",
        department: "",

    });

    // Brand cortex form state
    const [brandData, setBrandData] = useState({
        website: "swiirl.io",
        socialLinks: "linkedin.com/company/swiirl",
        brandGuidelines: null
    });

    const [socialLinksList, setSocialLinksList] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Profile information saved!");
            setCurrentStep(2);
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBrandSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Brand information submitted successfully!");
            // You can route to next page or show completion message here
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const goBackToProfile = () => {
        setCurrentStep(1);
    };

    const addSocialLink = () => {
        const link = brandData.socialLinks.trim();
        if (link) {
            // Validate domain
            const validDomains = ['x.com', 'linkedin.com', 'instagram.com'];
            const isValidDomain = validDomains.some(domain => link.includes(domain));

            if (isValidDomain) {
                setSocialLinksList([...socialLinksList, link]);
                setBrandData({ ...brandData, socialLinks: "" });
            } else {
                toast.error("Please enter a valid social media link from x.com, linkedin.com, or instagram.com");
            }
        }
    };

    const removeSocialLink = (index: number) => {
        setSocialLinksList(socialLinksList.filter((_, i) => i !== index));
    };

    const handleSocialLinkKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSocialLink();
        }
    };

    return (
        <div className="min-h-screen bg-white relative">
            {/* Header */}
            <header className="sticky top-0 bg-white md:left-6 left-2 px-4 py-4 flex justify-between items-center z-10 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-6">
                    <HugeiconsIcon icon={Menu02Icon} className="w-5 h-5" />
                    <Image src="/logo.svg" alt="Swiirl Pulse" width={60} height={60} />
                </Link>
            </header>

            {/* Main Content */}
            <div className="px-6 py-8 w-full md:w-1/3 md:mx-auto md:pt-20" >
                {/* Back Button and Title */}
                <div className="flex items-center gap-4 mb-2">

                    <h1 className="text-3xl font-bold text-gray-900">
                        {currentStep === 1 ? "Tell us about yourself" : "Brand Cortex"}
                    </h1>

                </div>

                {/* Step 1: Profile Form */}
                {currentStep === 1 && (
                    <>
                        <p className="text-gray-500 mb-8 max-w-2xl">
                            Let&apos;s start by setting up your profile information, help us personalize your experience
                        </p>

                        <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-2xl">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="border-gray-300 rounded-lg"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name
                                </label>
                                <Input
                                    id="company"
                                    type="text"
                                    value={profileData.company}
                                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                                    className="border-gray-300 rounded-lg"
                                    placeholder="Enter your company name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Role
                                </label>
                                <Input
                                    id="role"
                                    type="text"
                                    value={profileData.role}
                                    onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                                    className="border-gray-300 rounded-lg"
                                    placeholder="e.g., Marketing Manager, CEO"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                                    Department
                                </label>
                                <Input
                                    id="department"
                                    type="text"
                                    value={profileData.department}
                                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                                    className="border-gray-300 rounded-lg"
                                    placeholder="e.g., Marketing, Sales, Engineering"
                                    required
                                />
                            </div>


                            <Button
                                type="submit"
                                className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Continue to Brand Setup"}
                            </Button>
                        </form>
                    </>
                )}

                {/* Step 2: Brand Cortex Form */}
                {currentStep === 2 && (
                    <>
                        <p className="text-gray-600 mb-8 max-w-2xl">
                            We will extract your brand guidelines and public signals to build your brand identity, which you can review and adjust
                        </p>

                        <form onSubmit={handleBrandSubmit} className="space-y-6 max-w-2xl">
                            <div>
                                <label htmlFor="brandWebsite" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your website
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                        https://
                                    </div>
                                    <Input
                                        id="brandWebsite"
                                        type="text"
                                        value={brandData.website}
                                        onChange={(e) => setBrandData({ ...brandData, website: e.target.value })}
                                        className="pl-16 border-gray-300 rounded-lg"
                                        placeholder="Enter your website"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-700 mb-2">
                                    Social links
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm ">
                                            https://
                                        </div>
                                        <Input
                                            id="socialLinks"
                                            type="text"
                                            value={brandData.socialLinks}
                                            onChange={(e) => setBrandData({ ...brandData, socialLinks: e.target.value })}
                                            onKeyPress={handleSocialLinkKeyPress}
                                            className="pl-16 border-gray-300 rounded-lg"
                                            placeholder="linkedin.com/in/username"

                                        />

                                    </div>
                                    <Button
                                        type="button"
                                        onClick={addSocialLink}
                                        className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg"
                                    >
                                        Add
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Enter links from x.com, linkedin.com, or instagram.com
                                </p>

                                {/* Social Links Tags */}
                                {socialLinksList.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-sm text-gray-600 font-medium mb-2">Added social links:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {socialLinksList.map((link, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm"
                                                >
                                                    <span className="text-gray-700">{link}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSocialLink(index)}
                                                        className="text-gray-500 cursor-pointer hover:text-gray-700"
                                                        aria-label="Remove social link"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M18 6L6 18M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}


                            </div>

                            <FileUpload
                                label="Upload brand guidelines"
                                description="PDF, DOC, or image files"
                                acceptedFileTypes={[".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".gif"]}
                                maxFiles={5}
                                maxFileSize={10}
                                onFilesChange={(files) => {
                                    console.log("Files uploaded:", files);
                                    // Handle the uploaded files here
                                }}
                            />

                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={goBackToProfile}
                                    className="flex-1 py-3"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Processing..." : "Continue"}
                                </Button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
