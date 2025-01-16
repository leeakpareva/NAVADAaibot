import { QuickActions } from "@/components/quick-actions";
import { MessageInput } from "@/components/message-input";
import HeroSection from "@/components/hero-section";
import { DigitalClock } from "@/components/digital-clock";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground tracking-tight hover:text-primary/90 transition-colors">NAVADA</h1>
          <DigitalClock />
        </div>
      </header>

      {/* Hero Section with Spline */}
      <div className="h-screen">
        <HeroSection />
      </div>

      {/* Main Content */}
      <div className="relative z-10 bg-gradient-to-b from-background to-background/95">
        {/* Quick Actions */}
        <section className="py-8 px-6">
          <div className="container mx-auto">
            <QuickActions />
          </div>
        </section>

        {/* Message Input */}
        <section className="py-8 px-6 bg-secondary/5">
          <div className="container mx-auto max-w-3xl">
            <MessageInput />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 bg-background/60 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm text-muted-foreground order-2 md:order-1">
                © 2024 NAVADA AI BOT. All rights reserved. Designed + Coded by <a href="https://github.com/leeak" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Lee</a>
              </p>
              <div className="flex gap-8 order-1 md:order-2">
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:scale-110 transition-transform duration-300"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Home
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
