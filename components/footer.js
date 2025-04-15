import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold flex items-center mb-4">
              <span className="text-teal-400">Tech</span>Gadgets
            </Link>
            <p className="text-gray-400 mb-4">
              Revolutionizing the way you interact with technology. Our mission is to create innovative products that
              enhance your digital life with cutting-edge features and sleek design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/smartwatch" className="text-gray-400 hover:text-teal-400 transition-colors">
                  SmartWatch Pro
                </Link>
              </li>
              <li>
                <Link href="/products/earphones" className="text-gray-400 hover:text-teal-400 transition-colors">
                  AirBuds Ultra
                </Link>
              </li>
              <li>
                <Link href="/products/keyboard" className="text-gray-400 hover:text-teal-400 transition-colors">
                  MechKey Pro
                </Link>
              </li>
              <li>
                <Link href="/products/smartphone" className="text-gray-400 hover:text-teal-400 transition-colors">
                  UltraPhone X
                </Link>
              </li>
              <li>
                <Link href="/products/printer" className="text-gray-400 hover:text-teal-400 transition-colors">
                  PrintMaster 3000
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#faq" className="text-gray-400 hover:text-teal-400 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#shipping" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  User Manuals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Support Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} TechGadgets. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
