"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [solPrice, setSolPrice] = useState("$146.83")
  const [collatPrice, setCollatPrice] = useState("$0.0237")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-dark-100 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Collaterize Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold">Evera</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-dark-200 px-3 py-1">
            <span className="text-sm font-medium">SOL: {solPrice}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-dark-200 px-3 py-1">
            <span className="text-sm font-medium">COLLAT: {collatPrice}</span>
          </div>
          <Button className="rounded-full bg-purple-600 hover:bg-purple-700">Select Wallet</Button>
        </div>
      </div>
    </header>
  )
}
