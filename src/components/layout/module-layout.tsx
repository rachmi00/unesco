import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, Menu, X } from "lucide-react"; // Import the X icon
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ModuleLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  navigation?: React.ReactNode;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  showBackButton?: boolean;
  className?: string;
}

export function ModuleLayout({
  title,
  description,
  children,
  navigation,
  badge,
  showBackButton = true,
  className,
}: ModuleLayoutProps) {
  // State to control the mobile menu's open/closed status
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect to prevent body scrolling when the menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left side: Title, description, and optional back button */}
            <div className="flex min-w-0 items-center gap-3">
              {showBackButton && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back to Home</span>
                  </Link>
                </Button>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="truncate text-xl font-semibold text-foreground">
                    {title}
                  </h1>
                  {badge && (
                    <Badge variant={badge.variant || "default"}>{badge.text}</Badge>
                  )}
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>

            {/* Right side: Navigation actions */}
            <div className="flex items-center gap-2">
              {/* DESKTOP NAVIGATION: Visible on medium screens and up */}
              <div className="hidden md:flex md:items-center md:gap-2">
                {navigation}
                <Button variant="outline" size="icon" asChild>
                  <Link href="/">
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                  </Link>
                </Button>
              </div>

              {/* MOBILE HAMBURGER BUTTON: Visible only on small screens */}
              <div className="md:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* --- Custom Mobile Menu Implementation --- */}
      
      {/* OVERLAY: Dims the background when the menu is open */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden",
          isMobileMenuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0",
          "transition-opacity duration-300 ease-in-out"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* PANEL: The actual menu that slides in from the right */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-background p-4 md:hidden",
          "transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="font-semibold">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <nav className="mt-6 flex flex-col gap-4">
          {navigation}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            <Home className="mr-3 h-5 w-5" />
            Home
          </Link>
        </nav>
      </div>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}