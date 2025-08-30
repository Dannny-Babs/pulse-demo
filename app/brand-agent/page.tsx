"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { MicIcon, SentIcon, AudioWave01Icon, ArrowLeftIcon } from "@hugeicons/core-free-icons"
import { motion, AnimatePresence } from "framer-motion"
import { useBrandData } from "@/lib/hooks/useBrandData"

interface Message {
    id: string
    type: "agent" | "participant"
    content: string
    timestamp: Date
    isAudio?: boolean
    audioUrl?: string
}

interface AgentPersona {
    name: string
    role: string
    personality: string
    avatar: string
}

export default function BrandAgentPage() {
    const { companyName } = useBrandData()

    // Agent persona - updated to match the screenshot
    const agentPersona: AgentPersona = {
        name: "Molly Hill",
        role: `Brand voice for ${companyName || 'Swiirl'}`,
        personality: "Friendly, knowledgeable, and empathetic financial advisor who speaks in clear, everyday language. She's passionate about helping people feel confident about their financial decisions and loves sharing insights from real community conversations.",
        avatar: "/image.png"
    }

    // State management
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState("")
    const [isListening, setIsListening] = useState(false)

    // Refs
    const bottomRef = useRef<HTMLDivElement>(null)

    // Initialize with sample conversation to match the screenshot
    useEffect(() => {
        const sampleMessages: Message[] = [
            {
                id: "1",
                type: "participant",
                content: "I want to buy a home, but I'm not entirely ready yet...",
                timestamp: new Date(),
                isAudio: true
            },
            {
                id: "2",
                type: "agent",
                content: "That's a huge step! I've talked to so many people who feel exactly the same way. What's making you feel not quite ready?",
                timestamp: new Date()
            },
            {
                id: "3",
                type: "participant",
                content: "The interest rates are too high, I'm waiting for them to drop below 5% ",
                timestamp: new Date(),
                isAudio: true
            },
            {
                id: "4",
                type: "agent",
                content: "That's a huge step! I've talked to so many people who feel exactly the same way. What's making you feel not quite ready?",
                timestamp: new Date()
            }
        ]
        setMessages(sampleMessages)
    }, [])

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Handle text message submission
    const handleSendMessage = () => {
        if (!inputMessage.trim()) return

        const participantMessage: Message = {
            id: Date.now().toString(),
            type: "participant",
            content: inputMessage,
            timestamp: new Date(),
        }

        setMessages(prev => [...prev, participantMessage])
        setInputMessage("")

        // Simulate AI response with typing indicator
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: "agent",
                content: generateAIResponse(inputMessage),
                timestamp: new Date(),
            }
            setMessages(prev => [...prev, aiResponse])

            // Sometimes add a follow-up question to keep conversation flowing
            if (Math.random() > 0.6) {
                setTimeout(() => {
                    const followUp: Message = {
                        id: (Date.now() + 2).toString(),
                        type: "agent",
                        content: generateFollowUpQuestion(inputMessage),
                        timestamp: new Date(),
                    }
                    setMessages(prev => [...prev, followUp])
                }, 2000)
            }
        }, 1000)
    }

    // Generate AI response based on input
    const generateAIResponse = (input: string): string => {
        const lowerInput = input.toLowerCase()

        // Context-aware responses based on user input
        if (lowerInput.includes('home') || lowerInput.includes('house') || lowerInput.includes('buy')) {
            const homeResponses = [
                "That's a huge step! I've talked to so many people who feel exactly the same way. What's making you feel not quite ready?",
                "I hear this a lot from our community. Many people think they need perfect credit or a huge down payment, but there are actually several paths to homeownership.",
                "This is exactly what I'm here to help with! I've learned from our conversations that people often underestimate what they can actually afford. What's your biggest concern?"
            ]
            return homeResponses[Math.floor(Math.random() * homeResponses.length)]
        }

        if (lowerInput.includes('credit') || lowerInput.includes('score') || lowerInput.includes('debt')) {
            const creditResponses = [
                "Credit can feel like this mysterious thing, right? I've found that most people just need to understand the basics. What's your current situation?",
                "This is such a common concern! I've talked to people who thought they'd never qualify, but there are actually some great starter options.",
                "You're not alone in feeling this way. From our community conversations, I've learned that building credit is more about consistency than perfection."
            ]
            return creditResponses[Math.floor(Math.random() * creditResponses.length)]
        }

        if (lowerInput.includes('budget') || lowerInput.includes('money') || lowerInput.includes('save')) {
            const budgetResponses = [
                "Budgeting can feel overwhelming at first, but I've learned from our community that small changes add up fast. What's your biggest challenge?",
                "This is exactly what I'm passionate about! I've seen people transform their financial situation with just a few simple strategies.",
                "You're asking the right questions! I've found that successful budgeters focus on their 'why' rather than just the numbers."
            ]
            return budgetResponses[Math.floor(Math.random() * budgetResponses.length)]
        }

        if (lowerInput.includes('ready') || lowerInput.includes('prepared') || lowerInput.includes('start')) {
            const readyResponses = [
                "I love that you're thinking about this! Many people wait for the 'perfect' moment, but I've learned that starting small is often the best approach.",
                "This mindset is exactly what I see in successful people! They don't wait for everything to be perfect - they start where they are.",
                "You're already ahead of the game by asking these questions! I've found that the people who succeed are the ones who prepare before they're ready."
            ]
            return readyResponses[Math.floor(Math.random() * readyResponses.length)]
        }

        // General conversational responses
        const generalResponses = [
            "That's really insightful! I've been having similar conversations with people in our community. What made you think about this?",
            "I appreciate you sharing that. It helps me understand what people are really going through. Can you tell me more?",
            "This is exactly the kind of real talk I'm here for. I've learned so much from listening to people's actual experiences.",
            "That's a great point. I've noticed that people often feel this way, but there are usually some practical steps we can take.",
            "I'm glad you brought this up. It's something I hear a lot, and I think there are some helpful perspectives I can share."
        ]
        return generalResponses[Math.floor(Math.random() * generalResponses.length)]
    }

    // Generate follow-up questions to keep conversation flowing
    const generateFollowUpQuestion = (input: string): string => {
        const lowerInput = input.toLowerCase()

        if (lowerInput.includes('home') || lowerInput.includes('house')) {
            const homeQuestions = [
                "What's your biggest concern about being ready?",
                "Have you thought about what kind of home you're looking for?",
                "What would make you feel more confident about taking this step?"
            ]
            return homeQuestions[Math.floor(Math.random() * homeQuestions.length)]
        }

        if (lowerInput.includes('credit') || lowerInput.includes('debt')) {
            const creditQuestions = [
                "What's your current credit situation like?",
                "Have you tried any credit-building strategies before?",
                "What's the biggest obstacle you're facing with credit?"
            ]
            return creditQuestions[Math.floor(Math.random() * creditQuestions.length)]
        }

        if (lowerInput.includes('budget') || lowerInput.includes('money')) {
            const budgetQuestions = [
                "What's your biggest challenge with budgeting?",
                "Have you tried any budgeting apps or methods?",
                "What would success look like for you financially?"
            ]
            return budgetQuestions[Math.floor(Math.random() * budgetQuestions.length)]
        }

        // General follow-up questions
        const generalQuestions = [
            "Can you tell me more about that?",
            "What's your biggest concern right now?",
            "How do you feel about taking the next step?",
            "What would be most helpful for you to know?"
        ]
        return generalQuestions[Math.floor(Math.random() * generalQuestions.length)]
    }

    // NOTE: For production, you'll need to integrate these APIs:
    // - Whisper API for voice transcription
    // - ElevenLabs TTS for AI voice responses
    // - Your own AI backend for generating responses

    // Demo mode - no actual recording, just shows the listening UI
    const showListeningModal = () => {
        setIsListening(true)
        // No auto-hide - user must close manually
    }



    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="sticky top-0 bg-white md:left-6 left-2 px-4 py-2 flex justify-between items-center shadow shadow-gray-100/50 z-10 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="flex items-center  gap-2">
                        <HugeiconsIcon icon={ArrowLeftIcon} size={24} strokeWidth={2.5} className="text-gray-600" />
                        <Image src="/avatar.png" alt="Molly Hill Avatar" width={45} height={45} priority />
                    </Link>
                    <div className="flex flex-col ">
                        <div className="flex items-center gap-2">
                            <h4 className="text-gray-900 text-lg font-semibold">{agentPersona.name}</h4>
                            <span>
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">{agentPersona.role}</p>
                    </div>
                </div>


                <HugeiconsIcon icon={MicIcon} size={24} strokeWidth={1.75} className="text-gray-600" onClick={showListeningModal} />

            </header>

            <div className="flex-1 px-4 pt-4 pb-32 space-y-4 max-w-4xl mx-auto overflow-y-auto">
                <AnimatePresence>
                    {messages.map((message, index) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ type: "spring", stiffness: 150, damping: 20, delay: index * 0.05 }}
                            className={`flex ${message.type === "participant" ? "justify-start" : "justify-end"}`}
                        >
                            <div className="max-w-[80%]">
                                {/* Message Header for participant messages */}
                                {message.type === "participant" && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-gray-900 text-sm">Anonymous participant</span>
                                        {message.isAudio && (
                                            <HugeiconsIcon icon={AudioWave01Icon} size={20} className=" text-gray-600" />
                                        )}
                                    </div>
                                )}

                                {/* Message Header for agent messages */}
                                {message.type === "agent" && (
                                    <div className="flex items-center gap-2 mb-2 justify-end">
                                        <div className="flex items-center gap-1">
                                            <HugeiconsIcon icon={AudioWave01Icon} size={20} className=" text-gray-600" />
                                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs font-semibold">S</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{agentPersona.name}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div className={`px-4 py-3 ${message.type === "agent"
                                    ? "bg-purple-50 border border-gray-200 rounded-b-2xl rounded-tl-2xl "
                                    : "bg-white border border-gray-200 rounded-b-2xl rounded-tr-2xl"
                                    }`}>
                                    <p className="text-gray-900">{message.content}</p>


                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Bottom ref for auto-scroll */}
                <div ref={bottomRef} />

                {/* Suggested conversation starters */}
                {messages.length === 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-medium text-gray-600">A</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-1">Anonymous Member</p>
                                <p className="text-sm text-gray-900">&ldquo;The interest rates are too high, I&apos;m waiting for them to drop below 5%&rdquo;</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>


            {/* Custom Chat Input */}
            <div className="sticky bottom-0 flex gap-2 px-4 pb-4 mx-auto w-full bg-background md:pb-6 md:max-w-2xl z-[1] border-t-0">
                <div className="flex relative flex-col gap-4 w-full">
                    <form className="w-full overflow-hidden rounded-xl bg-background border-[1.5px] border-gray-200 shadow-xs transition-all duration-200 shadow-black/5 hover:border-primary/20 focus-within:border-primary/10 focus-within:shadow focus-within:shadow-primary/10">
                        <textarea
                            className="flex min-h-[60px] border border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full rounded-none border-none p-3 outline-none ring-0 field-sizing-fixed bg-transparent dark:bg-transparent focus-visible:ring-0 text-sm resize-none py-1 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                            name="message"
                            placeholder="Send a message..."
                            rows={1}
                            style={{ height: '60px', minHeight: '60px', maxHeight: '200px' }}
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSendMessage()
                                }
                            }}
                        />
                        <div className="flex items-center justify-between p-1 px-2 py-1">
                            <div className="flex items-center [&_button:first-child]:rounded-bl-xl gap-2">

                                <HugeiconsIcon icon={MicIcon} size={20} strokeWidth={1.75} className="text-gray-600" onClick={showListeningModal} />

                            </div>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 px-3 gap-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground size-8"
                                type="submit"
                                disabled={!inputMessage.trim()}
                                aria-label="Send message"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleSendMessage()
                                }}
                            >
                                <HugeiconsIcon icon={SentIcon} className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>


            {/* Listening Indicator Modal - Responsive (Bottom Sheet on Mobile, Center Modal on Desktop) */}
            <AnimatePresence>
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        role="dialog"
                        aria-label="Voice recording in progress"
                    >
                        {/* Mobile: Bottom Sheet */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-8 text-center max-w-sm mx-auto md:hidden"
                        >
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                                <HugeiconsIcon icon={MicIcon} className="w-10 h-10 text-purple-600 z-10" />
                                {/* Wave pulse rings */}
                                <div className="absolute inset-0 rounded-full border-2 border-purple-300 animate-ping"></div>
                                <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                                <div className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping" style={{ animationDelay: '1s' }}></div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {agentPersona.name} is listening...
                            </h3>
                            <p className="text-gray-600 mb-6">
                                This is a demo mode. In production, this would use voice recording and transcription.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setIsListening(false)}
                                className="w-full"
                            >
                                Got it
                            </Button>
                        </motion.div>

                        {/* Desktop: Center Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="hidden md:flex items-center justify-center h-full"
                        >
                            <div className="bg-white rounded-2xl p-4 text-center max-w-sm mx-4 shadow-2xl">
                                <div className="w-28 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                                    <HugeiconsIcon icon={MicIcon} className="w-10 h-10 text-purple-600 z-10" />
                                    {/* Wave pulse rings */}
                                    <div className="absolute inset-0 rounded-full border-2 border-purple-300 animate-ping" style={{ animationDelay: '2s' }}></div>
                                    <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping" style={{ animationDelay: '4s' }}></div>
                                    <div className="absolute inset-0 rounded-full border-2 border-purple-300 animate-ping" style={{ animationDelay: '8s' }}></div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {agentPersona.name} is listening...
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    This is a demo mode. In production, this would use voice recording and transcription.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsListening(false)}
                                    className="w-full"
                                >
                                    Got it
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    )
}
