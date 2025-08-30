"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HugeiconsIcon } from '@hugeicons/react'
import { Menu02Icon, UsersIcon, CalendarIcon, TrendingUpIcon, EyeIcon, SearchIcon, UsersGroupIcon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import Image from 'next/image'

interface UpcomingSession {
    id: string
    title: string
    host: string
    location: string
    date: string
    time: string
    attending: number
    badge: string
}

interface RecentActivity {
    id: string
    title: string
    time: string
    description: string
    hasInsights: boolean
}

export default function DashboardPage() {
    const upcomingSessions: UpcomingSession[] = [
        {
            id: '1',
            title: 'Better Budgeting Workshop',
            host: 'Maya R. (Group Admin)',
            location: 'ATL',
            date: 'Thu, Sep 11',
            time: '6:00–7:15 PM',
            attending: 26,
            badge: 'Accepted'
        },
        {
            id: '2',
            title: 'Planning Your Financial Future',
            host: 'Jordan P. (Group Admin)',
            location: 'ATL',
            date: 'Sat, Sep 13',
            time: '10:00–11:30 AM',
            attending: 22,
            badge: 'Accepted'
        },
        {
            id: '3',
            title: 'Buying a Home — Tips',
            host: 'DeAndre S. (Group Admin)',
            location: 'ATL',
            date: 'Tue, Sep 16',
            time: '7:00–8:00 PM',
            attending: 28,
            badge: 'Pending'
        }
    ]

    const recentActivity: RecentActivity[] = [
        {
            id: '1',
            title: 'Credit Building Workshop',
            time: '2 hours ago',
            description: 'New insights available from your Atlanta session',
            hasInsights: true
        },
        {
            id: '2',
            title: 'Home Savings Group',
            time: '1 day ago',
            description: 'Session completed - insights now available',
            hasInsights: true
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center z-10">
                <Link href="/" className="flex items-center gap-6">
                    <HugeiconsIcon icon={Menu02Icon} className="w-5 h-5" />
                    <Image src="/Logo.svg" alt="Swiirl Pulse" width={60} height={60} />
                </Link>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
                    <p className="text-gray-600 text-lg">Here's what's happening with your communities</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    >
                        <Card className="p-6 bg-white border-0 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <HugeiconsIcon icon={UsersIcon} className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">85</p>
                                    <p className="text-gray-600">Active Communities</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <Card className="p-6 bg-white border-0 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <HugeiconsIcon icon={CalendarIcon} className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">33</p>
                                    <p className="text-gray-600">Upcoming Sessions</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upcoming Sessions */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="lg:col-span-2"
                    >
                        <Card className="p-6 bg-white border-0 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Sessions</h2>
                            <div className="space-y-4">
                                {upcomingSessions.map((session, index) => (
                                    <motion.div
                                        key={session.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                                        className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-900">{session.title}</h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${session.badge === 'Accepted'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {session.badge}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            Host: {session.host} • {session.location}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-600">
                                                {session.date} • {session.time}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Attending: {session.attending}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Recent Activity */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                        >
                            <Card className="p-6 bg-white border-0 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                                <div className="space-y-4">
                                    {recentActivity.map((activity, index) => (
                                        <motion.div
                                            key={activity.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                                            className="p-4 border border-gray-200 rounded-lg"
                                        >
                                            <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                                            <p className="text-sm text-gray-500 mb-2">{activity.time}</p>
                                            <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                                            {activity.hasInsights && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full"
                                                >
                                                    <HugeiconsIcon icon={EyeIcon} className="w-4 h-4 mr-2" />
                                                    View Insights
                                                </Button>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                        >
                            <Card className="p-6 bg-white border-0 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start">
                                        <HugeiconsIcon icon={TrendingUpIcon} className="w-4 h-4 mr-2" />
                                        View Insights by Cohort
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <HugeiconsIcon icon={UsersGroupIcon} className="w-4 h-4 mr-2" />
                                        Browse Communities
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <HugeiconsIcon icon={SearchIcon} className="w-4 h-4 mr-2" />
                                        Search Sessions
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
