import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata = {
  title: "TechGadgets - Revolutionary Electronic Gadgets",
  description: "Experience the future of technology with TechGadgets",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}


import './globals.css'