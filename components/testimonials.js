"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Tech Enthusiast",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      content:
        "This gadget has completely transformed how I interact with technology. The speed and battery life are unmatched by anything else on the market.",
      rating: 5,
      product: "UltraPhone X",
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      content:
        "As someone who works with technology daily, I'm extremely impressed by the performance and reliability. It's become an essential part of my workflow.",
      rating: 5,
      product: "MechKey Pro",
    },
    {
      name: "Emily Rodriguez",
      role: "Digital Creator",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      content:
        "The seamless integration with my other devices has made my creative process so much more efficient. I can't imagine going back to my old setup.",
      rating: 4,
      product: "AirBuds Ultra",
    },
    {
      name: "David Kim",
      role: "Business Professional",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      content:
        "The security features give me peace of mind when handling sensitive client information. Plus, the battery lasts through my longest workdays.",
      rating: 5,
      product: "SmartWatch Pro",
    },
    {
      name: "Jessica Patel",
      role: "Graphic Designer",
      image: "https://randomuser.me/api/portraits/women/90.jpg",
      content:
        "The print quality is exceptional and the wireless functionality makes it so convenient to use from anywhere in my studio. Highly recommended!",
      rating: 5,
      product: "PrintMaster 3000",
    },
    {
      name: "Thomas Wilson",
      role: "Student",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      content:
        "The battery life on this smartwatch is incredible. I can go almost a full week without charging, even with heavy use during my workouts.",
      rating: 4,
      product: "SmartWatch Pro",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from people who have experienced the difference.
          </p>
        </div>

        {/* Desktop Testimonials Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group hover:border-teal-400/30 hover:shadow-[0_5px_15px_rgba(20,184,166,0.2)]"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-teal-200 group-hover:border-teal-400 transition-colors"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-teal-600 mb-3">Product: {testimonial.product}</p>
              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>

        {/* Mobile Testimonial Carousel */}
        <div className="md:hidden relative">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center mb-4">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-teal-200"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-500 text-sm">{testimonials[currentIndex].role}</p>
              </div>
            </div>
            <div className="flex mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonials[currentIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-teal-600 mb-3">Product: {testimonials[currentIndex].product}</p>
            <p className="text-gray-600">{testimonials[currentIndex].content}</p>
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:border-teal-400 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:border-teal-400 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200 hover:border-teal-400/30 transition-colors">
            <div className="flex items-center">
              <div className="flex mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-gray-700 font-medium">4.9 out of 5 stars from over 1,000 reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
