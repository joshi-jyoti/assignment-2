"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Navbar({ isLoggedIn, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Get cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(cart.length)

    window.addEventListener("scroll", handleScroll)

    // Listen for cart updates
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartItems(updatedCart.length)
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for cart updates
    window.addEventListener("cartUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    // Show alert
    alert("Logout Successfully")

    onLogout()
    toast({
      title: "Logout successful",
      description: "You have been logged out of your account.",
      variant: "success",
    })
  }

  const toggleProfile = () => {
    setShowProfile(!showProfile)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900 shadow-md py-2" : "bg-black/50 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            <span className="text-teal-400">Tech</span>Gadgets
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-teal-400 transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-white hover:text-teal-400 transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-white hover:text-teal-400 transition-colors">
              Testimonials
            </Link>
            <Link href="#faq" className="text-white hover:text-teal-400 transition-colors">
              FAQ
            </Link>
            <Link href="#contact" className="text-white hover:text-teal-400 transition-colors">
              Contact
            </Link>
            <Link href="/products" className="text-white hover:text-teal-400 transition-colors">
              Products
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button onClick={toggleProfile} className="text-white hover:text-teal-400 transition-colors">
                    <User className="h-5 w-5" />
                  </button>
                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="p-4 border-b border-gray-200">
                        <p className="font-medium text-gray-900">Demo User</p>
                        <p className="text-sm text-gray-600">demo@example.com</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowProfile(false)}
                        >
                          Your Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowProfile(false)}
                        >
                          Your Orders
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowProfile(false)}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout()
                            setShowProfile(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/cart" className="text-white hover:text-teal-400 transition-colors relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                {/* <Link
                  href="/login"
                  className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors"
                >
                  Login
                </Link> */}

                <Link href="/signup" className="text-gray-300 hover:text-white">
                  Sign Up
                </Link>

                <Link
                  href="/login"
                  className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors"
                >
                  Login
                </Link>
              </div>
              
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
  <div className="md:hidden mt-4 pb-4 space-y-4 bg-gray-900 rounded-lg p-4">
    <Link
      href="/"
      className="block text-white hover:text-teal-400 transition-colors py-2"
      onClick={() => setIsOpen(false)}
    >
      Home
    </Link>
    <Link
      href="#features"
      className="block text-white hover:text-teal-400 transition-colors py-2"
      onClick={() => setIsOpen(false)}
    >
      Features
    </Link>
    <Link
      href="#testimonials"
      className="block text-white hover:text-teal-400 transition-colors py-2"
      onClick={() => setIsOpen(false)}
    >
      Testimonials
    </Link>
    <Link
      href="#faq"
      className="block text-white hover:text-teal-400 transition-colors py-2"
      onClick={() => setIsOpen(false)}
    >
      FAQ
    </Link>
    <Link
      href="#contact"
      className="block text-white hover:text-teal-400 transition-colors py-2"
      onClick={() => setIsOpen(false)}
    >
      Contact
    </Link>
    <Link
      href="/products"
      className="block text-white hover:text-teal-400 transition-colors py-2"
      onClick={() => setIsOpen(false)}
    >
      Products
    </Link>

    {isLoggedIn ? (
      <>
        <Link
          href="/profile"
          className="block text-white hover:text-teal-400 transition-colors py-2"
          onClick={() => setIsOpen(false)}
        >
          Profile
        </Link>
        <Link
          href="/cart"
          className="block text-white hover:text-teal-400 transition-colors py-2"
          onClick={() => setIsOpen(false)}
        >
          Cart {cartItems > 0 && `(${cartItems})`}
        </Link>
        <button
          onClick={() => {
            handleLogout()
            setIsOpen(false)
          }}
          className="block w-full text-left text-white hover:text-teal-400 transition-colors py-2"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        {/* <Link
          href="/login"
          className="block bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors text-center"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link> */}
        <Link
          href="/signup"
          className="block text-white hover:text-teal-400 transition-colors py-2 text-center"
          onClick={() => setIsOpen(false)}
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="block bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors text-center"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
      </>
    )}
  </div>
)}
      </div>
    </nav>
  )
}
