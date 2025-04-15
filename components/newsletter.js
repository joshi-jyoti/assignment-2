"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Newsletter() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })

  // Add useEffect to auto-dismiss success message
  useEffect(() => {
    if (status.submitted && status.success) {
      const timer = setTimeout(() => {
        setStatus({
          submitted: false,
          success: false,
          message: "",
        })
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [status])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus({
        submitted: true,
        success: false,
        message: "Please enter a valid email address.",
      })
      return
    }

    // Simulate successful subscription
    setStatus({
      submitted: true,
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    })

    // Reset form
    setEmail("")

    // Redirect to homepage after 2 seconds
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter for the latest product updates, exclusive offers, and tech tips.
          </p>

          {status.submitted ? (
            <div
              className={`p-4 rounded-lg ${status.success ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"}`}
            >
              {status.message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] hover:shadow-teal-500/50"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-sm text-gray-400 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
