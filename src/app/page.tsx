"use client"

import React, { useState } from 'react'
import { Users, BookOpen, Globe, Shield, Target, CheckCircle, ArrowRight, Menu, X, LucideIcon } from "lucide-react"
import Link from 'next/link'

// Type definitions
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  children: React.ReactNode
}

interface CardProps {
  className?: string
  children: React.ReactNode
}

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'outline'
  className?: string
  children: React.ReactNode
}

interface ImpactStatProps {
  value: string
  label: string
}

interface LearningPathCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  href: string
  primary?: boolean
}

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

// Helper function to combine class names
const cn = (...classes: (string | undefined | null | boolean)[]): string => 
  classes.filter(Boolean).join(' ')

// Mock UI Components (to replace shadcn/ui imports)
const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  size = 'default', 
  className, 
  children, 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
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

  const buttonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  )

  return <button className={buttonClasses} {...props}>{children}</button>
}

const Card: React.FC<CardProps> = ({ className, children }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
    {children}
  </div>
)

const CardHeader: React.FC<CardProps> = ({ className, children }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
    {children}
  </div>
)

const CardTitle: React.FC<CardProps> = ({ className, children }) => (
  <h3 className={cn("font-semibold leading-none tracking-tight", className)}>
    {children}
  </h3>
)

const CardContent: React.FC<CardProps> = ({ className, children }) => (
  <div className={cn("p-6 pt-0", className)}>
    {children}
  </div>
)

const Badge: React.FC<BadgeProps> = ({ variant = 'default', className, children }) => {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "text-foreground border"
  }
  
  return (
    <div className={cn(
      "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", 
      variants[variant], 
      className
    )}>
      {children}
    </div>
  )
}


// const ProgressDashboard: React.FC = () => (
//   <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
//     <h3 className="text-2xl font-bold text-foreground mb-4">Your Progress Dashboard</h3>
//     <p className="text-muted-foreground mb-6">Track your learning journey and see how far you&apos;ve come.</p>
//     <div className="bg-background rounded-lg p-6 shadow-md border">
//       <div className="flex items-center justify-between mb-4">
//         <span className="font-medium">Overall Completion</span>
//         <span className="font-bold text-primary">42%</span>
//       </div>
//       <div className="w-full bg-secondary rounded-full h-2.5">
//         <div className="bg-primary h-2.5 rounded-full" style={{width: "42%"}}></div>
//       </div>
//     </div>
//   </div>
// )

const LanguageSwitcher: React.FC = () => (
  <div className="flex items-center">
    <Button variant="ghost" size="sm">EN</Button>
    <div className="w-px h-5 bg-border mx-1"></div>
    <Button variant="ghost" size="sm" className="text-muted-foreground">FR</Button>
  </div>
)

// Header Component
const AppHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="hidden font-bold sm:inline-block">Clean Media</span>
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="hidden lg:flex items-center gap-2">
            <a href="/teens"><Button variant="ghost">For Teens</Button></a>
            <a href="/adults"><Button variant="ghost">For Adults</Button></a>
            <a href="/teens"><Button>Start Learning</Button></a>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border/40">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <a href="/teens" className="block"><Button variant="ghost" className="w-full justify-start">For Teens</Button></a>
            <a href="/adults" className="block"><Button variant="ghost" className="w-full justify-start">For Adults</Button></a>
            <a href="/teens" className="block"><Button className="w-full">Start Learning</Button></a>
          </div>
        </div>
      )}
    </header>
  )
}

// Impact Stat Component
const ImpactStat: React.FC<ImpactStatProps> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{value}</p>
    <p className="mt-1 text-sm text-muted-foreground font-medium">{label}</p>
  </div>
)

