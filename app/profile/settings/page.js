"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsRedirect() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Redirect to the main settings page
    router.push("/settings")

    // Show toast notification
    toast({
      title: "Redirecting",
      description: "Taking you to the settings page...",
      variant: "default",
    })
  }, [router, toast])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Redirecting to settings...</p>
    </div>
  )
}
