"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/file-upload"
import { ArrowRight, Info, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { formatUnits, parseUnits } from "ethers"
import { useAccount, useChainId, useWriteContract } from "wagmi"

// Sample ABI for the RWALaunchpad contract - replace with your actual ABI
const RWA_LAUNCHPAD_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "symbol", "type": "string" },
      { "internalType": "string", "name": "institutionName", "type": "string" },
      { "internalType": "string", "name": "institutionAddress", "type": "string" },
      { "internalType": "string", "name": "documentURI", "type": "string" },
      { "internalType": "string", "name": "imageURI", "type": "string" },
      { "internalType": "uint256", "name": "totalRWASupply", "type": "uint256" },
      { "internalType": "uint256", "name": "pricePerRWA", "type": "uint256" },
      { "internalType": "string", "name": "description", "type": "string" }
    ],
    "name": "createRWAToken",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function MintPage() {
  const { toast } = useToast()
  const [contractAddress, setContractAddress] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { address: userAddress, isConnected } = useAccount()
  const chainId = useChainId()
  const { writeContractAsync, isPending } = useWriteContract()
  
  // Access environment variable when component mounts
  useEffect(() => {
    setContractAddress(process.env.NEXT_PUBLIC_CONTRACT_RWA_LAUNCHPAD || "Not configured")
  }, [])
  
  const [formData, setFormData] = useState<{
    name: string;
    symbol: string;
    institutionName: string;
    institutionAddress: string;
    documentURI: string;
    imageURI: string;
    supportingDocs: File | null;
    totalSupply: string;
    pricePerRWA: string;
    description: string;
  }>({
    name: "",
    symbol: "",
    institutionName: "",
    institutionAddress: "",
    documentURI: "",
    imageURI: "",
    supportingDocs: null,
    totalSupply: "",
    pricePerRWA: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, supportingDocs: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (!isConnected) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet to submit the transaction.",
          variant: "destructive",
        })
        return
      }
      
      if (!contractAddress || contractAddress === "Not configured") {
        toast({
          title: "Contract not configured",
          description: "The RWA Launchpad contract address is not properly configured.",
          variant: "destructive",
        })
        return
      }
      
      // In a production app, we would upload the supportingDocs to IPFS or similar
      // and get back the documentURI and imageURI
      // For now, we'll use placeholder values if they're not provided
      const documentURI = formData.documentURI || "https://example.com/docs";
      const imageURI = formData.imageURI || "https://example.com/image.png";
      
      // Convert totalSupply and pricePerRWA to wei or appropriate units
      const totalSupplyBN = parseUnits(formData.totalSupply, 18)
      const pricePerRWABN = parseUnits(formData.pricePerRWA, 18)
      
      // Call the contract
      const tx = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: RWA_LAUNCHPAD_ABI,
        functionName: 'createRWAToken',
        args: [
          formData.name,
          formData.symbol,
          formData.institutionName,
          formData.institutionAddress,
          documentURI,
          imageURI,
          totalSupplyBN,
          pricePerRWABN,
          formData.description
        ]
      })
      
      toast({
        title: "Transaction submitted",
        description: `Transaction hash: ${tx.substring(0, 10)}...${tx.substring(tx.length - 6)}`,
      })
      
      // You might want to reset the form here
      // setFormData({...})
      
    } catch (error: any) {
      console.error("Error creating RWA token:", error)
      toast({
        title: "Error creating RWA token",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
                    <Label htmlFor="name" className="text-white">RWA Name</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">Name of your RWA token</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Example: RERA"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-purple-800 bg-black/60 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="symbol" className="text-white">RWA Symbol</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">Symbol for your RWA token, e.g., &#34;RERA&#34; for Real Estate RWA</p>
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
                    className="border-purple-800 bg-black/60 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institutionName" className="text-white">Institution Name</Label>
                  <Input
                    id="institutionName"
                    name="institutionName"
                    placeholder="Your company or institution name"
                    value={formData.institutionName}
                    onChange={handleChange}
                    className="border-purple-800 bg-black/60 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institutionAddress" className="text-white">Institution Address</Label>
                <Input
                  id="institutionAddress"
                  name="institutionAddress"
                  placeholder="Full address of your institution"
                  value={formData.institutionAddress}
                  onChange={handleChange}
                  className="border-purple-800 bg-black/60 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Supporting Documents</Label>
                <FileUpload onFileChange={handleFileChange} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="documentURI" className="text-white">Document URI</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">URL to supporting documentation (optional)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="documentURI"
                    name="documentURI"
                    placeholder="https://example.com/docs"
                    value={formData.documentURI}
                    onChange={handleChange}
                    className="border-purple-800 bg-black/60 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="imageURI" className="text-white">Image URI</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">URL to token image (optional)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="imageURI"
                    name="imageURI"
                    placeholder="https://example.com/image.png"
                    value={formData.imageURI}
                    onChange={handleChange}
                    className="border-purple-800 bg-black/60 text-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="totalSupply" className="text-white">Total RWA Supply</Label>
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
                    className="border-purple-800 bg-black/60 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="pricePerRWA" className="text-white">Price per RWA (USD)</Label>
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
                    className="border-purple-800 bg-black/60 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Brief Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the asset to be tokenized"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-32 border-purple-800 bg-black/60 text-white"
                  required
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                  disabled={isSubmitting || isPending || !isConnected}
                >
                  {(isSubmitting || isPending) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      Submit Mint Request <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                {!isConnected && (
                  <p className="mt-2 text-xs text-amber-500">Please connect your wallet to submit a mint request</p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start border-t border-purple-800 pt-6">
            <p className="text-sm text-gray-400">
              By submitting this form, you agree that the EVERA team will review your request and may contact you for
              additional information before proceeding with the tokenization process.
            </p>
            {contractAddress && (
              <div className="mt-4 text-xs text-gray-500">
                <span>Contract Address: {contractAddress}</span>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