// Hero Section Component
const HeroSection: React.FC = () => (
  <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
    <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium mb-6 shadow-sm">
        <Globe className="w-4 h-4 mr-2" />
        An Initiative to Combat Hate Speech
      </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
        Empowering Digital Citizens
        <span className="mt-2 block bg-gradient-to-r from-primary via-blue-500 to-teal-400 bg-clip-text text-transparent">
          for a Kinder World
        </span>
      </h1>
      <p className="mt-8 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl leading-relaxed">
        Develop critical thinking skills to identify, analyze, and counter hate speech with interactive scenarios tailored to the Cameroonian context.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/teens">
          <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-primary/30 transition-shadow">
            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </a>
        <a href="/adults">
          <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 font-semibold">
            Explore Case Studies
          </Button>
        </a>
      </div>
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <ImpactStat value="50+" label="Real-world Scenarios" />
        <ImpactStat value="10" label="Regions Represented" />
        <ImpactStat value="2" label="Official Languages" />
        <ImpactStat value="1000s" label="Community Members" />
      </div>
    </div>
  </section>
)

// Learning Path Card Component
const LearningPathCard: React.FC<LearningPathCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  href, 
  primary = false 
}) => (
  <Card className="group relative flex flex-col overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out">
    <div className={`absolute top-0 left-0 h-1 w-full ${primary ? 'bg-primary/60' : 'bg-slate-300/60'}`}></div>
    <CardHeader>
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <CardTitle className="text-2xl font-bold text-foreground">{title}</CardTitle>
      <p className="text-muted-foreground pt-1">{description}</p>
    </CardHeader>
    <CardContent className="flex flex-col flex-grow justify-between">
      <ul className="space-y-3 mb-8">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      <a href={href} className="mt-auto">
        <Button size="lg" variant={primary ? 'default' : 'secondary'} className="w-full text-base font-semibold py-6">
          {primary ? 'Start Teen Module' : 'Start Adult Module'}
        </Button>
      </a>
    </CardContent>
  </Card>
)

// Learning Paths Section Component
const LearningPathsSection: React.FC = () => (
  <section className="py-20 sm:py-28 bg-background">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Choose Your Learning Path</h2>
        <p className="mt-6 text-lg text-muted-foreground">
          We offer two distinct, age-appropriate modules designed to address hate speech in contexts relevant to your life.
        </p>
      </div>
      <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <LearningPathCard
          icon={Users}
          title="Teen Digital Citizenship"
          description="Ages 13-19 • Social Media & Peer Interactions"
          features={[
            "Navigating WhatsApp & TikTok",
            "Understanding online influence",
            "Peer pressure and cyberbullying",
            "Building positive online communities",
          ]}
          href="/teens"
          primary
        />
        <LearningPathCard
          icon={BookOpen}
          title="Adult & Professional MIL"
          description="Ages 20+ • Workplace & Community Leadership"
          features={[
            "Hate speech in professional settings",
            "Media bias and political discourse",
            "Legal frameworks and responsibilities",
            "Strategies for community dialogue",
          ]}
          href="/adults"
        />
      </div>
    </div>
  </section>
)

// Feature Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="text-center p-6 rounded-2xl transition-all duration-300 hover:bg-background hover:shadow-xl">
    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
)

// Why It Matters Section Component
const WhyItMattersSection: React.FC = () => (
  <section className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/50">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Why This Education Matters</h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Media and Information Literacy is a cornerstone of peaceful, democratic societies. It equips citizens with the tools to build a more inclusive future.
        </p>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
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

// Footer Component
const AppFooter: React.FC = () => (
  <footer className="border-t border-border/40 bg-background">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">MIL Cameroon</span>
        </div>
        <p className="max-w-md mx-auto text-muted-foreground mb-6">
          Building a more informed and inclusive society through media literacy education.
        </p>
        <div className="flex justify-center gap-4 text-sm font-medium">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
          <span className="text-muted-foreground/50">|</span>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
)

// Main Component for the Homepage
const HomePage: React.FC = () => {
  return (
  <div className="min-h-screen bg-background text-foreground antialiased" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif' }}>
      <AppHeader />
          {/* <span className="hidden font-bold sm:inline-block">abetter one</span>
          <span className="text-lg font-semibold text-foreground">abetter one</span> */}
      <main>
        <HeroSection />
        <div className="bg-slate-50 dark:bg-slate-900/50 py-12 sm:py-16">
          {/* <ProgressDashboard /> */}
        </div>
        <LearningPathsSection />
        <WhyItMattersSection />
      </main>
      <AppFooter />
    </div>
  )
}

export default HomePage