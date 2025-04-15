"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import Features from "@/components/features"
import CTA from "@/components/cta"
import Testimonials from "@/components/testimonials"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FAQ from "@/components/faq"
import Contact from "@/components/contact"
import Shipping from "@/components/shipping"
import Newsletter from "@/components/newsletter"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(userLoggedIn)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
      variant: "success",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Hero scrollY={scrollY} />
      <Features />
      <CTA />
      <Testimonials />
      <FAQ />
      <Shipping />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  )
}
