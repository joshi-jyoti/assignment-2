"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Check, Copy, PhoneIcon as WhatsApp } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"

export default function ProductDetail({ params }) {
  const router = useRouter()
  const { id } = params
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [addedToCart, setAddedToCart] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const shareRef = useRef(null)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(userLoggedIn)

    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setInWishlist(wishlist.includes(id))

    // Close share options when clicking outside
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [id])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
      variant: "success",
    })
  }

  // Update the handleAddToCart function to fix quantity issues and require login
  const handleAddToCart = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to add items to your cart.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Get current cart
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    // Check if product is already in cart
    const existingProductIndex = cart.findIndex((item) => item.id === id)

    if (existingProductIndex >= 0) {
      // Update quantity if product exists
      cart[existingProductIndex].quantity += quantity
    } else {
      // Add new product to cart
      cart.push({
        id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity,
      })
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart))

    // Dispatch custom event to notify navbar
    window.dispatchEvent(new Event("cartUpdated"))

    setAddedToCart(true)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    })
    setTimeout(() => {
      setAddedToCart(false)
    }, 3000)
  }

  // Update the handleToggleWishlist function to require login
  const handleToggleWishlist = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to add items to your wishlist.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

    if (inWishlist) {
      const updatedWishlist = wishlist.filter((item) => item !== id)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setInWishlist(false)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
        variant: "success",
      })
    } else {
      wishlist.push(id)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
      setInWishlist(true)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
        variant: "success",
      })
    }
  }

  const handleShare = () => {
    setShowShareOptions(!showShareOptions)
  }

  const copyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setLinkCopied(true)
    toast({
      title: "Link copied",
      description: "Product link has been copied to clipboard.",
      variant: "success",
    })
    setTimeout(() => {
      setLinkCopied(false)
      setShowShareOptions(false)
    }, 3000)
  }

  const shareOnWhatsApp = () => {
    const url = window.location.href
    const text = `Check out this amazing product: ${product.name} - ${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
    setShowShareOptions(false)
  }

  // Update the handleBuyNow function to require login
  const handleBuyNow = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to purchase items.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Add to cart first
    handleAddToCart()

    toast({
      title: "Purchase initiated",
      description: `You are purchasing ${product.name} for ${product.price}.`,
      variant: "success",
    })
    // Redirect to checkout
    router.push(`/checkout?product=${id}&quantity=${quantity}`)
  }

  // Product data - in a real app, this would come from an API
  const products = {
    smartwatch: {
      name: "SmartWatch Pro",
      price: "$199.99",
      description: "Track your fitness, monitor your health, and stay connected with our premium smartwatch.",
      longDescription:
        "The SmartWatch Pro is the ultimate companion for your active lifestyle. With advanced health monitoring features including heart rate tracking, sleep analysis, and blood oxygen monitoring, you'll have all the data you need to optimize your wellbeing. The sleek, water-resistant design means you can wear it anywhere, while the 7-day battery life ensures you're always connected. Compatible with both iOS and Android devices, the SmartWatch Pro seamlessly integrates with your digital ecosystem.",
      images: [
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop",
      ],
      features: [
        "Heart rate monitoring",
        "Sleep tracking",
        "Water resistant (50m)",
        "7-day battery life",
        "GPS tracking",
        "Customizable watch faces",
        "Smartphone notifications",
        "Music control",
      ],
      specs: {
        Display: '1.4" AMOLED, 454 x 454 pixels',
        Battery: "420mAh, up to 7 days",
        Connectivity: "Bluetooth 5.0, Wi-Fi",
        Sensors: "Heart rate, accelerometer, gyroscope, barometer",
        "Water Resistance": "5 ATM (50m)",
        Compatibility: "iOS 12.0+, Android 7.0+",
        Dimensions: "45 x 45 x 11.8 mm",
        Weight: "32g (without strap)",
      },
      reviews: [
        {
          name: "Sarah Johnson",
          rating: 5,
          date: "August 15, 2023",
          comment:
            "This smartwatch has completely changed how I track my fitness. The battery life is amazing and the sleep tracking is surprisingly accurate.",
        },
        {
          name: "Michael Chen",
          rating: 4,
          date: "July 22, 2023",
          comment:
            "Great watch with tons of features. The only downside is that the screen could be a bit brighter in direct sunlight.",
        },
        {
          name: "Jessica Williams",
          rating: 5,
          date: "September 3, 2023",
          comment:
            "Perfect fitness companion! The heart rate monitor is very accurate compared to my previous smartwatch.",
        },
      ],
      category: "Wearables",
      inStock: true,
    },
    earphones: {
      name: "AirBuds Ultra",
      price: "$149.99",
      description: "Immersive sound quality with active noise cancellation for the ultimate audio experience.",
      longDescription:
        "Experience audio like never before with the AirBuds Ultra. These premium wireless earbuds feature advanced active noise cancellation technology that blocks out the world around you, allowing you to focus on what matters - your music, podcasts, or calls. With 30 hours of total battery life (8 hours in the earbuds, 22 more in the charging case), you'll never be left without your favorite tunes. The ergonomic design ensures a comfortable fit for all-day wear, while the water-resistant construction makes them perfect for workouts.",
      images: [
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=400&auto=format&fit=crop",
      ],
      features: [
        "Active noise cancellation",
        "30-hour battery life",
        "Wireless charging case",
        "Water resistant (IPX4)",
        "Touch controls",
        "Voice assistant support",
        "Transparency mode",
        "Automatic ear detection",
      ],
      specs: {
        "Driver Size": "11mm dynamic drivers",
        Battery: "8 hours (earbuds), 22 hours (case)",
        Connectivity: "Bluetooth 5.2",
        "Noise Cancellation": "Hybrid ANC with 3 microphones per earbud",
        "Water Resistance": "IPX4",
        Charging: "USB-C, Qi wireless",
        Dimensions: "Earbuds: 21.8 x 18.3 x 25.6 mm, Case: 64.2 x 46.5 x 27.8 mm",
        Weight: "5.4g per earbud, 58g (case)",
      },
      reviews: [
        {
          name: "David Kim",
          rating: 5,
          date: "August 28, 2023",
          comment:
            "The noise cancellation on these earbuds is incredible. I can't hear anything from the outside world when I have them on.",
        },
        {
          name: "Emily Rodriguez",
          rating: 4,
          date: "September 10, 2023",
          comment:
            "Great sound quality and comfortable fit. Battery life is as advertised. The only issue is occasional Bluetooth connectivity hiccups.",
        },
        {
          name: "Thomas Wilson",
          rating: 5,
          date: "July 15, 2023",
          comment:
            "These are by far the best earbuds I've ever owned. The sound is crisp and clear, and the noise cancellation is top-notch.",
        },
      ],
      category: "Audio",
      inStock: true,
    },
    keyboard: {
      name: "MechKey Pro",
      price: "$129.99",
      description:
        "Mechanical keyboard with customizable RGB lighting and programmable keys for gamers and professionals.",
      longDescription:
        "The MechKey Pro is designed for both gaming enthusiasts and productivity professionals who demand the best typing experience. Featuring premium mechanical switches with a satisfying tactile feel and audible click, this keyboard provides unparalleled feedback and responsiveness. The fully customizable RGB backlighting allows you to create the perfect ambiance for your setup, while the programmable macro keys let you automate complex commands. Built with a durable aluminum frame, the MechKey Pro is designed to withstand years of intense use.",
      images: [
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595044426077-d36d9236d44a?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop",
      ],
      features: [
        "Mechanical switches",
        "Full RGB backlighting",
        "Programmable macro keys",
        "Aluminum frame construction",
        "Anti-ghosting technology",
        "Detachable wrist rest",
        "Dedicated media controls",
        "USB passthrough",
      ],
      specs: {
        "Switch Type": "Mechanical (Blue/Brown/Red options)",
        "Key Rollover": "N-key rollover",
        Backlighting: "Per-key RGB, 16.8 million colors",
        Connectivity: "USB-C, detachable cable",
        "Polling Rate": "1000Hz",
        Dimensions: "440 x 140 x 40 mm",
        Weight: "1.1 kg",
        Compatibility: "Windows, macOS, Linux",
      },
      reviews: [
        {
          name: "Alex Thompson",
          rating: 5,
          date: "September 5, 2023",
          comment:
            "This keyboard has transformed my gaming experience. The mechanical switches are responsive and satisfying, and the RGB lighting is fully customizable.",
        },
        {
          name: "Samantha Lee",
          rating: 4,
          date: "August 12, 2023",
          comment:
            "Great keyboard for both gaming and typing. The only downside is that it's a bit loud, which might bother others if you're in a shared space.",
        },
        {
          name: "Ryan Martinez",
          rating: 5,
          date: "July 30, 2023",
          comment:
            "The build quality is exceptional. The aluminum frame feels premium and the detachable wrist rest is very comfortable for long typing sessions.",
        },
      ],
      category: "Peripherals",
      inStock: true,
    },
    smartphone: {
      name: "UltraPhone X",
      price: "$899.99",
      description: "Flagship smartphone with cutting-edge camera technology and all-day battery life.",
      longDescription:
        "The UltraPhone X represents the pinnacle of mobile technology. Its revolutionary camera system captures stunning photos and videos in any lighting condition, while the edge-to-edge AMOLED display delivers vibrant colors and deep blacks for an immersive viewing experience. Powered by the latest processor and 5G connectivity, this phone handles everything from intensive gaming to multitasking with ease. The all-day battery ensures you stay connected from morning to night, and the fast-charging technology gets you back to 50% in just 30 minutes.",
      images: [
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop",
      ],
      features: [
        "Triple camera system",
        "Edge-to-edge AMOLED display",
        "5G connectivity",
        "All-day battery life",
        "Fast charging technology",
        "Advanced facial recognition",
        "Water and dust resistant (IP68)",
        "Stereo speakers",
      ],
      specs: {
        Display: '6.7" AMOLED, 3200 x 1440 pixels, 120Hz',
        Processor: "Octa-core, 3.0 GHz",
        RAM: "12GB LPDDR5",
        Storage: "256GB/512GB UFS 3.1",
        Battery: "5000mAh, 65W fast charging",
        Camera: "Main: 108MP, Ultra-wide: 48MP, Telephoto: 12MP, Front: 32MP",
        Connectivity: "5G, Wi-Fi 6E, Bluetooth 5.2, NFC",
        OS: "Android 13",
      },
      reviews: [
        {
          name: "Jennifer Parker",
          rating: 5,
          date: "September 15, 2023",
          comment:
            "This phone exceeds all expectations. The camera quality is outstanding, and the battery easily lasts all day even with heavy use.",
        },
        {
          name: "Robert Chen",
          rating: 4,
          date: "August 22, 2023",
          comment:
            "Great phone overall. The display is gorgeous and performance is top-notch. The only downside is that it's a bit slippery without a case.",
        },
        {
          name: "Lisa Johnson",
          rating: 5,
          date: "September 3, 2023",
          comment:
            "The camera on this phone is incredible. I've been able to take professional-quality photos without any special equipment or knowledge.",
        },
      ],
      category: "Phones",
      inStock: true,
    },
    printer: {
      name: "PrintMaster 3000",
      price: "$249.99",
      description: "High-quality wireless printer for home and office use with eco-friendly ink technology.",
      longDescription:
        "The PrintMaster 3000 is the perfect printing solution for both home and office environments. With its wireless connectivity, you can print from anywhere in your space without the hassle of cables. The eco-friendly ink technology not only produces vibrant, long-lasting prints but also reduces waste and environmental impact. Featuring automatic duplex printing, you'll save paper while creating professional-looking documents. The intuitive touchscreen interface and mobile app make it easy to manage print jobs, check ink levels, and order supplies when needed.",
      images: [
        "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563396983906-b3795482a59a?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586803235770-2724414437b7?q=80&w=400&auto=format&fit=crop",
      ],
      features: [
        "Wireless printing",
        "Eco-friendly ink technology",
        "Automatic duplex printing",
        "Mobile app control",
        "Color touchscreen interface",
        "High-capacity paper tray",
        "Scan to email/cloud",
        "Energy Star certified",
      ],
      specs: {
        "Print Technology": "Inkjet",
        "Print Resolution": "4800 x 1200 dpi",
        "Print Speed": "22 ppm (black), 18 ppm (color)",
        Connectivity: "Wi-Fi, Ethernet, USB, Bluetooth",
        "Paper Handling": "250-sheet input tray, 50-sheet output tray",
        "Duplex Printing": "Automatic",
        Dimensions: "460 x 380 x 200 mm",
        Weight: "8.5 kg",
      },
      reviews: [
        {
          name: "Mark Wilson",
          rating: 5,
          date: "August 10, 2023",
          comment:
            "This printer has been a game-changer for my home office. The wireless functionality works flawlessly, and the print quality is excellent.",
        },
        {
          name: "Sarah Thompson",
          rating: 4,
          date: "September 5, 2023",
          comment:
            "Great printer with excellent features. The eco-friendly ink really does last longer than my previous printer. Setup was a bit tricky though.",
        },
        {
          name: "James Rodriguez",
          rating: 5,
          date: "July 28, 2023",
          comment:
            "The mobile app makes printing so convenient. I can send documents to print when I'm not even home, and they're ready when I arrive.",
        },
      ],
      category: "Office",
      inStock: true,
    },
  }

  const product = products[id]

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/products"
          className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-teal-500 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-teal-500 transition-colors">
              Products
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{product.name}</span>
          </div>

          {/* Back Button */}
          <Link
            href="/products"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>

          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="p-6 lg:p-8">
                <div className="mb-4 overflow-hidden rounded-lg h-64 md:h-80">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg border border-gray-200 hover:border-teal-400 transition-colors cursor-pointer h-20 md:h-24"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < 4.5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">{product.reviews.length} reviews</span>
                </div>

                <div className="text-2xl font-bold text-gray-900 mb-4">{product.price}</div>

                <p className="text-gray-600 mb-6">{product.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.features.slice(0, 6).map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="mr-2 text-teal-500">✓</div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Category:</h3>
                  <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity:</h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300 text-gray-900">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] hover:shadow-teal-500/50"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {addedToCart ? "Added to Cart!" : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className={`flex-1 border ${
                      inWishlist ? "border-teal-400 bg-teal-50" : "border-gray-300"
                    } hover:border-teal-400 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${inWishlist ? "fill-teal-400 text-teal-400" : ""}`} />
                    {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center mb-6 hover:shadow-lg"
                >
                  Buy Now - {product.price}
                </button>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {product.inStock ? (
                      <span className="text-green-600 font-medium">In Stock</span>
                    ) : (
                      <span className="text-red-600 font-medium">Out of Stock</span>
                    )}
                  </div>
                  <div className="relative" ref={shareRef}>
                    <button
                      onClick={handleShare}
                      className="flex items-center text-gray-600 hover:text-teal-500 transition-colors"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </button>
                    {showShareOptions && (
                      <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            onClick={copyLink}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {linkCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                            {linkCopied ? "Copied!" : "Copy Link"}
                          </button>
                          <button
                            onClick={shareOnWhatsApp}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <WhatsApp className="w-4 h-4 mr-2" />
                            Share on WhatsApp
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "description"
                      ? "text-teal-600 border-b-2 border-teal-500"
                      : "text-gray-600 hover:text-teal-500"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("specifications")}
                  className={`px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "specifications"
                      ? "text-teal-600 border-b-2 border-teal-500"
                      : "text-gray-600 hover:text-teal-500"
                  }`}
                >
                  Specs
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === "reviews"
                      ? "text-teal-600 border-b-2 border-teal-500"
                      : "text-gray-600 hover:text-teal-500"
                  }`}
                >
                  Reviews
                </button>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              {activeTab === "description" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-600 mb-6">{product.longDescription}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Features</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <div className="mr-2 text-teal-500">✓</div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <img
                        src={product.images[1] || "/placeholder.svg"}
                        alt={product.name}
                        className="rounded-lg shadow-sm h-64 w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
                  <div className="border rounded-lg overflow-hidden">
                    {Object.entries(product.specs).map(([key, value], index, array) => (
                      <div key={key} className={`grid grid-cols-3 ${index !== array.length - 1 ? "border-b" : ""}`}>
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">{key}</div>
                        <div className="p-4 col-span-2 text-gray-600">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
                  <div className="mb-8 flex items-center">
                    <div className="flex mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < 4.5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium text-gray-900">4.5 out of 5</span>
                  </div>

                  <div className="space-y-6">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="font-medium text-gray-900">{review.name}</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">{review.date}</div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
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
