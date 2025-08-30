"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { Tick01Icon, ArrowUp01Icon, ArrowDown01Icon, Menu02Icon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface PricingPlan {
    id: string
    name: string
    price: string
    period: string
    features: string[]
    description: string
    isPopular?: boolean
    isExpanded?: boolean
}

export default function PricingPage() {
    const router = useRouter()
    const [plans, setPlans] = useState<PricingPlan[]>([
        {
            id: 'observer',
            name: 'Observer',
            price: '50',
            period: 'per gathering',
            features: [
                'AI attends silently (no interjections). Consent-only capture; recording OFF by default',
                'Recap + Next Steps snapshot',
                'Rollups across all rooms',
                'Key themes by topic/market',
                'Sentiment heatmap + top questions'
            ],
            description: 'Best for: first pass, sensitive topics, discovery at scale'
        },
        {
            id: 'participant',
            name: 'Participant',
            price: '100',
            period: 'per gathering',
            features: [
                'Everything in Observer plus....',
                'Short, respectful follow-up questions (rate-limited)',
                'Prompt suggestions to facilitator',
                'Insights with "why it matters" notes',
                'Richer, consent-cleared quotes',
                'Opportunities & strengths map (what to lean into / fix)'
            ],
            description: 'Best for: active listening, testing hypotheses, faster, sharper insights',
            isPopular: true
        },
        {
            id: 'co-facilitator',
            name: 'Co-facilitator',
            price: '200',
            period: 'per gathering',
            features: [
                'Everything in Participant plus....',
                'Pre-approved 5–10 min segment (run polls/breakouts)',
                'Optional micro-exercises (e.g., "pick one action for 7 days")',
                'Deeper, structured insight & prioritized feedback',
                'Validated hypotheses (what resonated vs. rejected)',
                'Program hypothesis per market (theme + why-now)'
            ],
            description: 'Best for: driving outcomes, rapid campaign inputs, pilot programs'
        }
    ])

    const togglePlan = (planId: string) => {
        setPlans(prev => prev.map(plan =>
            plan.id === planId
                ? { ...plan, isExpanded: !plan.isExpanded }
                : plan
        ))
    }

    const handleGetAccess = (planId: string) => {
        // Handle subscription logic here
        console.log(`Subscribing to ${planId} plan`)
        // Navigate to dashboard after selecting a plan
        router.push('/dashboard')
    }

    return (

        <div className="min-h-screen bg-white relative overflow-hidden">
            <header className="sticky top-0 bg-white md:left-6 left-2 px-4 py-4 flex justify-between items-center z-10 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-6">
                    <HugeiconsIcon icon={Menu02Icon} className="w-5 h-5" />
                    <Image src="/logo.svg" alt="Swiirl Pulse" width={60} height={60} />
                </Link>
            </header>

            <div className="relative z-10 container mx-auto px-4 py-12 max-w-2xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="text-left mb-16"
                >
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                        Plans that fit your goals
                    </h1>
                    <p className="text-base text-gray-500 max-w-2xl ">
                        Select the best option. Prices reflect max participants and may be lower based on participation.
                    </p>
                </motion.div>

                {/* Pricing Plans */}
                <div className="max-w-2xl mx-auto space-y-6">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                                delay: index * 0.1
                            }}
                            className="relative"
                        >
                            {plan.isPopular && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                                    className="bg-purple-100 text-purple-700 px-2 py-1 w-16 absolute -top-3 right-4 text-center rounded-md border-[1.5px] border-purple-700 text-xs font-medium"
                                >
                                    Popular
                                </motion.div>
                            )}
                            {/* Plan Card */}
                            <motion.div
                                className={`bg-white border-[1.5px] rounded-xl  p-3 cursor-pointer transition-all duration-300 ${plan.isExpanded
                                    ? 'border-purple-700 shadow'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => togglePlan(plan.id)}
                                whileHover={{ scale: 1.005 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="flex  flex-col gap-4">
                                    {/* Radio Button */}
                                    <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${plan.isExpanded
                                        ? 'border-purple-700'
                                        : 'border-gray-400'
                                        }`}>
                                        {plan.isExpanded && (
                                            <div className="w-2.5 h-2.5 bg-purple-700 rounded-full"></div>
                                        )}
                                    </div>

                                    {/* Plan info */}
                                    <div className="flex  flex-row justify-between items-start">
                                        {/* Plan details */}
                                        <div>
                                            <h3 className="md:text-xl text-lg font-semibold tracking-tight text-gray-900 mb-1">
                                                {plan.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm md:max-w-lg max-w-64">
                                                {plan.description}
                                            </p>
                                        </div>
                                        {/* Right side - Price and Popular tag */}
                                        <div className="flex items-center gap-3">


                                            <div className="text-right">
                                                <p className="text-lg md:text-xl font-medium text-gray-900">
                                                    ${plan.price}
                                                </p>
                                                <p className="text-gray-500 text-sm">
                                                    {plan.period}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {plan.isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, y: -20 }}
                                            animate={{ opacity: 1, height: "auto", y: 0 }}
                                            exit={{ opacity: 0, height: 0, y: -20 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                            className="mt-2   overflow-hidden"
                                        >
                                            <div className="p-3 md:p-4  border-t-[1.5px] border-gray-200">
                                                {/* Features List */}
                                                <div className="mb-6">
                                                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                                                        What&apos;s included
                                                    </h4>
                                                    <div className="space-y-3">
                                                        {plan.features.map((feature, featureIndex) => (
                                                            <motion.div
                                                                key={featureIndex}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{
                                                                    type: "spring",
                                                                    stiffness: 300,
                                                                    damping: 25,
                                                                    delay: 0.1 + featureIndex * 0.05
                                                                }}
                                                                className="flex items-center gap-3"
                                                            >

                                                                <HugeiconsIcon icon={Tick01Icon} className="w-5 h-5 text-purple-700" />

                                                                <span className="text-gray-700 text-sm">{feature}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                                >
                                                    <Button
                                                        onClick={() => handleGetAccess(plan.id)}
                                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 text-base rounded-lg transition-all duration-300"
                                                    >
                                                        Select plan
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )}


                                </div>
                            </motion.div>


                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-400 text-sm">
                        All plans are per gathering. Adjust gatherings as needed.
                    </p>
                </motion.div>
            </div>
        </div >

    )
}
