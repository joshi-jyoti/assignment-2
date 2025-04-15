"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function Hero({ scrollY }) {
  const parallaxRef = useRef(null)

  useEffect(() => {
    if (parallaxRef.current) {
      const translateY = scrollY * 0.5 // Adjust the parallax speed
      parallaxRef.current.style.transform = `translateY(${translateY}px)`
    }
  }, [scrollY])

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features")
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* High-quality Background Image of Earbuds */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80 z-0"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center pt-16 md:pt-0">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            The Future of Audio <span className="text-teal-400">In Your Ears</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Experience the next generation of sound innovation with TechGadgets. Sleek design meets unparalleled
            performance across our range of premium audio devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 text-center hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] hover:shadow-teal-500/50"
            >
              Explore Products
            </Link>
            <Link
              href="#features"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 border border-white/30 text-center hover:border-teal-400/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={scrollToFeatures}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 border border-white/30 hover:border-teal-400/50"
        aria-label="Scroll to features"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </div>
  )
}
