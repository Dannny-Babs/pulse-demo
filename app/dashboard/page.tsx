"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HugeiconsIcon } from '@hugeicons/react'
import { Menu02Icon, CalendarIcon, AutoConversationsIcon, UserGroupIcon, AiPhoneIcon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useBrandData } from '@/lib/hooks/useBrandData'

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
    image: string
    title: string
    time: string
    description: string
    hasInsights: boolean
}

export default function DashboardPage() {
    const router = useRouter()
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
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Credit Building Workshop',
            time: '2 hours ago',
            description: 'New insights available from your Atlanta session',
            hasInsights: true
        },
        {
            id: '2',
            image: 'https://images.unsplash.com/photo-1730094915697-bd504b857145?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
                    <Image src="/logo.svg" alt="Swiirl Pulse" width={60} height={60} priority />
                </Link>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-3xl">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8"
                >
                    <h1 className="md:text-3xl text-2xl font-medium text-gray-900 tracking-tight mb-1">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-600 text-base">Here&apos;s what&apos;s happening with your communities</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-2 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                    >
                        <Card className="p-3 bg-white border border-gray-200 shadow-none">
                            <div className="flex flex-col  items-start gap-4">
                                <div className="p-2 border border-blue-200 bg-blue-100 rounded-md w-fit">
                                    <HugeiconsIcon icon={UserGroupIcon} className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="md:text-2xl text-xl font-bold text-gray-900">85</p>
                                    <p className="text-gray-500 text-base">Active Communities</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                    >
                        <Card className="p-3 bg-white border border-gray-200 shadow-none">
                            <div className="flex flex-col gap-4">
                                <div className="p-2 border border-green-300 bg-green-100 rounded-md w-fit">
                                    <HugeiconsIcon icon={CalendarIcon} className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="md:text-2xl text-xl font-bold text-gray-900">33</p>
                                    <p className="text-gray-500 text-base">Upcoming Sessions</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1  gap-8">
                    {/* Upcoming Sessions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-2"
                    >
                        <div className="p-3 bg-white border border-gray-200 shadow-none rounded-xl">
                            <h2 className="text-md font-medium text-gray-900 mb-4">Upcoming Sessions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                                {upcomingSessions.map((session, index) => (
                                    <motion.div
                                        key={session.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1, duration: 0.6, ease: "easeOut" }}
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
                        </div>
                    </motion.div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Recent Activity */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                        >
                            <div className="p-3 bg-white border border-gray-200 shadow-none rounded-xl">
                                <h2 className="text-md font-medium text-gray-900 mb-4">Recent Activity</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {recentActivity.map((activity, index) => (
                                        <motion.div
                                            key={activity.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                                            className="p-1 border border-gray-200 rounded-lg"
                                        >
                                            <Image src={activity.image} alt="Activity" width={1000} height={1000} className="w-full rounded-md" loading='lazy' />
                                            <div className='p-2'>
                                                <div className="flex justify-between  items-start ">
                                                    <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                                                    <p className="text-sm text-gray-500 mb-2">{activity.time}</p>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2 ">{activity.description}</p>
                                                {activity.hasInsights && (
                                                    <Button
                                                        variant="default"
                                                        size="default"
                                                        className='w-full bg-[#2a1953]'
                                                        onClick={() => router.push('/dashboard/insights')}
                                                    >
                                                        View Insights
                                                    </Button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                        >
                            <div className="p-3 bg-white border border-gray-200 shadow-none rounded-xl">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                                <div className="space-y-3">
                                    <Button variant="default" className="w-full justify-start bg-slate-900" onClick={() => router.push('/dashboard/insights')} >
                                        <HugeiconsIcon icon={AutoConversationsIcon} className="w-4 h-4 mr-2" />
                                        View Insights by Cohort
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/communities')}   >
                                        <HugeiconsIcon icon={UserGroupIcon} className="w-4 h-4 mr-2" />
                                        Browse Communities
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/brand-agent')}   >  
                                            <HugeiconsIcon icon={AiPhoneIcon} className="w-4 h-4 mr-2" />
                                        Brand Agent
                                    </Button>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>


            </div>
        </div>
    )
}
