"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload02Icon, Image02Icon, GoogleDocIcon, Pdf01Icon, File01Icon } from "@hugeicons/core-free-icons";

interface FileUploadProps {
    label?: string;
    description?: string;
    acceptedFileTypes?: string[];
    maxFiles?: number;
    maxFileSize?: number; // in MB
    onFilesChange?: (files: File[]) => void;
    className?: string;
}

interface FileWithPreview extends File {
    id: string;
    preview?: string;
}

export function FileUpload({
    label = "Upload files",
    description = "PDF, DOC, or image files",
    acceptedFileTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".gif"],
    maxFiles = 10,
    maxFileSize = 10, // 10MB default
    onFilesChange,
    className
}: FileUploadProps) {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (!selectedFiles) return;

        const fileArray = Array.from(selectedFiles);
        console.log('Processing files:', fileArray.map(f => ({ name: f.name, type: f.type, size: f.size })));

        const newFiles: FileWithPreview[] = fileArray.map(file => {
            // Create a new File object with the same properties
            const fileWithPreview = new File([file], file.name, {
                type: file.type,
                lastModified: file.lastModified
            }) as FileWithPreview;

            // Add our custom properties
            fileWithPreview.id = Math.random().toString(36).substr(2, 9);
            fileWithPreview.preview = undefined;

            return fileWithPreview;
        });

        const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    };

    const removeFile = (fileId: string) => {
        const updatedFiles = files.filter(file => file.id !== fileId);
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    };

    const getFileIcon = (file: File) => {
        if (!file.type) return <HugeiconsIcon icon={File01Icon} className="w-4 h-4" />;

        if (file.type.startsWith('image/')) {
            return <HugeiconsIcon icon={Image02Icon} className="w-4 h-4" />;
        }
        if (file.type.includes('pdf')) {
            return <HugeiconsIcon icon={Pdf01Icon} className="w-4 h-4" />;
        }
        if (file.type.includes('word') || file.type.includes('document')) {
            return <HugeiconsIcon icon={GoogleDocIcon} className="w-4 h-4" />;
        }
        return <HugeiconsIcon icon={File01Icon} className="w-4 h-4" />;
    };

   

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div
                className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
                    "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
                    "bg-gray-50"
                )}
                onClick={handleClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={acceptedFileTypes.join(',')}
                    onChange={handleFileUpload}
                    className="hidden"
                    aria-label={label}
                />

                <div className="flex flex-col items-center gap-3">
                    <div className="bg-white rounded-lg p-3 border border-gray-300 shadow">
                        <HugeiconsIcon icon={Upload02Icon} className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-slate-900 font-semibold text-sm">{label}</p>
                        <p className="text-gray-500 text-xs">{description}</p>
                        <p className="text-gray-400 text-xs mt-1">
                            Click to upload (max {maxFiles} files, {maxFileSize}MB each)
                        </p>
                    </div>
                </div>
            </div>

            {/* File Tags */}
            {files.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm text-gray-600 font-medium mb-2">
                        Uploaded files ({files.length}/{maxFiles}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {files.map((file) => {
                            console.log('Rendering file:', { name: file.name, type: file.type, size: file.size });
                            return (
                                <div
                                    key={file.id}
                                    className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm max-w-full"
                                >
                                    <div className="text-gray-600">
                                        {getFileIcon(file)}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-gray-700 font-medium truncate text-sm" title={file.name || 'Unknown file'}>
                                            {file.name || 'Unknown file'}
                                        </span>
                                       
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(file.id);
                                        }}
                                        className="text-gray-500 cursor-pointer hover:text-red-600 ml-2"
                                        aria-label="Remove file"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
