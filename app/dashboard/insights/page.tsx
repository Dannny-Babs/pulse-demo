"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeftIcon, InLoveIcon, QuestionIcon, UserQuestion01Icon, MessageCancel01Icon, Tick01Icon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import Image from 'next/image'
import { useBrandData } from '@/lib/hooks/useBrandData'
import { useState, useEffect } from 'react'


export default function InsightsPage() {
    const [showNotification, setShowNotification] = useState(true)
    const { companyName } = useBrandData()

    useEffect(() => {
        // Auto-hide notification after 5 seconds
        const timer = setTimeout(() => {
            setShowNotification(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <HugeiconsIcon icon={ArrowLeftIcon} className="w-5 h-5" />
                        <span className="text-sm"> Dashboard</span>
                    </Link>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <Image src="/Logo.svg" alt="Swiirl Pulse" width={60} height={60} />
                </div>
            </header>

            {/* Notification Toast */}
            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full"
                    >
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm mx-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Added to Brand Cortex</h3>
                                </div>
                                <button
                                    onClick={() => setShowNotification(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                                    aria-label="Close notification"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-sm text-gray-600 mb-4 space-y-1">
                                <p>Co-mind for Atlanta updated. Source:</p>
                                <p>consented polls/notes/voice. Recording: OFF</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => setShowNotification(false)}
                                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Dismiss
                                </button>
                                <button className="text-sm text-purple-600 hover:text-purple-700 transition-colors font-medium">
                                    View changes
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 py-8 max-w-2xl">
                {/* Insights Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="p-4 bg-white border border-gray-200 shadow-none rounded-xl">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                                {companyName ? `${companyName} Financial progress` : 'Financial progress'}
                            </h1>
                            <p className="text-gray-600 ">Report for ATL, Jul 01 - 31</p>
                        </div>

                        {/* Summary Section */}
                        <div className="mb-8 pb-2 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>

                            <div className="mb-6">
                                <h3 className="text-md font-medium text-gray-600 mb-3">How people felt</h3>

                                <div className="mb-4">
                                    <div className='flex gap-4 items-center border border-gray-200  rounded-2xl p-2 w-full mb-3'>
                                        <div className='p-2 border bg-green-100 border-green-200 rounded-full'>
                                            <HugeiconsIcon icon={InLoveIcon} className="w-5 h-5 text-green-700" />
                                        </div>
                                        <h4 className=" font-medium text-gray-700 ">Brand positioning confidence</h4>

                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full border border-green-200">
                                            61% hopeful
                                        </span>
                                        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full border border-amber-200">
                                            29% mixed
                                        </span>
                                        <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full border border-red-200">
                                            10% concerned
                                        </span>
                                    </div>
                                    <div className="text text-gray-600 space-y-1">
                                        <p><strong>150 </strong> groups participated, avg size <strong>20</strong></p>
                                        <p><strong>High </strong>insight depth</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sentiment Themes Section */}
                        <div className="mb-8 mt-8 border-b border-gray-200 pb-8">
                            <h2 className="text-lg font-semibold text-gray-900 `mb-4">Sentiment themes</h2>
                            <p className="text-md text-gray-600 mb-4">How people felt about the topics</p>

                            <div className="space-y-6">
                                <div className="border-l-4  bg-gray-50  border-gray-200 py-2 px-4">
                                    <div className="text-3xl text-gray-400 ">&ldquo;</div>
                                    <div className='flex justify-between items-center' >
                                        <p className="font-semibold text-gray-900 mb-1 text-lg">Prices keep going up</p>
                                        <p className="text-md text-gray-600 mb-2">58%</p>
                                    </div>
                                    <p className="text-sm text-gray-700"><span className="font-medium">Implication:</span> lean into micro-wins and price tips; avoid &ldquo;hack&rdquo; claims</p>
                                </div>

                                <div className="border-l-4 bg-gray-50  border-gray-200 py-2 px-4">
                                    <div className="text-3xl text-gray-400 mb-2">&ldquo;</div>
                                    <div className='flex justify-between items-center' >
                                        <p className="font-semibold text-gray-900 mb-1 text-lg">Job prospects getting better</p>
                                        <p className="text-md text-gray-600 mb-2">33%</p>
                                    </div>
                                    <p className="text-sm text-gray-700"><span className="font-medium">Implication:</span> offer starter moves (credit on-ramp, 5-min budgeting)</p>
                                </div>

                                <div className="border-l-4 bg-gray-50  border-gray-200 py-2 px-4">
                                    <div className="text-3xl text-gray-400 mb-2">&ldquo;</div>
                                    <div className='flex justify-between items-center' >
                                        <p className="font-semibold text-gray-900 mb-1 text-lg">Waiting for rates &lt; 5% to buy</p>
                                        <p className="text-md text-gray-600 mb-2">27%</p>
                                    </div>
                                    <p className="text-sm text-gray-700"><span className="font-medium">Implication:</span> focus on what&apos;s doable now, avoid rate predictions</p>
                                </div>
                            </div>
                        </div>

                        {/* Signals Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Signals we heard</h2>
                            <p className="text-md text-gray-600 mb-4">Patterns and behavior</p>

                            <div className=" mt-8 grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-8">
                                <div>
                                    <div className='p-3 border bg-purple-100 border-purple-200 rounded-full w-fit mx-auto mb-4'>
                                        <HugeiconsIcon icon={QuestionIcon} className="w-6 h-6 text-purple-700" />
                                    </div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2 text-center">TOP QUESTIONS</h4>

                                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside text-center">
                                        <li>How do I start credit with a thin line?</li>
                                        <li>What&apos;s a realistic home-saving pace?</li>
                                    </ul>
                                </div>

                                <div>
                                    <div className='p-3 border bg-purple-100 border-purple-200 rounded-full w-fit mx-auto mb-4'>
                                        <HugeiconsIcon icon={UserQuestion01Icon} className="w-6 h-6 text-purple-700" />
                                    </div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2 text-center">COMMON NEEDS</h4>

                                    <p className="text-sm text-gray-600 text-center">Simple starter steps, plain-language guides, SMS reminders</p>
                                </div>

                                <div>
                                    <div className='p-3 border bg-purple-100 border-purple-200 rounded-full w-fit mx-auto mb-4'>
                                        <HugeiconsIcon icon={MessageCancel01Icon} className="w-6 h-6 text-purple-700" />
                                    </div>
                                    <h4 className="text-md font-medium text-gray-700 mb-2 text-center   ">DEBUNKED</h4>
                                    <p className="text-sm text-gray-600 text-center">&ldquo;Cash stuffing always improves scores&rdquo; (reframed in recap)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
