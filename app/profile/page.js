"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Mail, Phone, MapPin, ShoppingBag, Heart, Settings, LogOut } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"

export default function Profile() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [wishlistItems, setWishlistItems] = useState([])

  // Mock user data
  const userData = {
    name: "Demo User",
    email: "demo@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94105",
    orders: [
      {
        id: "ORD-12345",
        date: "October 15, 2023",
        total: "$349.98",
        status: "Delivered",
        items: [
          {
            id: "smartwatch",
            name: "SmartWatch Pro",
            price: "$199.99",
            quantity: 1,
          },
          {
            id: "earphones",
            name: "AirBuds Ultra",
            price: "$149.99",
            quantity: 1,
          },
        ],
      },
      {
        id: "ORD-12346",
        date: "November 2, 2023",
        total: "$129.99",
        status: "Processing",
        items: [
          {
            id: "keyboard",
            name: "MechKey Pro",
            price: "$129.99",
            quantity: 1,
          },
        ],
      },
    ],
  }

  // Product data for wishlist
  const products = {
    smartwatch: {
      name: "SmartWatch Pro",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=300&auto=format&fit=crop",
    },
    earphones: {
      name: "AirBuds Ultra",
      price: "$149.99",
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=300&auto=format&fit=crop",
    },
    keyboard: {
      name: "MechKey Pro",
      price: "$129.99",
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=300&auto=format&fit=crop",
    },
    smartphone: {
      name: "UltraPhone X",
      price: "$899.99",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300&auto=format&fit=crop",
    },
    printer: {
      name: "PrintMaster 3000",
      price: "$249.99",
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=300&auto=format&fit=crop",
    },
  }

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(userLoggedIn)

    // Redirect if not logged in
    if (!userLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to view your profile.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Get wishlist items from localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

    // Map wishlist IDs to product data
    const wishlistProducts = wishlist
      .map((id) => ({
        id,
        ...products[id],
      }))
      .filter((item) => item.name) // Filter out any undefined products

    setWishlistItems(wishlistProducts)
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

  const removeFromWishlist = (id) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const updatedWishlist = wishlist.filter((itemId) => itemId !== id)

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

    // Update state
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))

    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist.",
      variant: "success",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-900">{userData.name}</h2>
                      <p className="text-sm text-gray-600">{userData.email}</p>
                    </div>
                  </div>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setActiveTab("profile")}
                        className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                          activeTab === "profile" ? "bg-teal-50 text-teal-600" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <User className="h-5 w-5 mr-3" />
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("orders")}
                        className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                          activeTab === "orders" ? "bg-teal-50 text-teal-600" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <ShoppingBag className="h-5 w-5 mr-3" />
                        Orders
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("wishlist")}
                        className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                          activeTab === "wishlist" ? "bg-teal-50 text-teal-600" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Heart className="h-5 w-5 mr-3" />
                        Wishlist
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => router.push("/settings")}
                        className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                          activeTab === "settings" ? "bg-teal-50 text-teal-600" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Settings className="h-5 w-5 mr-3" />
                        Settings
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center">
                        <div className="flex items-center w-full md:w-1/3">
                          <User className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-gray-700 font-medium">Full Name</span>
                        </div>
                        <div className="mt-1 md:mt-0 md:w-2/3">
                          <span className="text-gray-900">{userData.name}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center">
                        <div className="flex items-center w-full md:w-1/3">
                          <Mail className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-gray-700 font-medium">Email Address</span>
                        </div>
                        <div className="mt-1 md:mt-0 md:w-2/3">
                          <span className="text-gray-900">{userData.email}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center">
                        <div className="flex items-center w-full md:w-1/3">
                          <Phone className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-gray-700 font-medium">Phone Number</span>
                        </div>
                        <div className="mt-1 md:mt-0 md:w-2/3">
                          <span className="text-gray-900">{userData.phone}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center">
                        <div className="flex items-center w-full md:w-1/3">
                          <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-gray-700 font-medium">Address</span>
                        </div>
                        <div className="mt-1 md:mt-0 md:w-2/3">
                          <span className="text-gray-900">{userData.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
                    {userData.orders.length === 0 ? (
                      <p className="text-gray-600">You haven't placed any orders yet.</p>
                    ) : (
                      <div className="space-y-6">
                        {userData.orders.map((order) => (
                          <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <span className="text-sm text-gray-500">Order ID: </span>
                                <span className="font-medium">{order.id}</span>
                              </div>
                              <div className="mt-2 md:mt-0">
                                <span className="text-sm text-gray-500">Date: </span>
                                <span className="font-medium">{order.date}</span>
                              </div>
                              <div className="mt-2 md:mt-0">
                                <span className="text-sm text-gray-500">Total: </span>
                                <span className="font-medium">{order.total}</span>
                              </div>
                              <div className="mt-2 md:mt-0">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="text-sm font-medium text-gray-900 mb-2">Items</h3>
                              <ul className="divide-y divide-gray-200">
                                {order.items.map((item) => (
                                  <li key={item.id} className="py-3 flex justify-between">
                                    <div>
                                      <span className="font-medium">{item.name}</span>
                                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                    </div>
                                    <span>{item.price}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Wishlist Tab */}
                {activeTab === "wishlist" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">My Wishlist</h2>
                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-8">
                        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                        <Link
                          href="/products"
                          className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-2 rounded-lg transition-colors inline-block"
                        >
                          Browse Products
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {wishlistItems.map((item) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden flex">
                            <div className="w-1/3 h-32">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-2/3 p-4 flex flex-col justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                <p className="text-gray-600 mt-1">{item.price}</p>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <Link
                                  href={`/products/${item.id}`}
                                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                                >
                                  View Product
                                </Link>
                                <button
                                  onClick={() => removeFromWishlist(item.id)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <Heart className="h-5 w-5 fill-current" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
                        <p className="text-gray-600 mb-4">Update your account information and how we contact you.</p>
                        <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                          Edit Profile
                        </button>
                      </div>
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Password</h3>
                        <p className="text-gray-600 mb-4">Change your password or reset it if you've forgotten it.</p>
                        <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                          Change Password
                        </button>
                      </div>
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Notifications</h3>
                        <p className="text-gray-600 mb-4">Manage your notification preferences.</p>
                        <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                          Notification Settings
                        </button>
                      </div>
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-red-600 mb-3">Delete Account</h3>
                        <p className="text-gray-600 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
