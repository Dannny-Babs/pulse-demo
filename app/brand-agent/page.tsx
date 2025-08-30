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
        role: "Brand voice for Central Bank",
        personality: "Friendly, knowledgeable, and empathetic financial advisor who speaks in clear, everyday language",
        avatar: "/image.png"
    }

    // State management
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState("")
    const [isListening, setIsListening] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [isStartingRecording, setIsStartingRecording] = useState(false)
    const [isPlaying, setIsPlaying] = useState<string | null>(null)
    const [transcription, setTranscription] = useState("")
    const [showPrivacyBar, setShowPrivacyBar] = useState(true)

    // Audio refs
    const audioRef = useRef<HTMLAudioElement>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])
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

    // Fake transcription for demo
    const fakeTranscribe = (ms = 600) => new Promise<string>(r =>
        setTimeout(() => r("Quick note: this is a fake transcript for the demo."), ms)
    )

    // Start voice recording
    const startRecording = async () => {
        if (!navigator.mediaDevices || !window.MediaRecorder) {
            alert("Voice recording not available in this browser.")
            return
        }

        setIsStartingRecording(true)
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaRecorderRef.current = new MediaRecorder(stream)
            audioChunksRef.current = []

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data)
            }

            mediaRecorderRef.current.onstop = () => {
                const mime = mediaRecorderRef.current!.mimeType || "audio/webm"
                const audioBlob = new Blob(audioChunksRef.current, { type: mime })
                handleAudioMessage(audioBlob)
                stream.getTracks().forEach(track => track.stop())
            }

            mediaRecorderRef.current.start()
            setIsRecording(true)
            setIsListening(true)
        } catch (error) {
            console.error("Error starting recording:", error)
        } finally {
            setIsStartingRecording(false)
        }
    }

    // Stop voice recording
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
            setIsListening(false)
        }
    }

    // Handle audio message
    const handleAudioMessage = async (audioBlob: Blob) => {
        // Simulate transcription (replace with actual Whisper API call)
        const simulatedTranscription = await fakeTranscribe()
        setTranscription(simulatedTranscription)

        // Create audio message
        const audioMessage: Message = {
            id: Date.now().toString(),
            type: "participant",
            content: simulatedTranscription,
            timestamp: new Date(),
            isAudio: true,
            audioUrl: URL.createObjectURL(audioBlob)
        }

        setMessages(prev => [...prev, audioMessage])

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: "agent",
                content: "I heard you say: '" + simulatedTranscription + "'. Let me respond to that...",
                timestamp: new Date(),
            }
            setMessages(prev => [...prev, aiResponse])
        }, 1000)
    }

    // Play audio message
    const playAudio = (audioUrl: string, messageId: string) => {
        if (audioRef.current) {
            audioRef.current.src = audioUrl
            audioRef.current.play()
            setIsPlaying(messageId)

            audioRef.current.onended = () => {
                setIsPlaying(null)
            }
        }
    }

    // Stop audio playback
    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            setIsPlaying(null)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="sticky top-0 bg-white md:left-6 left-2 px-4 py-2 flex justify-between items-center z-10 border-b border-gray-100">
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


                <HugeiconsIcon icon={MicIcon} size={24} strokeWidth={1.75} className="text-gray-600" onClick={startRecording} />

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


            <ChatInput
                onSendMessage={setInputMessage}
                disabled={isRecording || isStartingRecording || isRecording}
                fileCount={0}

            />



            {/* Listening Indicator Modal */}
            <AnimatePresence>
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        role="dialog"
                        aria-label="Voice recording in progress"
                    >
                        <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <HugeiconsIcon icon={MicIcon} className="w-10 h-10 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {agentPersona.name} is listening...
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Speak clearly into your microphone. I&apos;m here to help!
                            </p>
                            <Button
                                variant="destructive"
                                onClick={stopRecording}
                                className="w-full"
                            >
                                Stop Listening
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} className="hidden" />
        </div>
    )
}
