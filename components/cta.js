import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Experience the Future?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of satisfied customers who have already transformed their digital experience with our
            revolutionary gadgets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-teal-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 text-center hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            >
              Browse Products
            </Link>
            <Link
              href="#testimonials"
              className="bg-transparent hover:bg-white/10 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 border-2 border-white hover:border-white/80 text-center"
            >
              See Testimonials
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold">10K+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">4.9</div>
              <div className="text-white/80">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-white/80">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
