'use client'

import { useState, useRef, useEffect } from 'react'

interface ChatInputProps {
    onSendMessage: (message: string) => void
    disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
    const [inputMessage, setInputMessage] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSendMessage = () => {
        if (inputMessage.trim() && !disabled) {
            onSendMessage(inputMessage.trim())
            setInputMessage('')
            // Reset height after sending
            if (textareaRef.current) {
                textareaRef.current.style.height = '80px'
            }
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setInputMessage(value)

        // Auto-resize the textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            const scrollHeight = textareaRef.current.scrollHeight
            const newHeight = Math.min(Math.max(80, scrollHeight), 400)
            textareaRef.current.style.height = `${newHeight}px`
        }
    }

    return (
        <div className="sticky bottom-0 flex gap-2 px-4 pb-4 mx-auto w-full bg-background md:pb-6 md:max-w-3xl z-[1] border-t-0">
            <div className="flex relative flex-col gap-4 w-full">
                <form className="w-full overflow-hidden rounded-xl bg-background border-[1.5px] border-gray-200 shadow-xs transition-all duration-200 shadow-black/5 hover:border-primary/20 focus-within:border-primary/10 focus-within:shadow focus-within:shadow-primary/10">
                    <textarea
                        ref={textareaRef}
                        className="flex min-h-[80px] border border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full rounded-none border-none p-3  outline-none ring-0 field-sizing-fixed bg-transparent dark:bg-transparent focus-visible:ring-0 text-sm resize-none py-1 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        name="message"
                        placeholder="Send a message..."
                        data-testid="multimodal-input"
                        rows={1}
                        style={{ height: '80px', minHeight: '80px', maxHeight: '200px' }}
                        value={inputMessage}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={disabled}
                    />
                    <div className="flex items-center justify-between p-1 px-2 py-1">
                        <div className="flex items-center [&_button:first-child]:rounded-bl-xl gap-2">
                            <p className="text-sm text-gray-500">
                                4/5 Attachments
                            </p>
                        </div>
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 px-3 gap-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground size-8"
                            type="submit"
                            disabled={!inputMessage.trim() || disabled}
                            onClick={handleSendMessage}
                            aria-label="Send message"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send size-4">
                                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                                <path d="m21.854 2.147-10.94 10.939"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
