"use client";

import { useState, useEffect } from "react";

interface BrandData {
  companyName: string;
  fileCount: number;
}

export function useBrandData() {
  // Initialize state with localStorage data if available
  const [brandData, setBrandData] = useState<BrandData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("brandData");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed;
        } catch (e) {
          console.warn("Failed to parse brand data from localStorage");
        }
      }
    }
    return { companyName: "", fileCount: 0 };
  });

  // No need to load from localStorage on mount since we do it in initial state

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("brandData", JSON.stringify(brandData));
  }, [brandData]);

  const setCompanyName = (name: string) => {
    setBrandData((prev) => ({ ...prev, companyName: name }));
  };

  const setFileCount = (count: number) => {
    setBrandData((prev) => ({ ...prev, fileCount: count }));
  };

  const reset = () => {
    setBrandData({ companyName: "", fileCount: 0 });
    localStorage.removeItem("brandData");
  };

  return {
    ...brandData,
    setCompanyName,
    setFileCount,
    reset,
  };
}
