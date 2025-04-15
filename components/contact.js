"use client"

import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    })

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Email Us</h4>
                  <p className="text-gray-600">support@techgadgets.com</p>
                  <p className="text-gray-600">sales@techgadgets.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Call Us</h4>
                  <p className="text-gray-600">Customer Support: (800) 123-4567</p>
                  <p className="text-gray-600">Sales Inquiries: (800) 765-4321</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Visit Us</h4>
                  <p className="text-gray-600">123 Tech Boulevard</p>
                  <p className="text-gray-600">San Francisco, CA 94105</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <div>Monday - Friday:</div>
                <div>9:00 AM - 6:00 PM PST</div>
                <div>Saturday:</div>
                <div>10:00 AM - 4:00 PM PST</div>
                <div>Sunday:</div>
                <div>Closed</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>

            {formStatus.submitted && (
              <div
                className={`p-4 mb-6 rounded-lg ${formStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] hover:shadow-teal-500/50"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
