import { Truck, RotateCcw, Clock, Shield } from "lucide-react"

export default function Shipping() {
  const policies = [
    {
      icon: <Truck className="h-10 w-10 text-teal-500" />,
      title: "Fast Shipping",
      description:
        "Free standard shipping on all orders over $50. Express and international shipping options available.",
    },
    {
      icon: <RotateCcw className="h-10 w-10 text-teal-500" />,
      title: "Easy Returns",
      description:
        "30-day hassle-free return policy. If you're not satisfied, simply return the product for a full refund.",
    },
    {
      icon: <Clock className="h-10 w-10 text-teal-500" />,
      title: "Delivery Estimates",
      description: "Standard: 3-5 business days. Express: 1-2 business days. International: 7-14 business days.",
    },
    {
      icon: <Shield className="h-10 w-10 text-teal-500" />,
      title: "Warranty",
      description: "All products come with a 1-year limited warranty. Extended warranty options available.",
    },
  ]

  return (
    <section id="shipping" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shipping & Returns</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make shipping and returns easy, so you can shop with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-transparent hover:shadow-[0_5px_15px_rgba(20,184,166,0.2)] group relative"
            >
              <div className="mb-4">{policy.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{policy.title}</h3>
              <p className="text-gray-600">{policy.description}</p>
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

        <div className="mt-16 bg-white rounded-2xl overflow-hidden shadow-xl p-8 md:p-12 group hover:shadow-2xl transition-all duration-300 relative">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(90deg, rgba(20,184,166,0.05) 0%, rgba(56,178,172,0.05) 50%, rgba(20,184,166,0.05) 100%)",
              border: "2px solid transparent",
              borderImage: "linear-gradient(90deg, #14b8a6, #38b2ac, #14b8a6) 1",
              pointerEvents: "none",
            }}
          ></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Shipping & Return Policy</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Shipping Policy</h4>
              <ul className="space-y-3 text-gray-600">
                <li>• Free standard shipping on all orders over $50 within the continental US.</li>
                <li>• Standard shipping (3-5 business days): $4.99</li>
                <li>• Express shipping (1-2 business days): $12.99</li>
                <li>• International shipping available to most countries.</li>
                <li>• International shipping costs calculated at checkout.</li>
                <li>• All orders are processed within 1-2 business days.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Return Policy</h4>
              <ul className="space-y-3 text-gray-600">
                <li>• 30-day return policy for all unused products.</li>
                <li>• Products must be in original packaging with all accessories.</li>
                <li>• Refunds are processed within 5-7 business days.</li>
                <li>• Return shipping is the responsibility of the customer.</li>
                <li>• Defective products can be returned for replacement or refund.</li>
                <li>• Contact customer service to initiate a return.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
