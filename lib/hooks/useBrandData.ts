"use client";

import { useState, useEffect } from "react";

interface BrandData {
  companyName: string;
  fileCount: number;
}

export function useBrandData() {
  const [brandData, setBrandData] = useState<BrandData>({
    companyName: "",
    fileCount: 0,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("brandData");
    if (saved) {
      try {
        setBrandData(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to parse brand data from localStorage");
      }
    }
  }, []);

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
