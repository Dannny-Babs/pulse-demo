"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu02Icon } from "@hugeicons/core-free-icons"
import { motion, AnimatePresence } from "framer-motion"
import { useBrandData } from "@/lib/hooks/useBrandData"

interface CommunityGroup {
    id: string
    name: string
    location: string
    memberCount: number
    focus: string[]
    description: string
    matchScore: number
    status: "available" | "in-progress" | "completed"
}

export default function CommunitiesPage() {
    const router = useRouter()
    const { companyName } = useBrandData()
    const [selectedFilter, setSelectedFilter] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState("")

    const communityGroups: CommunityGroup[] = [
        {
            id: "1",
            name: "Atlanta Financial Empowerment Circle",
            location: "Atlanta, GA",
            memberCount: 47,
            focus: ["Credit Building", "Home Savings", "Budgeting"],
            description: "A supportive community focused on building financial literacy and achieving homeownership goals.",
            matchScore: 98,
            status: "available"
        },
        {
            id: "2",
            name: "Phoenix Money Mindset Group",
            location: "Phoenix, AZ",
            memberCount: 32,
            focus: ["Credit Building", "Budgeting", "Debt Management"],
            description: "Empowering individuals to develop healthy money habits and break free from debt cycles.",
            matchScore: 95,
            status: "available"
        },
        {
            id: "3",
            name: "San Antonio Financial Futures",
            location: "San Antonio, TX",
            memberCount: 28,
            focus: ["Home Savings", "Credit Building", "Side Hustles"],
            description: "Building wealth through community support, education, and strategic financial planning.",
            matchScore: 92,
            status: "available"
        },
        {
            id: "4",
            name: "Miami Wealth Builders",
            location: "Miami, FL",
            memberCount: 41,
            focus: ["Credit Building", "Investment", "Budgeting"],
            description: "Creating generational wealth through smart financial decisions and community collaboration.",
            matchScore: 89,
            status: "in-progress"
        },
        {
            id: "5",
            name: "National Financial Wellness Network",
            location: "Online",
            memberCount: 156,
            focus: ["Credit Building", "Home Savings", "Budgeting", "Debt Management"],
            description: "A nationwide community supporting financial education and empowerment across all backgrounds.",
            matchScore: 87,
            status: "available"
        }
    ]

    const filteredGroups = communityGroups.filter(group => {
        const matchesFilter = selectedFilter === "all" || group.status === selectedFilter
        const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.focus.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesFilter && matchesSearch
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "available": return "bg-green-100 text-green-800 border-green-200"
            case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200"
            case "completed": return "bg-gray-100 text-gray-800 border-gray-200"
            default: return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "available": return "Available"
            case "in-progress": return "In Progress"
            case "completed": return "Completed"
            default: return "Unknown"
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="sticky top-0 bg-white md:left-6 left-2 px-4 py-4 flex justify-between items-center z-10 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-6">
                    <HugeiconsIcon icon={Menu02Icon} className="w-5 h-5" />
                    <Image src="/logo.svg" alt="Swiirl Pulse" width={60} height={60} />
                </Link>
            </header>

            {/* Main Content */}
            <div className="flex-1 px-4 pt-6 pb-16 max-w-6xl mx-auto">
                {/* Page Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                    <h1 className="text-3xl font-bold text-[#101828] mb-3">
                        Community Groups for {companyName || 'Your Brand'}
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover communities where your brand can engage in meaningful conversations about financial progress.
                    </p>
                </motion.div>

                {/* Filters and Search */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
                >
                    {/* Search Input */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search communities, locations, or focus areas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2">
                        {["all", "available", "in-progress", "completed"].map((filter) => (
                            <motion.button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-4 py-3 rounded-lg border transition-all ${selectedFilter === filter
                                        ? "bg-[#6941C6] text-white border-[#6941C6]"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {filter === "all" ? "All" : filter === "in-progress" ? "In Progress" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Results Count */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
                >
                    <p className="text-gray-600">
                        Showing {filteredGroups.length} of {communityGroups.length} communities
                    </p>
                </motion.div>

                {/* Community Groups Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredGroups.map((group, index) => (
                            <motion.div
                                key={group.id}
                                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 25,
                                    delay: 0.3 + index * 0.1
                                }}
                                whileHover={{ y: -5 }}
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-[#101828] mb-2">
                                            {group.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            📍 {group.location}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            👥 {group.memberCount} members
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(group.status)}`}>
                                            {getStatusText(group.status)}
                                        </div>
                                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                                            {group.matchScore}% match
                                        </div>
                                    </div>
                                </div>

                                {/* Focus Areas */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">Focus areas:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {group.focus.map((focus, focusIndex) => (
                                            <motion.span
                                                key={focusIndex}
                                                className="px-3 py-1 bg-[#F9F5FF] text-[#6941C6] text-xs rounded-full border border-purple-200"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 20,
                                                    delay: 0.4 + index * 0.1 + focusIndex * 0.05
                                                }}
                                            >
                                                {focus}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                    {group.description}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button
                                        className="flex-1 bg-[#6941C6] hover:bg-[#56477b] text-white"
                                        onClick={() => router.push(`/communities/${group.id}`)}
                                    >
                                        View Details
                                    </Button>
                                    {group.status === "available" && (
                                        <Button
                                            variant="outline"
                                            className="border-[#6941C6] text-[#6941C6] hover:bg-[#F9F5FF]"
                                        >
                                            Start Campaign
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredGroups.length === 0 && (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    >
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No communities found</h3>
                        <p className="text-gray-500 mb-6">
                            Try adjusting your search terms or filters to find more communities.
                        </p>
                        <Button
                            onClick={() => {
                                setSearchQuery("")
                                setSelectedFilter("all")
                            }}
                            variant="outline"
                            className="border-gray-300 text-gray-600 hover:bg-gray-50"
                        >
                            Clear Filters
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
