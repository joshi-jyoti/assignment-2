import { Zap, Shield, Smartphone, Battery, Wifi } from "lucide-react"
import Link from "next/link"

export default function Features() {
  const gadgets = [
    {
      id: "smartwatch",
      name: "SmartWatch Pro",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400&auto=format&fit=crop",
      description: "Track your fitness, monitor your health, and stay connected with our premium smartwatch.",
      features: ["Heart rate monitoring", "Sleep tracking", "Water resistant", "7-day battery life"],
      price: "$199.99",
    },
    {
      id: "earphones",
      name: "AirBuds Ultra",
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=400&auto=format&fit=crop",
      description: "Immersive sound quality with active noise cancellation for the ultimate audio experience.",
      features: ["Active noise cancellation", "30-hour battery life", "Wireless charging", "Water resistant"],
      price: "$149.99",
    },
    {
      id: "keyboard",
      name: "MechKey Pro",
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=400&auto=format&fit=crop",
      description:
        "Mechanical keyboard with customizable RGB lighting and programmable keys for gamers and professionals.",
      features: ["Mechanical switches", "RGB lighting", "Programmable keys", "Ergonomic design"],
      price: "$129.99",
    },
    {
      id: "smartphone",
      name: "UltraPhone X",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop",
      description: "Flagship smartphone with cutting-edge camera technology and all-day battery life.",
      features: ["5G connectivity", "Triple camera system", "All-day battery", "Edge-to-edge display"],
      price: "$899.99",
    },
    {
      id: "printer",
      name: "PrintMaster 3000",
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=400&auto=format&fit=crop",
      description: "High-quality wireless printer for home and office use with eco-friendly ink technology.",
      features: ["Wireless printing", "Duplex printing", "Eco-friendly ink", "Mobile app control"],
      price: "$249.99",
    },
  ]

  const features = [
    {
      icon: <Zap className="h-10 w-10 text-teal-500" />,
      title: "Lightning Fast",
      description: "Powered by the latest processor technology, our gadgets deliver unmatched speed and performance.",
    },
    {
      icon: <Battery className="h-10 w-10 text-teal-500" />,
      title: "All-Day Battery",
      description: "With our revolutionary battery technology, enjoy up to 48 hours of usage on a single charge.",
    },
    {
      icon: <Shield className="h-10 w-10 text-teal-500" />,
      title: "Advanced Security",
      description: "Your data is protected with military-grade encryption and biometric authentication.",
    },
    {
      icon: <Smartphone className="h-10 w-10 text-teal-500" />,
      title: "Seamless Integration",
      description: "Connects effortlessly with all your devices and smart home systems for a unified experience.",
    },
    {
      icon: <Wifi className="h-10 w-10 text-teal-500" />,
      title: "Always Connected",
      description: "Stay connected with high-speed connectivity options including 5G, Wi-Fi 6, and Bluetooth 5.2.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cutting-Edge Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes our gadgets the most advanced electronic devices on the market today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-transparent hover:shadow-[0_5px_15px_rgba(20,184,166,0.2)] group"
              style={{
                backgroundPosition: "center",
                backgroundSize: "200% 200%",
              }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(20,184,166,0.2) 0%, rgba(56,178,172,0.2) 50%, rgba(20,184,166,0.2) 100%)",
                  border: "2px solid transparent",
                  borderImage: "linear-gradient(90deg, #14b8a6, #38b2ac, #14b8a6) 1",
                  pointerEvents: "none",
                }}
              ></div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Our Premium Gadgets</h2>

        <div className="space-y-16">
          {gadgets.map((gadget, index) => (
            <div
              key={gadget.id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 bg-gray-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group`}
            >
              <div className="lg:w-1/2 overflow-hidden h-64 md:h-80 lg:h-96">
                <img
                  src={gadget.image || "/placeholder.svg"}
                  alt={gadget.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{gadget.name}</h3>
                <div className="text-xl text-teal-600 font-semibold mb-4">{gadget.price}</div>
                <p className="text-gray-600 mb-6">{gadget.description}</p>
                <ul className="space-y-3 mb-8">
                  {gadget.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="mr-2 text-teal-500">✓</div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/products/${gadget.id}`}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 text-center self-start hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] hover:shadow-teal-500/50"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
