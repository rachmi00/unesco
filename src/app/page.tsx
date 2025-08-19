"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Users, Shield, Target, Menu, X } from "lucide-react"

// Type definitions
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
}

// interface CardProps {
//   className?: string
//   children: React.ReactNode
// }

// interface BadgeProps {
//   variant?: "default" | "secondary" | "outline"
//   className?: string
//   children: React.ReactNode
// }

// interface LearningPathCardProps {
//   icon: React.ComponentType<{ className?: string }>
//   title: string
//   description: string
//   features: string[]
//   href: string
//   primary?: boolean
// }

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

// Helper function to combine class names
const cn = (...classes: (string | undefined | null | boolean)[]): string => classes.filter(Boolean).join(" ")

// Mock UI Components (to replace shadcn/ui imports)
const Button: React.FC<ButtonProps> = ({ variant = "default", size = "default", className, children, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-[#1b8ffb] text-white hover:bg-[#1b8ffb]/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  }

  const buttonClasses = cn(baseClasses, variants[variant], sizes[size], className)

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

// const Card: React.FC<CardProps> = ({ className, children }) => (
//   <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>{children}</div>
// )

// const CardHeader: React.FC<CardProps> = ({ className, children }) => (
//   <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>
// )

// const CardTitle: React.FC<CardProps> = ({ className, children }) => (
//   <h3 className={cn("font-semibold leading-none tracking-tight", className)}>{children}</h3>
// )

// const CardContent: React.FC<CardProps> = ({ className, children }) => (
//   <div className={cn("p-6 pt-0", className)}>{children}</div>
// )

// const Badge: React.FC<BadgeProps> = ({ variant = "default", className, children }) => {
//   const variants = {
//     default: "bg-primary text-primary-foreground",
//     secondary: "bg-secondary text-secondary-foreground",
//     outline: "text-foreground border",
//   }

//   return (
//     <div
//       className={cn(
//         "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
//         variants[variant],
//         className,
//       )}
//     >
//       {children}
//     </div>
//   )
// }

const LanguageSwitcher: React.FC = () => (
  <div className="flex items-center">
    <span className="text-black font-medium">EN</span>
    <span className="text-gray-400 font-medium">FR</span>
  </div>
)

// Header Component - Refined for design consistency
const AppHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
          <span className="font-bold text-sm tracking-[0.2em] text-black">CLEAN MEDIA</span>
        </Link>
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <span className="text-black font-medium">EN</span>
              <span className="text-gray-400 font-medium">FR</span>
            </div>
            <Link href="/learning-paths">
              <Button className="bg-transparent text-black font-medium hover:bg-gray-50 border-0 uppercase tracking-wide">
                START LEARNING
              </Button>
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border/40">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link href="/learning-paths" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Digital Citizenship
              </Button>
            </Link>
            <Link href="/learning-paths" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Adult & Professional
              </Button>
            </Link>
            <div className="border-t my-2"></div>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  )
}

// Hero Section Component - PIXEL PERFECT IMPLEMENTATION
const HeroSection: React.FC = () => (
  <section className="bg-white">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-left">
          <h1 className="text-[48px] lg:text-[64px] font-bold tracking-tight text-black leading-[0.9] mb-8">
            Empowering
            <br />
            digital citizens
            <br />
            for a kinder
            <br />
            world
          </h1>
          <p className="text-[18px] text-gray-600 leading-[1.6] mb-10 max-w-lg">
            Develop critical thinking skills to identify, analyze, and counter hate speech with interactive scenarios
            tailored to the Cameroonian context.
          </p>
          <Link href="/learning-paths">
            <Button
              size="lg"
              className="bg-[#1b8ffb] hover:bg-[#1b8ffb]/90 text-white text-[16px] font-medium h-12 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 lowercase"
            >
              start your journey
            </Button>
          </Link>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/loving.png"
            alt="Illustration of a person holding a heart"
            width={540}
            height={450}
            className="w-full h-auto max-w-lg"
            priority
          />
        </div>
      </div>
    </div>
  </section>
)

// Learning Paths Section Component - PIXEL PERFECT IMPLEMENTATION
const LearningPathsSection: React.FC = () => (
  <section className="py-20 sm:py-28 h-au">
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="flex justify-center mb-6">
          {/* Custom SVG icon matching the design */}
          <svg width="60" height="52" viewBox="0 0 60 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M42.5 12.5C42.5 18.9624 37.4624 24 31 24C24.5376 24 19.5 18.9624 19.5 12.5C19.5 6.03756 24.5376 1 31 1C37.4624 1 42.5 6.03756 42.5 12.5Z"
              stroke="#9CA3AF"
              strokeWidth="2"
            />
            <path d="M41 24L59 24" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
            <path d="M1 28L19 28" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M42.5 39.5C42.5 45.9624 37.4624 51 31 51C24.5376 51 19.5 45.9624 19.5 39.5C19.5 33.0376 24.5376 28 31 28C37.4624 28 42.5 33.0376 42.5 39.5Z"
              stroke="#9CA3AF"
              strokeWidth="2"
            />
          </svg>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-black mb-5">Choose Your Learning Path</h2>
        <p className="text-[24px] text-gray-600 leading-relaxed">
          We offer two distinct, age-appropriate modules designed to address hate speech in contexts relevant to your
          life
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Digital Citizenship Card */}
        <div className="bg-white rounded-xl border-2 border-l-[#1b8ffb] p-8 shadow-sm transition-shadow duration-300 flex flex-col">
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-black mb-2 hover:shadow-lg transition-shadow duration-300 ">Digital Citizenship</h3>
            <ul className="space-y-4 mb-8 mt-6 text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 mr-3 flex-shrink-0"></div>
                <span>Navigating WhatsApp & TikTok</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 mr-3 flex-shrink-0"></div>
                <span>Understanding online influence</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 mr-3 flex-shrink-0"></div>
                <span>Peer pressure and cyberbullying</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 mr-3 flex-shrink-0"></div>
                <span>Building positive online communities</span>
              </li>
            </ul>
          </div>
          <Link href="/teens" className="block mt-auto">
            <Button className="w-1/2 bg-[#1b8ffb] hover:bg-[#1b8ffb]/90 text-white font-semibold h-11 rounded-lg  transition-colors duration-300 lowercase">
              start this module
            </Button>
          </Link>
        </div>

        {/* Adult and Professional Card */}
        <div className="bg-white rounded-xl border-2 border-l-[#1b8ffb] p-8 shadow-sm transition-shadow duration-300 flex flex-col">
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-black mb-2">Adult and Professional MIL</h3>
            <ul className="space-y-4 mb-8 mt-6 text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 mr-3 flex-shrink-0"></div>
                <span>Adults and Young Adults</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 mr-3 flex-shrink-0"></div>
                <span>Workplace & Community Leadership</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 mr-3 flex-shrink-0"></div>
                <span>Hate speech in professional settings</span>
              </li>
            </ul>
          </div>
          <Link href="/adults" className="block mt-auto">
            <Button className="w-1/2 bg-[#1b8ffb] hover:bg-[#1b8ffb]/90 text-white font-semibold h-11 rounded-lg transition-colors duration-300 lowercase">
              start this module
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
)

