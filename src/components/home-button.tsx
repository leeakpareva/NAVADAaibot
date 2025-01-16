"use client";

import Link from "next/link";

export function HomeButton() {
  return (
    <Link
      href="/"
      className="fixed bottom-6 right-6 p-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-full shadow-lg backdrop-blur-sm border border-white/10 transition-all duration-300 z-50 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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
    </Link>
  );
} 