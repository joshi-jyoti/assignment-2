"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, Check } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"

export default function Checkout() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })

  const productId = searchParams.get("product")
  const quantity = Number.parseInt(searchParams.get("quantity") || "1")

  // Product data - in a real app, this would come from an API
  const products = {
    smartwatch: {
      name: "SmartWatch Pro",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=300&auto=format&fit=crop",
    },
    earphones: {
      name: "AirBuds Ultra",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=300&auto=format&fit=crop",
    },
    keyboard: {
      name: "MechKey Pro",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=300&auto=format&fit=crop",
    },
    smartphone: {
      name: "UltraPhone X",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300&auto=format&fit=crop",
    },
    printer: {
      name: "PrintMaster 3000",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=300&auto=format&fit=crop",
    },
  }

  const product = products[productId]

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(userLoggedIn)

    // Redirect if not logged in
    if (!userLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to complete your purchase.",
        variant: "destructive",
      })
      router.push("/login")
    }

    // Redirect if no product selected
    if (!product) {
      router.push("/products")
    }
  }, [product, router, toast])

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      toast({
        title: "Purchase successful!",
        description: `Thank you for your purchase of ${product.name}.`,
        variant: "success",
      })
    }, 2000)
  }

  if (!product) {
    return null // Will redirect in useEffect
  }

  const subtotal = product.price * quantity
  const shipping = 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href={`/products/${productId}`}
            className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Product
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          {isComplete ? (
            <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Purchase!</h2>
              <p className="text-gray-600 mb-6">
                Your order has been successfully placed. You will receive a confirmation email shortly.
              </p>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <p className="text-gray-600">
                  {product.name} x {quantity} - ${(product.price * quantity).toFixed(2)}
                </p>
                <p className="text-gray-600">Order Total: ${total.toFixed(2)}</p>
              </div>
              <Link
                href="/products"
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                      <div className="mb-6">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pl-10"
                          />
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            placeholder="123"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? "Processing..." : `Complete Purchase - $${total.toFixed(2)}`}
                    </button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-gray-600">Quantity: {quantity}</p>
                        <p className="text-gray-900 font-medium">${product.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 pb-2">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-900">${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-900">${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
                      </div>
                    </div>
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
