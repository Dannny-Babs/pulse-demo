"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, Menu02Icon, FilterIcon, LocationIcon, UserIcon, CalendarIcon, ClockIcon, CreditCardIcon, HomeIcon, DollarIcon, UserGroup03Icon } from "@hugeicons/core-free-icons"
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
    image: string
    host: string
    meetingDate: string
    meetingTime: string
    pillar: "Credit Building" | "Home Savings" | "Budgeting"
}

export default function CommunitiesPage() {
    const router = useRouter()
    const { companyName } = useBrandData()
    const [selectedFilter, setSelectedFilter] = useState<string>("all")
    const [selectedPillar, setSelectedPillar] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [showPillarFilter, setShowPillarFilter] = useState(false)
    const pillarFilterRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pillarFilterRef.current && !pillarFilterRef.current.contains(event.target as Node)) {
                setShowPillarFilter(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const communityGroups: CommunityGroup[] = [
        // Credit Building Groups
        {
            id: "1",
            name: "Better Budgeting Workshop",
            location: "Atlanta, GA",
            memberCount: 47,
            focus: ["Credit Building", "Financial Education", "Debt Management"],
            description: "A supportive community focused on building strong credit scores and achieving financial independence.",
            matchScore: 98,
            status: "available",
            image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            host: "Maya R. (Group Admin)",
            meetingDate: "Every Tuesday",
            meetingTime: "7:00 PM EST",
            pillar: "Credit Building"
        },
        {
            id: "2",
            name: "Planning Your Financial Future",
            location: "Phoenix, AZ",
            memberCount: 32,
            focus: ["Credit Building", "Budgeting", "Financial Planning"],
            description: "Empowering individuals to rebuild and strengthen their credit through education and support.",
            matchScore: 95,
            status: "available",
            image: "https://images.unsplash.com/photo-1730094915697-bd504b857145?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            host: "Sarah K. (Group Admin)",
            meetingDate: "Every Thursday",
            meetingTime: "6:30 PM MST",
            pillar: "Credit Building"
        },
        {
            id: "3",
            name: "Buying a Home — Tips",
            location: "San Antonio, TX",
            memberCount: 28,
            focus: ["Credit Building", "Debt Management", "Financial Literacy"],
            description: "Building credit scores and financial confidence through community support and education.",
            matchScore: 92,
            status: "available",
            image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            host: "Carlos M. (Group Admin)",
            meetingDate: "Every Wednesday",
            meetingTime: "7:00 PM CST",
            pillar: "Credit Building"
        },
        {
            id: "4",
            name: "Smart Saving Strategies",
            location: "Atlanta, GA",
            memberCount: 35,
            focus: ["Credit Building", "Investment", "Wealth Building"],
            description: "Advanced credit strategies and wealth building techniques for financial success.",
            matchScore: 89,
            status: "available",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6f?w=400&h=300&fit=crop",
            host: "Jennifer L. (Group Admin)",
            meetingDate: "Every Saturday",
            meetingTime: "10:00 AM EST",
            pillar: "Credit Building"
        },
        {
            id: "5",
            name: "Building Your Credit Score",
            location: "Phoenix, AZ",
            memberCount: 41,
            focus: ["Credit Building", "Home Savings", "Financial Freedom"],
            description: "Comprehensive credit building strategies leading to homeownership and financial freedom.",
            matchScore: 87,
            status: "available",
            image: "https://images.unsplash.com/photo-1554224154-8d04cb21cd6f?w=400&h=300&fit=crop",
            host: "Michael T. (Group Admin)",
            meetingDate: "Every Sunday",
            meetingTime: "2:00 PM MST",
            pillar: "Credit Building"
        },

        // Home Savings Groups
        {
            id: "6",
            name: "Home Savings Strategies",
            location: "Atlanta, GA",
            memberCount: 52,
            focus: ["Home Savings", "Real Estate", "Investment"],
            description: "Saving strategies and real estate insights to achieve the dream of homeownership.",
            matchScore: 96,
            status: "available",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            host: "David P. (Group Admin)",
            meetingDate: "Every Monday",
            meetingTime: "6:00 PM EST",
            pillar: "Home Savings"
        },
        {
            id: "7",
            name: "Saving for a Home",
            location: "Phoenix, AZ",
            memberCount: 38,
            focus: ["Home Savings", "Budgeting", "Financial Planning"],
            description: "Smart saving strategies and budgeting techniques for first-time homebuyers.",
            matchScore: 94,
            status: "available",
            image: "https://images.unsplash.com/photo-1624953901718-e24ee7200b85?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            host: "Lisa W. (Group Admin)",
            meetingDate: "Every Friday",
            meetingTime: "7:00 PM MST",
            pillar: "Home Savings"
        },
        {
            id: "8",
            name: "Home Savings Club",
            location: "San Antonio, TX",
            memberCount: 31,
            focus: ["Home Savings", "Credit Building", "Real Estate"],
            description: "Building savings and credit to unlock the door to homeownership in San Antonio.",
            matchScore: 91,
            status: "available",
            image: "https://images.unsplash.com/photo-1733897669171-e7cf3712cced?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            host: "Maria G. (Group Admin)",
            meetingDate: "Every Tuesday",
            meetingTime: "6:30 PM CST",
            pillar: "Home Savings"
        },
        {
            id: "9",
            name: "First-Time Homebuyer Workshop",
            location: "Atlanta, GA",
            memberCount: 45,
            focus: ["Home Savings", "Real Estate Education", "Financial Planning"],
            description: "Supporting first-time homebuyers with education, savings strategies, and market insights.",
            matchScore: 88,
            status: "available",
            image: "https://images.unsplash.com/photo-1560518883-8d04cb21cd6f?w=400&h=300&fit=crop",
            host: "Robert H. (Group Admin)",
            meetingDate: "Every Thursday",
            meetingTime: "7:30 PM EST",
            pillar: "Home Savings"
        },
        {
            id: "10",
            name: "Real Estate Savings Group",
            location: "Phoenix, AZ",
            memberCount: 29,
            focus: ["Home Savings", "Investment", "Market Analysis"],
            description: "Strategic saving and investment approaches for real estate success in Phoenix.",
            matchScore: 85,
            status: "available",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
            host: "Amanda F. (Group Admin)",
            meetingDate: "Every Saturday",
            meetingTime: "9:00 AM MST",
            pillar: "Home Savings"
        },

        // Budgeting Groups
        {
            id: "11",
            name: "Budgeting Basics Workshop",
            location: "Atlanta, GA",
            memberCount: 63,
            focus: ["Budgeting", "Financial Planning", "Debt Management"],
            description: "Mastering the art of budgeting for financial freedom and long-term success.",
            matchScore: 97,
            status: "available",
            image: "https://images.unsplash.com/photo-1711606815631-38d32cdaec3e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            host: "Thomas B. (Group Admin)",
            meetingDate: "Every Wednesday",
            meetingTime: "6:00 PM EST",
            pillar: "Budgeting"
        },
        {
            id: "12",
            name: "Budgeting and Debt Management",
            location: "Phoenix, AZ",
            memberCount: 41,
            focus: ["Budgeting", "Credit Building", "Financial Education"],
            description: "Building sustainable budgets that lead to financial stability and growth.",
            matchScore: 93,
            status: "available",
            image: "https://images.unsplash.com/photo-1725258080098-727051947997?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            host: "Rachel S. (Group Admin)",
            meetingDate: "Every Monday",
            meetingTime: "6:30 PM MST",
            pillar: "Budgeting"
        },
        {
            id: "13",
            name: "Budgeting My Way",
            location: "San Antonio, TX",
            memberCount: 34,
            focus: ["Budgeting", "Home Savings", "Financial Wellness"],
            description: "Championing financial wellness through effective budgeting and smart money management.",
            matchScore: 90,
            status: "available",
            image: "https://images.unsplash.com/photo-1713947506242-8fcae733d158?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            host: "Daniel R. (Group Admin)",
            meetingDate: "Every Friday",
            meetingTime: "6:00 PM CST",
            pillar: "Budgeting"
        },
        {
            id: "14",
            name: "Financial Freedom Budgeters",
            location: "Atlanta, GA",
            memberCount: 48,
            focus: ["Budgeting", "Investment", "Wealth Building"],
            description: "Budgeting strategies that create pathways to financial freedom and wealth building.",
            matchScore: 86,
            status: "available",
            image: "https://images.unsplash.com/photo-1724610055124-23f89198a8b5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            host: "Nicole C. (Group Admin)",
            meetingDate: "Every Sunday",
            meetingTime: "3:00 PM EST",
            pillar: "Budgeting"
        },
        {
            id: "15",
            name: "Smart Money Managers",
            location: "Phoenix, AZ",
            memberCount: 36,
            focus: ["Budgeting", "Real Estate", "Financial Planning"],
            description: "Smart money management techniques for achieving financial goals and homeownership.",
            matchScore: 84,
            status: "available",
            image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            host: "Kevin J. (Group Admin)",
            meetingDate: "Every Thursday",
            meetingTime: "6:00 PM MST",
            pillar: "Budgeting"
        }
    ]

    const filteredGroups = communityGroups.filter(group => {
        const matchesFilter = selectedFilter === "all" || group.status === selectedFilter
        const matchesPillar = selectedPillar === "all" || group.pillar === selectedPillar
        const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.focus.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesFilter && matchesPillar && matchesSearch
    })


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
            <div className="flex-1 px-4 pt-6 pb-16 max-w-2xl mx-auto">
                {/* Page Header */}
                <motion.div
                    className="text-left mb-8"
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
                    className="flex flex-row gap-2 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
                >
                    {/* Search Input */}
                    <div className="flex-1 flex items-center gap-2 rounded-lg px-4 py-3 focus:border-primary/10 focus:ring-primary/10 focus:shadow-primary/10 focus:ring-2 focus:ring-offset-2 focus-visible:border-primary/10 focus-visible:ring-primary/10 focus-visible:shadow-primary/10 focus-visible:ring-2 focus-visible:ring-offset-2 border-[1.5px] border-gray-200">
                        <HugeiconsIcon icon={Search01Icon} className="w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search communities, locations, or focus areas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full   border-none focus:outline-none  focus:border-transparent text-sm focus:ring-0"
                        />
                    </div>

                    {/* Pillar Filter Toggle */}
                    <div className="relative" ref={pillarFilterRef}>
                        <motion.button
                            onClick={() => setShowPillarFilter(!showPillarFilter)}
                            className={`px-3 py-3 rounded-lg border transition-all flex items-center gap-2 ${selectedPillar !== "all"
                                ? "bg-[#6941C6] text-white border-[#6941C6]"
                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <HugeiconsIcon icon={FilterIcon} className="w-4 h-4" />
                            <span className="text-sm">
                                {selectedPillar === "all" ? "All Pillars" : selectedPillar}
                            </span>
                        </motion.button>

                        {/* Pillar Filter Dropdown */}
                        <AnimatePresence>
                            {showPillarFilter && (
                                <motion.div
                                    className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[200px]"
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    {["all", "Credit Building", "Home Savings", "Budgeting"].map((pillar) => (
                                        <motion.button
                                            key={pillar}
                                            onClick={() => {
                                                setSelectedPillar(pillar)
                                                setShowPillarFilter(false)
                                            }}
                                            className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${selectedPillar === pillar
                                                ? "bg-[#F9F5FF] text-[#6941C6] font-medium"
                                                : "text-gray-700"
                                                }`}
                                            whileHover={{ x: 5 }}
                                        >
                                            {pillar === "all" ? "All Pillars" : pillar}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>


                </motion.div>

                {/* Results Count */}
                <motion.div
                    className="mb-6 text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
                >
                    <p className="text-gray-600">
                        Showing {filteredGroups.length} of {communityGroups.length} communities
                    </p>
                </motion.div>

                {/* Community Groups by Pillars */}
                <div className="space-y-12">
                    {["Credit Building", "Home Savings", "Budgeting"].map((pillar) => {
                        const pillarGroups = filteredGroups.filter(group => group.pillar === pillar)
                        if (pillarGroups.length === 0) return null

                        return (
                            <motion.div
                                key={pillar}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.3 }}
                            >
                                {/* Pillar Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className=" bg-[#F9F5FF] rounded-full flex items-center justify-center p-2">
                                            <HugeiconsIcon
                                                icon={
                                                    pillar === "Credit Building" ? CreditCardIcon :
                                                        pillar === "Home Savings" ? HomeIcon :
                                                            DollarIcon
                                                }
                                                size={20}
                                                className=" text-[#6941C6]"
                                            />
                                        </div>
                                        <h2 className="text-md font-semibold text-
                                        [#101828]">{pillar}</h2>
                                        <span className="text-gray-500 text-sm">
                                            ({pillarGroups.length} groups)</span>
                                    </div>
                                    <p className="text-gray-500 text-sm ">
                                        See More
                                    </p>

                                </div>

                                {/* Groups Grid */}
                                <div className="grid grid-cols-1 gap-6">
                                    <AnimatePresence>
                                        {pillarGroups.slice(0, 3).map((group, index) => (
                                            <motion.div
                                                key={group.id}
                                                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 200,
                                                    damping: 25,
                                                    delay: 0.4 + index * 0.1
                                                }}
                                                whileHover={{ y: -5 }}
                                            >
                                                {/* Desktop Row Layout */}
                                                <div className="flex flex-col lg:flex-row p-1">
                                                    {/* Group Image */}
                                                    <div className="relative w-full md:w-32 md:h-32 h-56  lg:max-h-[200px] rounded-t-lg lg:rounded-l-lg lg:rounded-t-none ">
                                                        <Image
                                                            src={group.image}
                                                            alt={group.name}
                                                            fill
                                                            className="object-cover rounded-lg "
                                                        />
                                                        <div className="absolute top-3 right-3">
                                                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                                                                {group.matchScore}% match
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Group Content */}
                                                    <div className="flex-1 p-3 ">
                                                        {/* Header */}
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">

                                                                    <h3 className="text-lg font-semibold text-[#101828]">
                                                                        {group.name}
                                                                    </h3>
                                                                </div>
                                                                {/* Description */}
                                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                                    {group.description}
                                                                </p>

                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <HugeiconsIcon icon={UserIcon} className="w-4 h-4 text-gray-500" />
                                                                    <p className="text-gray-500 text-sm">
                                                                        <strong className="font-semibold text-gray-600">Host: </strong>
                                                                        {group.host}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-2 my-2">

                                                                    <div className="flex items-center gap-2">
                                                                        <HugeiconsIcon icon={LocationIcon} className="w-4 h-4 text-gray-500" />
                                                                        <p className="text-gray-600 text-sm">
                                                                            {group.location}
                                                                        </p>
                                                                    </div>
                                                                    <div className="w-1 h-1  bg-gray-200 rounded-full" />
                                                                    <div className="flex items-center gap-2">
                                                                        <HugeiconsIcon icon={UserGroup03Icon} className="w-4 h-4 text-gray-500" />
                                                                        <p className="text-gray-500 text-sm">
                                                                            <strong className="font-semibold text-gray-600">Attending Members: </strong>
                                                                            {group.memberCount} members
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>

                                                        {/* Meeting Info */}
                                                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <HugeiconsIcon icon={CalendarIcon} className="w-4 h-4 text-gray-500" />
                                                                <p className="text-sm text-gray-600">
                                                                    <span className="font-medium">Meeting:</span> {group.meetingDate}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <HugeiconsIcon icon={ClockIcon} className="w-4 h-4 text-gray-500" />
                                                                <p className="text-sm text-gray-600">
                                                                    <span className="font-medium">Time:</span> {group.meetingTime}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Focus Areas */}
                                                        <div className="mb-4">
                                                            <p className="text-sm text-gray-600 mb-2">Focus areas:</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {group.focus.slice(0, 3).map((focus, focusIndex) => (
                                                                    <motion.span
                                                                        key={focusIndex}
                                                                        className="px-3 py-1 bg-[#F9F5FF] text-[#6941C6] text-xs rounded-full border border-purple-200"
                                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{
                                                                            type: "spring",
                                                                            stiffness: 300,
                                                                            damping: 20,
                                                                            delay: 0.5 + index * 0.1 + focusIndex * 0.05
                                                                        }}
                                                                    >
                                                                        {focus}
                                                                    </motion.span>
                                                                ))}
                                                            </div>
                                                        </div>



                                                        <Button
                                                            className="flex-1 bg-[#1b0f38] hover:bg-[#56477b] text-white w-full mt-4"
                                                            onClick={() => router.push('/pricing')}
                                                        >
                                                            Join Group
                                                        </Button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )
                    })}
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
                                setSelectedPillar("all")
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
