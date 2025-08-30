# Swiirl Connect

A modern mobile-first AI chat application that connects users with brand communities through intelligent conversations and personalized experiences.

## Overview

Swiirl Connect is an innovative platform that bridges the gap between consumers and brands through AI-powered chat interactions. The application features a comprehensive onboarding flow that captures user preferences and brand context to deliver highly personalized conversational experiences.

## Key Features

### 🚀 Smart Onboarding

- **User Profiling**: Collect detailed user information including job title, department, and company details
- **Brand Context**: Extract brand guidelines and identity from websites, social links, and uploaded documents
- **Personalization**: Build custom user profiles for tailored chat experiences

### 💬 AI-Powered Chat Interface

- **Interactive Conversations**: Engage with AI that understands your brand context and preferences
- **Topic Selection**: Choose from personalized conversation topics based on your interests
- **Market Insights**: Get relevant information about different market segments
- **Real-time Responses**: Experience smooth, typewriter-effect conversations with instant feedback

### 🎨 Modern Design

- **Mobile-First**: Optimized for mobile devices with responsive design
- **Clean UI**: Minimalist interface with Swiirl's signature purple branding
- **Smooth Animations**: Engaging micro-interactions and transitions
- **Accessibility**: Built with accessibility best practices and WCAG compliance

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui component library
- **Typography**: Inter font family with multiple weights
- **Animations**: Custom CSS animations with reduced motion support
- **TypeScript**: Full type safety throughout the application
- **Icons**: Hugeicons for modern, consistent iconography

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```b
├── app/
│   ├── page.tsx          # Onboarding flow (welcome, signup, brand context)
│   ├── chat/page.tsx     # Main chat interface
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles and design tokens
├── components/
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
│   └── useOnboarding.ts # Onboarding state management
├── lib/                 # Utility functions and configurations
└── public/              # Static assets
```

## Brand Identity

Swiirl Connect uses a carefully crafted design system featuring:

- **Primary Color**: Deep purple (#6941C6) for brand elements
- **Background**: Clean white (#FFFFFF) for optimal readability
- **Typography**: Inter font family for modern, professional appearance
- **Interactions**: Smooth animations and micro-interactions for enhanced UX

## Features

### Onboarding Flow

1. **Welcome Screen**: Introduction to Swiirl Connect
2. **User Profiling**: Personal and professional information collection
3. **Brand Context**: Website, social media, and document uploads
4. **Completion**: Ready to start chatting with AI

### Chat Interface

- Real-time messaging with AI brand assistant
- Typing indicators and smooth animations
- Mobile-optimized input and navigation
- Message history with timestamps

## Contributing

This project follows modern React and Next.js best practices. When contributing:

- Use TypeScript for all new code
- Follow the existing component patterns
- Maintain accessibility standards
- Test on mobile devices first
- Keep animations smooth and purposeful

---

Built with ❤️ for connecting brands and communities through intelligent conversations.
