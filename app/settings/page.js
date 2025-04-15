"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Lock, Bell, AlertTriangle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"

export default function Settings() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    name: "Demo User",
    email: "demo@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94105",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(userLoggedIn)

    // Redirect if not logged in
    if (!userLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to access settings.",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [router, toast])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    toast({
      title: "Logout successful",
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

  const validateProfileForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.address) {
      newErrors.address = "Address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePasswordForm = () => {
    const newErrors = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    if (validateProfileForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Profile updated",
          description: "Your profile information has been updated successfully.",
          variant: "success",
        })
      }, 1500)
    }
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (validatePasswordForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Password updated",
          description: "Your password has been updated successfully.",
          variant: "success",
        })

        // Reset password fields
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      }, 1500)
    }
  }

  const handleDeleteAccount = () => {
    // Show confirmation toast
    toast({
      title: "Are you sure?",
      description: "This action cannot be undone. All your data will be permanently deleted.",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <Link href="/profile" className="text-teal-600 hover:text-teal-700 transition-colors flex items-center">
              Back to Profile
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "profile"
                      ? "text-teal-600 border-b-2 border-teal-500"
                      : "text-gray-600 hover:text-teal-500"
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "password"
                      ? "text-teal-600 border-b-2 border-teal-500"
                      : "text-gray-600 hover:text-teal-500"
                  }`}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "notifications"
                      ? "text-teal-600 border-b-2 border-teal-500"
                      : "text-gray-600 hover:text-teal-500"
                  }`}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab("delete")}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "delete"
                      ? "text-red-600 border-b-2 border-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Delete Account
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <form onSubmit={handleProfileSubmit}>
                  <div className="space-y-6">
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
                        className={`w-full px-4 py-2 border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
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
                        className={`w-full px-4 py-2 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                      ></textarea>
                      {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <form onSubmit={handlePasswordSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.currentPassword ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                      />
                      {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.newPassword ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                      />
                      {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                      />
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-gray-600">Receive emails about your account activity and orders.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Order Updates</h3>
                        <p className="text-gray-600">Receive updates about your order status.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Marketing Emails</h3>
                        <p className="text-gray-600">Receive emails about new products, offers, and promotions.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                        onClick={() => {
                          toast({
                            title: "Preferences saved",
                            description: "Your notification preferences have been updated.",
                            variant: "success",
                          })
                        }}
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Delete Account Tab */}
              {activeTab === "delete" && (
                <div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">Delete Your Account</h2>
                    <p className="text-gray-700 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                      <li>All your personal information will be permanently deleted</li>
                      <li>Your order history will be removed from our system</li>
                      <li>You will lose access to your purchase history and digital downloads</li>
                      <li>This action cannot be undone</li>
                    </ul>
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
