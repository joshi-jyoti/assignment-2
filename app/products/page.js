"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"

export default function ProductsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(userLoggedIn)
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

  const products = [
    {
      id: "smartwatch",
      name: "SmartWatch Pro",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400&auto=format&fit=crop",
      description: "Track your fitness, monitor your health, and stay connected with our premium smartwatch.",
      price: "$199.99",
      category: "Wearables",
      rating: 4.8,
      reviews: 245,
    },
    {
      id: "earphones",
      name: "AirBuds Ultra",
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=400&auto=format&fit=crop",
      description: "Immersive sound quality with active noise cancellation for the ultimate audio experience.",
      price: "$149.99",
      category: "Audio",
      rating: 4.7,
      reviews: 189,
    },
    {
      id: "keyboard",
      name: "MechKey Pro",
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=400&auto=format&fit=crop",
      description:
        "Mechanical keyboard with customizable RGB lighting and programmable keys for gamers and professionals.",
      price: "$129.99",
      category: "Peripherals",
      rating: 4.9,
      reviews: 312,
    },
    {
      id: "smartphone",
      name: "UltraPhone X",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop",
      description: "Flagship smartphone with cutting-edge camera technology and all-day battery life.",
      price: "$899.99",
      category: "Phones",
      rating: 4.6,
      reviews: 427,
    },
    {
      id: "printer",
      name: "PrintMaster 3000",
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=400&auto=format&fit=crop",
      description: "High-quality wireless printer for home and office use with eco-friendly ink technology.",
      price: "$249.99",
      category: "Office",
      rating: 4.5,
      reviews: 156,
    },
  ]

  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
  })

  const filteredProducts = products.filter((product) => {
    // Category filter
    if (filters.category !== "all" && product.category !== filters.category) {
      return false
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      const price = Number.parseFloat(product.price.replace("$", ""))
      if (filters.priceRange === "under100" && price >= 100) return false
      if (filters.priceRange === "100to200" && (price < 100 || price > 200)) return false
      if (filters.priceRange === "200to500" && (price < 200 || price > 500)) return false
      if (filters.priceRange === "over500" && price <= 500) return false
    }

    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover our range of premium electronic gadgets designed to enhance your digital lifestyle.
          </p>

          {/* Filters */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">All Categories</option>
                  <option value="Wearables">Wearables</option>
                  <option value="Audio">Audio</option>
                  <option value="Peripherals">Peripherals</option>
                  <option value="Phones">Phones</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div>
                <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  id="priceRange"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">All Prices</option>
                  <option value="under100">Under $100</option>
                  <option value="100to200">$100 - $200</option>
                  <option value="200to500">$200 - $500</option>
                  <option value="over500">Over $500</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-teal-400/30"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <span className="text-lg font-semibold text-teal-600">{product.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm text-gray-700">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products match your selected filters.</p>
              <button
                onClick={() => setFilters({ category: "all", priceRange: "all" })}
                className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
