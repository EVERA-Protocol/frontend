"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/file-upload"
import { ArrowRight, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

export default function MintPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    symbol: "",
    institutionName: "",
    institutionAddress: "",
    supportingDocs: null,
    totalSupply: "",
    pricePerRWA: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, supportingDocs: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    // Simulate successful submission
    toast({
      title: "Mint request successfully submitted",
      description: "Our team will review your request within 24-48 hours.",
    })
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Mint RWA Token</h1>
          <p className="mt-2 text-gray-400">Tokenize your real-world assets by filling out the form below</p>
        </div>

        <Card className="border-purple-800 bg-black/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Token Mint Form</CardTitle>
            <CardDescription>Complete all required information to start the tokenization process</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="symbol">RWA Symbol</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">Symbol for your RWA token, e.g., "RERA" for Real Estate RWA</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="symbol"
                    name="symbol"
                    placeholder="Example: RERA"
                    value={formData.symbol}
                    onChange={handleChange}
                    className="border-purple-800 bg-black/60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institutionName">Institution Name</Label>
                  <Input
                    id="institutionName"
                    name="institutionName"
                    placeholder="Your company or institution name"
                    value={formData.institutionName}
                    onChange={handleChange}
                    className="border-purple-800 bg-black/60"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institutionAddress">Institution Address</Label>
                <Input
                  id="institutionAddress"
                  name="institutionAddress"
                  placeholder="Full address of your institution"
                  value={formData.institutionAddress}
                  onChange={handleChange}
                  className="border-purple-800 bg-black/60"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Supporting Documents</Label>
                <FileUpload onFileChange={handleFileChange} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="totalSupply">Total RWA Supply</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">Total number of tokens to be issued</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="totalSupply"
                    name="totalSupply"
                    type="number"
                    placeholder="Example: 1000000"
                    value={formData.totalSupply}
                    onChange={handleChange}
                    className="border-purple-800 bg-black/60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="pricePerRWA">Price per RWA (USD)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">Initial price per token in USD</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="pricePerRWA"
                    name="pricePerRWA"
                    type="number"
                    step="0.01"
                    placeholder="Example: 1.00"
                    value={formData.pricePerRWA}
                    onChange={handleChange}
                    className="border-purple-800 bg-black/60"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Brief Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the asset to be tokenized"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-32 border-purple-800 bg-black/60"
                  required
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  Submit Mint Request <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start border-t border-purple-800 pt-6">
            <p className="text-sm text-gray-400">
              By submitting this form, you agree that the EVERA team will review your request and may contact you for
              additional information before proceeding with the tokenization process.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
