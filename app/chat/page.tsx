"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { ChatInput } from "@/components/chat-input"
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu02Icon } from "@hugeicons/core-free-icons";
import { useBrandData } from "@/lib/hooks/useBrandData";


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
    const [inputMessage, setInputMessage] = useState("")
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
    const [guardrailContinueClicked, setGuardrailContinueClicked] = useState(false)

    const conversationScript = [
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
        { type: "brand", content: "We want to see how people in different communities set their financial priorities.\n\n We want to compare those with our current offerings.\n\n And we want insights to help us design a campaign that connects with what they care about most." },
        { type: "swiirl", content: "Great.\n\n \t\t Just to confirm, your agent will follow these ground rules.", showGuardrails: true },
        { type: "brand", content: "Yes, confirm.", hideGuardrails: true },
        { type: "swiirl", content: "Here's your Focus Brief. Feel free to ask me follow-up questions or request changes.", showFocusBrief: true },
    ]

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
    }, [currentBubble, waitingForTopicSelection, waitingForMarketSelection])

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
        setGuardrailContinueClicked(true)
        setWaitingForMarketSelection(false)
    }

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            addMessage("brand", inputMessage.trim())
            setInputMessage("")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleSeeCommunities = () => {
        router.push("/communities")
    }

    const handleBack = () => {
        router.back()
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            {/* Header */}
            <header className="sticky top-0 bg-white md:left-6 left-2 px-4 py-4 flex justify-between items-center z-10 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-6">
                    <HugeiconsIcon icon={Menu02Icon} className="w-5 h-5" />
                    <Image src="/logo.svg" alt="Swiirl Pulse" width={60} height={60} />
                </Link>
            </header>

            {/* Chat Container */}
            <div className="flex-1 px-4 py-6 space-y-6 max-w-2xl mx-auto overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={message.id}>
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
                                    <div
                                        className={`text-[#101828] text-sm mt-4 ${message.isTyping ? "typewriter" : "pop-in"}`}

                                    >
                                        {message.content}
                                        {message.isTyping && <span className="cursor ml-1 animate-pulse">|</span>}
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
                                <div className="mt-4 space-y-3 fade-in-up">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedTopics.map((topic) => (
                                            <button
                                                key={topic.id}
                                                onClick={() => handleTopicSelect(topic.id)}
                                                className={`px-4 py-1 rounded-full text-sm transition-all ${topic.selected ? "text-white bg-[#6941C6] hover:bg-[#56477b]" : "text-[#6941C6] hover:bg-[#D6BBFB] bg-[#F9F5FF] border border-purple-300"
                                                    }`}

                                                disabled={topicContinueClicked}
                                            >
                                                {topic.label}
                                            </button>
                                        ))}
                                    </div>
                                    {!topicContinueClicked && (
                                        <div className="flex justify-end mt-8 pr-4">
                                            <Button
                                                onClick={continueAfterTopics}
                                                className={`px-6 py-2 rounded-lg transition-all bg-gray-100 border border-gray-200 shadow-none text-[#101828] hover:bg-gray-200 hover:border-gray-300 hover:text-gray-500 focus:text-white`}

                                            >
                                                Continue
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}

                        {/* Market Selection */}
                        {message.content.includes("where would you like to focus") &&
                            (showMarketSelection || marketContinueClicked) && (
                                <div className="mt-4 space-y-3 fade-in-up">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMarkets.map((market) => (
                                            <button
                                                key={market.id}
                                                onClick={() => handleMarketSelect(market.id)}
                                                className={`px-4 py-1 rounded-full text-sm transition-all ${market.selected ? "text-white bg-[#6941C6] hover:bg-[#56477b]" : "text-[#6941C6] hover:bg-[#D6BBFB] bg-[#F9F5FF] border border-purple-300"
                                                    }`}
                                                disabled={marketContinueClicked}
                                            >
                                                {market.label}
                                            </button>
                                        ))}
                                    </div>
                                    {!marketContinueClicked && (
                                        <div className="flex justify-end mt-8 pr-4">
                                            <Button
                                                onClick={continueAfterMarkets}
                                                className={"px-6 py-2 rounded-lg transition-all bg-gray-100 border border-gray-200 shadow-none text-[#101828] hover:bg-gray-200 hover:border-gray-300 hover:text-gray-500 focus:text-white"}
                                            >
                                                Continue
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}

                        {/* Guardrails */}
                        {message.content.includes("ground rules") && showGuardrails && (
                            <div className="mt-4 space-y-3  fade-in-up">
                                <div className="space-y-3 text-sm max-w-[80%]">
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        No personal financial advice — only general information.
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">Clear, simple, everyday language.</div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        Conversations are consent-only, and private details are never stored.
                                    </div>
                                </div>
                                <div className="flex justify-end mt-8 pr-4">
                                    <Button
                                        onClick={continueAfterGuardrails}
                                        className={"px-6 py-2 rounded-lg transition-all bg-gray-100 border border-gray-200 shadow-none text-[#101828] hover:bg-gray-200 hover:border-gray-300 hover:text-gray-500 focus:text-white"}

                                    >
                                        Agree and Continue
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Focus Brief */}
                        {message.content.includes("Here's your Focus Brief") && showFocusBrief && (
                            <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4 fade-in-up">
                                <h3 className="text-2xl font-semibold text-[#6941C6]" >
                                    Focus Brief for {companyName || 'Your Brand'} Campaign Design
                                </h3>
                                <div className="space-y-3 text-sm font-normal" >
                                    <div className="pb-4 border-b border-gray-200">
                                        <strong>Topic:</strong> Financial Progress
                                    </div>
                                    <div className="pb-4 border-b border-gray-200">
                                        <strong>Pillars:</strong> Credit building, Home savings, Budgeting
                                    </div>
                                    <div className="pb-4 border-b border-gray-200"      >
                                        <strong>Markets:</strong> Atlanta, Phoenix, San Antonio
                                    </div>
                                    <div className="pb-4 border-b border-gray-200">
                                        <strong>Goals:</strong> Understand community priorities and shape a relevant campaign
                                    </div>
                                    <div className="pb-4 border-b border-gray-200">
                                        <strong>Safety:</strong> No personal advice, plain language, consent-only conversations
                                    </div>
                                    <div className="pb-4 border-b border-gray-200">
                                        <strong>Value to Communities:</strong> Micro-grants + coaching hours
                                    </div>
                                    <div className="pb-4 border-b border-gray-200">
                                        <strong>Budget:</strong> $50,000
                                    </div>
                                    <div className="pb-4 border-b border-gray-200">
                                        <strong>Files Uploaded:</strong> {fileCount} document{fileCount !== 1 ? 's' : ''}
                                    </div>
                                </div>
                                <Button
                                    onClick={handleSeeCommunities}
                                    className="w-full text-white py-3"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: "300",
                                        backgroundColor: "#0C111D",
                                        borderRadius: "8px",
                                    }}
                                >
                                    See 186 Groups →
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    )
}
