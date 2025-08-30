"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChatInput } from "@/components/chat-input"
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu02Icon } from "@hugeicons/core-free-icons";
import { useBrandData } from "@/lib/hooks/useBrandData";
import { motion, AnimatePresence } from "framer-motion";


interface Message {
    id: string
    type: "swiirl" | "brand"
    content: string
    isTyping?: boolean
}

interface ChipOption {
    id: string
    label: string
    selected: boolean
}

export default function ChatPage() {
    const router = useRouter()
    const { companyName, fileCount } = useBrandData()
    const [messages, setMessages] = useState<Message[]>([])
    const [currentBubble, setCurrentBubble] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [selectedTopics, setSelectedTopics] = useState<ChipOption[]>([
        { id: "credit", label: "Building credit?", selected: false },
        { id: "home", label: "Saving for a home?", selected: false },
        { id: "business", label: "Starting side businesses?", selected: false },
        { id: "debt", label: "Managing debt?", selected: false },
        { id: "budget", label: "Or everyday budgeting?", selected: false },
    ])
    const [selectedMarkets, setSelectedMarkets] = useState<ChipOption[]>([
        { id: "national", label: "National", selected: false },
        { id: "atlanta", label: "Atlanta", selected: false },
        { id: "phoenix", label: "Phoenix", selected: false },
        { id: "san-antonio", label: "San Antonio", selected: false },
        { id: "miami", label: "Miami", selected: false },
        { id: "other", label: "Other", selected: false },
    ])
    const [showTopicSelection, setShowTopicSelection] = useState(false)
    const [showMarketSelection, setShowMarketSelection] = useState(false)
    const [showGuardrails, setShowGuardrails] = useState(false)
    const [showFocusBrief, setShowFocusBrief] = useState(false)
    const [waitingForTopicSelection, setWaitingForTopicSelection] = useState(false)
    const [waitingForMarketSelection, setWaitingForMarketSelection] = useState(false)
    const [topicContinueClicked, setTopicContinueClicked] = useState(false)
    const [marketContinueClicked, setMarketContinueClicked] = useState(false)

    const conversationScript = useMemo(() => [
        { type: "swiirl", content: `Welcome! I'll help ${companyName || 'your brand'} join real community conversations.\n\nTo start, what would you like to learn more about?` },
        {
            type: "brand",
            content:
                "We'd like to better understand how people in different communities think about building their financial future.",
        },

        { type: "swiirl", content: "Great.\n\n When you say financial future, are you most interested in…", showTopics: true },
        {
            type: "brand",
            content: "Let's go with building credit, saving for a home, and everyday budgeting.",
            hideTopics: true,
        },
        { type: "swiirl", content: "Got it.\n\n And where would you like to focus first?", showMarkets: true },
        { type: "brand", content: "Atlanta, Phoenix, and San Antonio.", hideMarkets: true },
        { type: "swiirl", content: "Perfect.\n\n And what does success look like for you after these conversations?" },
        { type: "brand", content: "We want to see how people in different communities set their financial priorities.\n\n We want to compare those with our current offerings." },
        { type: "brand", content: "And we want insights to help us design a campaign that connects with what they care about most." },
        { type: "swiirl", content: "Great.\n\n \t\t Just to confirm, your agent will follow these ground rules.", showGuardrails: true },
        { type: "brand", content: "Yes, confirm.", hideGuardrails: true },
        { type: "swiirl", content: "Here's your Focus Brief. Feel free to ask me follow-up questions or request changes.", showFocusBrief: true },
    ], [companyName])

    const addMessage = (type: "swiirl" | "brand", content: string, delay = 0) => {
        setTimeout(() => {
            const newMessage: Message = {
                id: Date.now().toString() + Math.random(),
                type,
                content,
                isTyping: type === "swiirl",
            }
            setMessages((prev) => [...prev, newMessage])

            if (type === "swiirl") {
                setIsTyping(true)
                const typingDuration = Math.min(content.length * 15, 800)
                setTimeout(() => {
                    setIsTyping(false)
                    setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, isTyping: false } : msg)))
                    setTimeout(() => {
                        setCurrentBubble((prev) => prev + 1)
                    }, 200)
                }, typingDuration)
            } else {
                setTimeout(() => {
                    setCurrentBubble((prev) => prev + 1)
                }, 400)
            }
        }, delay)
    }

    useEffect(() => {
        if (currentBubble < conversationScript.length && !waitingForTopicSelection && !waitingForMarketSelection) {
            const bubble = conversationScript[currentBubble]

            if (bubble.showTopics) {
                setShowTopicSelection(true)
                setWaitingForTopicSelection(true)
            }
            if (bubble.hideTopics) {
                setShowTopicSelection(false)
            }
            if (bubble.showMarkets) {
                setShowMarketSelection(true)
                setWaitingForMarketSelection(true)
            }
            if (bubble.hideMarkets) {
                setShowMarketSelection(false)
            }
            if (bubble.showGuardrails) {
                setShowGuardrails(true)
                setWaitingForMarketSelection(true)
            }
            if (bubble.hideGuardrails) {
                setShowGuardrails(false)
                setWaitingForMarketSelection(false)
            }
            if (bubble.showFocusBrief) {
                setShowFocusBrief(true)
            }

            addMessage(bubble.type as "swiirl" | "brand", bubble.content, 200)
        }
    }, [currentBubble, waitingForTopicSelection, waitingForMarketSelection, conversationScript])

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentBubble(0)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    const handleTopicSelect = (topicId: string) => {
        setSelectedTopics((prev) =>
            prev.map((topic) => (topic.id === topicId ? { ...topic, selected: !topic.selected } : topic)),
        )
    }

    const handleMarketSelect = (marketId: string) => {
        setSelectedMarkets((prev) =>
            prev.map((market) => (market.id === marketId ? { ...market, selected: !market.selected } : market)),
        )
    }

    const continueAfterTopics = () => {
        setTopicContinueClicked(true)
        setWaitingForTopicSelection(false)
    }

    const continueAfterMarkets = () => {
        setMarketContinueClicked(true)
        setWaitingForMarketSelection(false)
    }

    const continueAfterGuardrails = () => {
        setWaitingForMarketSelection(false)
    }

    const handleSendMessage = (message: string) => {
        if (message.trim()) {
            addMessage("brand", message.trim())
        }
    }

    const handleSeeCommunities = () => {
        router.push("/communities")
    }


    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            {/* Header */}
            <header className="sticky top-0 bg-white md:left-6 left-2 px-4 py-4 flex justify-between items-center z-10 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-6">
                    <HugeiconsIcon icon={Menu02Icon} className="w-5 h-5" />
                    <Image src="/logo.svg" alt="Swiirl Pulse" width={60} height={60} priority />
                </Link>
            </header>

            {/* Chat Container */}
            <div className="flex-1 px-4 pt-6 pb-16 space-y-6 max-w-2xl mx-auto overflow-y-auto">
                <AnimatePresence>
                    {messages.map((message, index) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ type: "spring", stiffness: 150, damping: 20, delay: index * 0.05 }}
                        >
                            <div className={`flex ${message.type === "brand" ? "justify-end" : "justify-start"}`}>
                                <div className="max-w-[80%]">
                                    {/* Label */}
                                    <div
                                        className={`text-xs mb-1 flex items-center ${message.type === "swiirl" ? "text-[#101828] justify-start" : "text-[#101828] justify-end"
                                            }`}

                                    >
                                        {message.type === "swiirl" ? (
                                            <div className="flex items-end gap-1">
                                                <div className="w-7 h-7 bg-purple-200 border border-purple-300 rounded-full flex items-center justify-center">
                                                    <Image src="/image.png" alt="S" width={20} height={20} className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-medium tracking-tight">Swiirl AI</span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    {message.type === "swiirl" ? (
                                        // No bubble for Swiirl messages
                                        <div className="text-[#101828] text-sm mt-4">
                                            {message.content.split('\n').map((line, lineIndex) => (
                                                <motion.div
                                                    key={lineIndex}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 200,
                                                        damping: 25,
                                                        delay: 0.1 + lineIndex * 0.03
                                                    }}
                                                >
                                                    {line || '\u00A0'}
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        // Light gradient bubble for Brand messages
                                        <div
                                            className={`rounded-tl-[18px] rounded-br-[18px] rounded-bl-[18px] px-4 py-3 bg-gray-100 border border-gray-200 pop-in text-sm `}

                                        >
                                            {message.content}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Topic Selection */}
                            {message.content.includes("When you say financial future") &&
                                (showTopicSelection || topicContinueClicked) && (
                                    <motion.div
                                        className="mt-4 space-y-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            {selectedTopics.map((topic, index) => (
                                                <motion.button
                                                    key={topic.id}
                                                    onClick={() => handleTopicSelect(topic.id)}
                                                    className={`px-4 py-1 rounded-full text-sm transition-all ${topic.selected ? "text-white bg-[#6941C6] hover:bg-[#56477b]" : "text-[#6941C6] hover:bg-[#D6BBFB] bg-[#F9F5FF] border border-purple-300"
                                                        }`}
                                                    disabled={topicContinueClicked}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.15 + index * 0.04 }}
                                                >
                                                    {topic.label}
                                                </motion.button>
                                            ))}
                                        </div>
                                        {!topicContinueClicked && (
                                            <motion.div
                                                className="flex justify-end mt-8 pr-4"
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.3 }}
                                            >
                                                <Button
                                                    onClick={continueAfterTopics}
                                                    className={`px-6 py-2 rounded-lg transition-all bg-gray-100 border border-gray-200 shadow-none text-[#101828] hover:bg-gray-200 hover:border-gray-300 hover:text-gray-500 focus:text-white`}
                                                >
                                                    Continue
                                                </Button>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                            {/* Market Selection */}
                            {message.content.includes("where would you like to focus") &&
                                (showMarketSelection || marketContinueClicked) && (
                                    <motion.div
                                        className="mt-4 space-y-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            {selectedMarkets.map((market, index) => (
                                                <motion.button
                                                    key={market.id}
                                                    onClick={() => handleMarketSelect(market.id)}
                                                    className={`px-4 py-1 rounded-full text-sm transition-all ${market.selected ? "text-white bg-[#6941C6] hover:bg-[#56477b]" : "text-[#6941C6] hover:bg-[#D6BBFB] bg-[#F9F5FF] border border-purple-300"
                                                        }`}
                                                    disabled={marketContinueClicked}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.15 + index * 0.04 }}
                                                >
                                                    {market.label}
                                                </motion.button>
                                            ))}
                                        </div>
                                        {!marketContinueClicked && (
                                            <motion.div
                                                className="flex justify-end mt-8 pr-4"
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.3 }}
                                            >
                                                <Button
                                                    onClick={continueAfterMarkets}
                                                    className={"px-6 py-2 rounded-lg transition-all bg-gray-100 border border-gray-200 shadow-none text-[#101828] hover:bg-gray-200 hover:border-gray-300 hover:text-gray-500 focus:text-white"}
                                                >
                                                    Continue
                                                </Button>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                            {/* Guardrails */}
                            {message.content.includes("ground rules") && showGuardrails && (
                                <motion.div
                                    className="mt-4 space-y-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
                                >
                                    <div className="space-y-3 text-sm max-w-[80%]">
                                        {[
                                            "No personal financial advice — only general information.",
                                            "Clear, simple, everyday language.",
                                            "Conversations are consent-only, and private details are never stored."
                                        ].map((rule, index) => (
                                            <motion.div
                                                key={index}
                                                className="p-3 bg-gray-50 rounded-lg"
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.15 + index * 0.05 }}
                                            >
                                                {rule}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <motion.div
                                        className="flex justify-end mt-8 pr-4"
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.3 }}
                                    >
                                        <Button
                                            onClick={continueAfterGuardrails}
                                            className={"px-6 py-2 rounded-lg transition-all bg-gray-100 border border-gray-200 shadow-none text-[#101828] hover:bg-gray-200 hover:border-gray-300 hover:text-gray-500 focus:text-white"}
                                        >
                                            Agree and Continue
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Focus Brief */}
                            {message.content.includes("Here's your Focus Brief") && showFocusBrief && (
                                <motion.div
                                    className="mt-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4"
                                    initial={{ opacity: 0, y: 25, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.2 }}
                                    >
                                        <Image src="/logo.svg" alt="Swiirl Pulse" width={60} height={20} className="w-10 pb-2" />
                                    </motion.div>
                                    <motion.h3
                                        className="text-2xl font-semibold text-[#201340]"
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.2 }}
                                    >
                                        Focus Brief for {companyName || 'Your Brand'} Campaign Design
                                    </motion.h3>
                                    <div className="space-y-3 text-sm font-normal">
                                        {[
                                            { label: "Topic", value: "Financial Progress" },
                                            { label: "Pillars", value: "Credit building, Home savings, Budgeting" },
                                            { label: "Markets", value: "Atlanta, Phoenix, San Antonio" },
                                            { label: "Goals", value: "Understand community priorities and shape a relevant campaign" },
                                            { label: "Safety", value: "No personal advice, plain language, consent-only conversations" },
                                            { label: "Value to Communities", value: "Micro-grants + coaching hours" },
                                            { label: "Budget", value: "$50,000" },
                                            { label: "Files Uploaded", value: `${fileCount} document${fileCount !== 1 ? 's' : ''}` }
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                className="pb-4 border-b border-gray-200"
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.25 + index * 0.04 }}
                                            >
                                                <strong>{item.label}:</strong> {item.value}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.5 }}
                                    >
                                        <Button
                                            onClick={handleSeeCommunities}
                                            className="w-full text-white py-3"

                                        >
                                            See 186 Groups →
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Chat Input */}
            <ChatInput onSendMessage={handleSendMessage} fileCount={fileCount} />
        </div>
    )
}
