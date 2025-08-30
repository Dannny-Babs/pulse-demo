"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu02Icon, MicIcon, MicOffIcon, VolumeHighIcon, VolumeOffIcon, SentIcon, VideoOffIcon, PhoneOffIcon, MoreVerticalIcon, AudioWave01Icon, ArrowLeftIcon, Message01Icon } from "@hugeicons/core-free-icons"
import { motion, AnimatePresence } from "framer-motion"
import { useBrandData } from "@/lib/hooks/useBrandData"
import { ChatInput } from "@/components/chat-input"

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
    const router = useRouter()
    const { companyName } = useBrandData()

    // Agent persona - updated to match the screenshot
    const agentPersona: AgentPersona = {
        name: "Mollie Hall",
        role: `Brand voice for ${companyName || 'Swiirl'}`,
        personality: "Friendly, knowledgeable, and empathetic financial advisor who speaks in clear, everyday language",
        avatar: "/image.png"
    }

    // State management
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState("")
    const [isListening, setIsListening] = useState(false)
    const [showPrivacyBar, setShowPrivacyBar] = useState(true)

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
                content: "Would you be open to sharing why you don't feel ready?",
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

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: "agent",
                content: generateAIResponse(inputMessage),
                timestamp: new Date(),
            }
            setMessages(prev => [...prev, aiResponse])
        }, 1000)
    }

    // Generate AI response based on input
    const generateAIResponse = (input: string): string => {
        const responses = [
            "That's a great question! Let me share what I've learned from our community conversations...",
            "I'm glad you asked about that. Based on our research, people often feel...",
            "That's exactly the kind of insight we're looking for. From what I've observed...",
            "Interesting perspective! This reminds me of a conversation I had with someone who...",
            "You're touching on something really important here. Let me break this down..."
        ]
        return responses[Math.floor(Math.random() * responses.length)]
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
                        <Image src="/avatar.png" alt="Mollie Hall Avatar" width={45} height={45} priority />
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
