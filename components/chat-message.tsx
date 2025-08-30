'use client'

import Image from "next/image"

interface ChatMessageProps {
    id: string
    type: "swiirl" | "brand"
    content: string
    isTyping?: boolean
}

export function ChatMessage({  type, content, isTyping }: ChatMessageProps) {
    const isUser = type === "brand"
    const isAssistant = type === "swiirl"

    return (
        <div
            className={`flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:w-fit ${isUser ? 'ml-auto max-w-2xl w-fit' : ''}`}
            data-role={isUser ? 'user' : 'assistant'}
        >
            {/* Avatar */}
            <div className="flex justify-center items-center rounded-full ring-1 size-8 shrink-0 ring-border bg-background">
                <div className="translate-y-px">
                    {isAssistant ? (
                        <Image src="/image.png" alt="S" width={14} height={14} className="w-3.5 h-3.5" />
                    ) : (
                        <svg height="14" strokeLinejoin="round" viewBox="0 0 16 16" width="14" style={{ color: 'currentcolor' }}>
                            <path d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z" fill="currentColor"></path>
                            <path d="M14.5 4.5V5H13.5V4.5C13.5 3.94772 13.0523 3.5 12.5 3.5H12V3V2.5H12.5C13.0523 2.5 13.5 2.05228 13.5 1.5V1H14H14.5V1.5C14.5 2.05228 14.9477 2.5 15.5 2.5H16V3V3.5H15.5C14.9477 3.5 14.5 3.94772 14.5 4.5Z" fill="currentColor"></path>
                            <path d="M8.40706 4.92939L8.5 4H9.5L9.59294 4.92939C9.82973 7.29734 11.7027 9.17027 14.0706 9.40706L15 9.5V10.5L14.0706 10.5929C11.7027 10.8297 9.82973 12.7027 9.59294 15.0706L9.5 16H8.5L8.40706 15.0706C8.17027 12.7027 6.29734 10.8297 3.92939 10.5929L3 10.5V9.5L3.92939 9.40706C6.29734 9.17027 8.17027 7.29734 8.40706 4.92939Z" fill="currentColor"></path>
                        </svg>
                    )}
                </div>
            </div>

            {/* Message Content */}
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-row gap-2 items-start">
                    <div
                        className={`flex flex-col gap-2 overflow-hidden rounded-lg px-4 py-3 text-foreground text-sm group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground is-user:dark justify-start items-start text-left bg-transparent ${isUser ? 'is-user bg-primary text-primary-foreground' : 'is-assistant bg-secondary text-foreground'}`}
                        data-testid="message-content"
                    >
                        <div className="space-y-4 size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                            <p>
                                {content}
                                {isTyping && <span className="cursor ml-1 animate-pulse">|</span>}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent rounded-md size-9 p-1.5 text-muted-foreground hover:text-foreground relative"
                        type="button"
                        data-state="closed"
                        aria-label="Copy message"
                    >
                        <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: 'currentcolor' }}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z" fill="currentColor"></path>
                        </svg>
                        <span className="sr-only">Copy</span>
                    </button>

                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent rounded-md size-9 p-1.5 text-muted-foreground hover:text-foreground relative"
                        type="button"
                        data-testid="message-upvote"
                        data-state="closed"
                        aria-label="Upvote response"
                    >
                        <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: 'currentcolor' }}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.89531 2.23972C6.72984 2.12153 6.5 2.23981 6.5 2.44315V5.25001C6.5 6.21651 5.7165 7.00001 4.75 7.00001H2.5V13.5H12.1884C12.762 13.5 13.262 13.1096 13.4011 12.5532L14.4011 8.55318C14.5984 7.76425 14.0017 7.00001 13.1884 7.00001H9.25H8.5V6.25001V3.51458C8.5 3.43384 8.46101 3.35807 8.39531 3.31114L6.89531 2.23972ZM5 2.44315C5 1.01975 6.6089 0.191779 7.76717 1.01912L9.26717 2.09054C9.72706 2.41904 10 2.94941 10 3.51458V5.50001H13.1884C14.9775 5.50001 16.2903 7.18133 15.8563 8.91698L14.8563 12.917C14.5503 14.1412 13.4503 15 12.1884 15H1.75H1V14.25V6.25001V5.50001H1.75H4.75C4.88807 5.50001 5 5.38808 5 5.25001V2.44315Z" fill="currentColor"></path>
                        </svg>
                        <span className="sr-only">Upvote Response</span>
                    </button>

                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent rounded-md size-9 p-1.5 text-muted-foreground hover:text-foreground relative"
                        type="button"
                        data-testid="message-downvote"
                        data-state="closed"
                        aria-label="Downvote response"
                    >
                        <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: 'currentcolor' }}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.89531 13.7603C6.72984 13.8785 6.5 13.7602 6.5 13.5569V10.75C6.5 9.7835 5.7165 9 4.75 9H2.5V2.5H12.1884C12.762 2.5 13.262 2.89037 13.4011 3.44683L14.4011 7.44683C14.5984 8.23576 14.0017 9 13.1884 9H9.25H8.5V9.75V12.4854C8.5 12.5662 8.46101 12.6419 8.39531 12.6889L6.89531 13.7603ZM5 13.5569C5 14.9803 6.6089 15.8082 7.76717 14.9809L9.26717 13.9095C9.72706 13.581 10 13.0506 10 12.4854V10.5H13.1884C14.9775 10.5 16.2903 8.81868 15.8563 7.08303L14.8563 3.08303C14.5503 1.85882 13.4503 1 12.1884 1H1.75H1V1.75V9.75V10.5H1.75H4.75C4.88807 10.5 5 10.6119 5 10.75V13.5569Z" fill="currentColor"></path>
                        </svg>
                        <span className="sr-only">Downvote Response</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