// Feature Card Component - Refined
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="text-center p-8 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100">
    <div className="w-16 h-16 bg-[#1b8ffb]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
      <Icon className="w-8 h-8 text-[#1b8ffb]" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
)

// Why It Matters Section Component - Refined
const WhyItMattersSection: React.FC = () => (
  <section className="py-20 sm:py-28 bg-white">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">Why This Education Matters</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Media and Information Literacy is a cornerstone of peaceful, democratic societies. It equips citizens with the
          tools to build a more inclusive future.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={Target}
          title="Promote Critical Thinking"
          description="Move beyond surface-level information. Learn to deconstruct messages, identify biases, and evaluate the credibility of sources."
        />
        <FeatureCard
          icon={Shield}
          title="Strengthen Resilience"
          description="Build resilience against manipulation, propaganda, and disinformation that aim to divide communities and incite violence."
        />
        <FeatureCard
          icon={Users}
          title="Foster Inclusive Dialogue"
          description="Encourage respectful and constructive conversations, creating a foundation for understanding across different cultural and social groups."
        />
      </div>
    </div>
  </section>
)

// Footer Component - Refined
const AppFooter: React.FC = () => (
  <footer className="border-t border-gray-200 bg-gray-50">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span className="text-sm font-bold tracking-[0.2em] text-gray-900">CLEAN MEDIA</span>
        </div>
        <p className="max-w-md mx-auto text-gray-600 mb-8 leading-relaxed">
          Building a more informed and inclusive society through media literacy education.
        </p>
        <div className="flex justify-center gap-6 text-sm font-medium">
          <Link href="/privacy" className="text-gray-500 hover:text-[#1b8ffb] transition-colors">
            Privacy Policy
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/terms" className="text-gray-500 hover:text-[#1b8ffb] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  </footer>
)

// Main Component for the Homepage
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased">
      <AppHeader />
      <main>
        <HeroSection />
        <LearningPathsSection />
        <WhyItMattersSection />
      </main>
      <AppFooter />
    </div>
  )
}

export default HomePage