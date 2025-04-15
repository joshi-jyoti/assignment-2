"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"

export default function Cart() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(userLoggedIn)

    // Redirect if not logged in
    if (!userLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to view your cart.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Get cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(cart)
  }, [router, toast])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
      variant: "success",
    })
    router.push("/")
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))

    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Dispatch custom event to notify navbar
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)

    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Dispatch custom event to notify navbar
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
      variant: "success",
    })
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add some items before checkout.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/checkout")
    }, 1000)
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const price = Number.parseFloat(item.price.replace("$", ""))
    return total + price * item.quantity
  }, 0)

  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/products"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link
                href="/products"
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Shopping Cart ({cartItems.length} items)</h2>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center">
                        <div className="sm:flex-shrink-0 h-24 w-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 sm:ml-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                              <p className="mt-1 text-sm text-gray-500">Price: {item.price}</p>
                            </div>
                            <div className="flex items-center mt-4 sm:mt-0">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="ml-4 text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-900">
                            Subtotal: ${(Number.parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-900">${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-900">${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4 mt-2">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold text-gray-900">Total</span>
                          <span className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={isLoading || cartItems.length === 0}
                      className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Processing..." : "Proceed to Checkout"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
