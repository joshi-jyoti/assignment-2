"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our payment gateway.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) is available for an additional fee. International shipping times vary by location, typically 7-14 business days.",
    },
    {
      question: "Do your products come with a warranty?",
      answer:
        "Yes, all our products come with a standard 1-year limited warranty that covers manufacturing defects. Extended warranty options are available for purchase during checkout.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all unused products in their original packaging. Refunds are processed within 5-7 business days after we receive the returned item.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary depending on the destination. Import duties and taxes may apply and are the responsibility of the customer.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website or directly through the carrier's website.",
    },
  ]

  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-4 rounded-lg flex justify-between items-center transition-all duration-300 ${
                  openIndex === index
                    ? "bg-teal-50 border-teal-200 shadow-sm"
                    : "bg-gray-50 border border-gray-100 hover:border-teal-200 hover:bg-teal-50/50"
                }`}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 mt-2" : "max-h-0"
                }`}
              >
                <div className="p-4 bg-white border border-gray-100 rounded-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
