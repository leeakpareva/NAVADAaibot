"use client";

import { DigitalClock } from "@/components/digital-clock";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-foreground tracking-tight hover:text-primary/90 transition-colors">
            NAVADA
          </Link>
          <DigitalClock />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Meet NAVADA AI Section */}
          <section className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Meet NAVADA AI</h1>
            <div className="prose prose-invert max-w-none">
              <blockquote className="text-xl text-muted-foreground border-l-4 border-primary/50 pl-6 py-4 italic">
                Hey there! I'm NAVADA, your friendly AI-powered financial guru. Need to track the latest stock prices? Want to impress your friends with your insider market knowledge? Or maybe you just want to know if Tesla's stock is still going to the moon 🚀—I've got you covered!
                <br /><br />
                I'm here to make financial jargon less boring, stock charts more fun, and your investment decisions a whole lot smarter. Ask me anything about the markets, and I'll deliver insights faster than you can say 'buy low, sell high!' Let's make your financial game smarter, sharper, and dare I say—cooler. 😎
              </blockquote>
            </div>
          </section>

          {/* Power Behind the Bot Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Power Behind the Bot</h2>
            <p className="text-lg text-muted-foreground">
              NAVADA AI leverages the best in API technology to ensure accuracy, speed, and reliability:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-2xl bg-secondary/5 border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Groq Labs API</h3>
                <p className="text-muted-foreground">
                  Provides real-time stock data and market trends, ensuring you're always in the know with the most up-to-date insights.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-secondary/5 border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Vantage API</h3>
                <p className="text-muted-foreground">
                  Adds depth with historical data, financial indicators, and advanced analytics, giving you a complete view of the markets for smarter decision-making.
                </p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              Together, these APIs make NAVADA AI a powerhouse of financial knowledge, blending speed with precision.
            </p>
          </section>

          {/* Creator Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">The Creator</h2>
            <p className="text-xl text-muted-foreground">
              Designed + Coded by Lee Akpareva, MBA, MA
            </p>
            <p className="text-lg text-muted-foreground italic">
              Where technology meets style, intelligence, and a dash of humor.
            </p>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-colors"
            >
              Explore NAVADA AI Now 🚀
            </Link>
          </section>
        </div>
      </main>

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
  );
} 