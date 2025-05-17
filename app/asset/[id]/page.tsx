"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building, Calendar, Download, ExternalLink, FileText, Info, Shield } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { mockAssets } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function AssetDetailPage() {
  const { id } = useParams()
  const { toast } = useToast()
  const [buyAmount, setBuyAmount] = useState("")
  const [stakeAmount, setStakeAmount] = useState("")

  // In a real app, you would fetch this data from an API
  const asset = mockAssets.find((a) => a.id === id) || mockAssets[0]

  const handleBuy = () => {
    toast({
      title: "Purchase successful!",
      description: `You have purchased ${buyAmount} ${asset.symbol}`,
    })
  }

  const handleStake = () => {
    toast({
      title: "Staking successful!",
      description: `You have staked ${stakeAmount} ${asset.symbol}`,
    })
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/explore" className="hover:text-purple-400">
                Explore
              </Link>
              <span>/</span>
              <span>{asset.type}</span>
              <span>/</span>
              <span className="text-white">{asset.name}</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold text-white">{asset.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-400">
                <Building className="h-4 w-4" />
                <span>{asset.institution}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="mb-8 overflow-hidden rounded-xl border border-purple-800 bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
            <div className="aspect-video bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
              <div className="text-4xl font-bold text-white">{asset.symbol}</div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="w-full border-b border-gray-800 bg-transparent">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500 rounded-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500 rounded-none"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="stakers"
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500 rounded-none"
              >
                Stakers
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-white">Description</h2>
                  <p className="text-gray-400">{asset.description}</p>
                </div>

                <div>
                  <h2 className="mb-2 text-xl font-semibold text-white">Asset Details</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-gray-800 p-4">
                      <div className="text-sm text-gray-400">Total Supply</div>
                      <div className="text-lg font-medium text-white">{asset.totalSupply.toLocaleString()}</div>
                    </div>
                    <div className="rounded-lg border border-gray-800 p-4">
                      <div className="text-sm text-gray-400">Price per Token</div>
                      <div className="text-lg font-medium text-white">${asset.priceUsd.toFixed(2)}</div>
                    </div>
                    <div className="rounded-lg border border-gray-800 p-4">
                      <div className="text-sm text-gray-400">Total Staked</div>
                      <div className="text-lg font-medium text-white">{asset.stakedAmount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-lg border border-gray-800 p-4">
                      <div className="text-sm text-gray-400">Annual Yield</div>
                      <div className="text-lg font-medium text-white">{asset.annualYield}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="documents" className="pt-6">
              <div className="space-y-4">
                <h2 className="mb-4 text-xl font-semibold text-white">Official Documents</h2>

                {asset.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-purple-400" />
                      <div>
                        <div className="font-medium text-white">{doc.name}</div>
                        <div className="text-sm text-gray-400">Added on {new Date(doc.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-purple-800">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="stakers" className="pt-6">
              <div className="space-y-4">
                <h2 className="mb-4 text-xl font-semibold text-white">Top Stakers</h2>

                <div className="space-y-4">
                  {asset.topStakers.map((staker, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-gray-800 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-900 text-white">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {staker.address.slice(0, 6)}...{staker.address.slice(-4)}
                          </div>
                          <div className="text-sm text-gray-400">
                            {staker.amount.toLocaleString()} ETH
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">
                          ${(staker.amount * asset.priceUsd).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-sm text-gray-400">
                          {((staker.amount / asset.stakedAmount) * 100).toFixed(2)}% of total
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-purple-800 bg-black/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Buy Tokens</CardTitle>
              <CardDescription>Invest in this asset</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Price per Token</span>
                  <span className="font-medium text-white">${asset.priceUsd.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Available</span>
                  <span className="font-medium text-white">
                    {(asset.totalSupply - asset.stakedAmount).toLocaleString()} {asset.symbol}
                  </span>
                </div>
                <Separator className="my-2 bg-gray-800" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Minimum Purchase</span>
                  <span className="font-medium text-white">10 {asset.symbol}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buyAmount" className="text-white">Amount</Label>
                  <div className="relative">
                    <Input
                      id="buyAmount"
                      type="number"
                      placeholder="0"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      className="pr-16 border-purple-800 bg-black/60 text-white"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-sm text-gray-400">ETH</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-purple-900/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Total</span>
                    <span className="font-medium text-white">
                      ${buyAmount ? (Number.parseFloat(buyAmount) * asset.priceUsd).toFixed(2) : "0.00"}
                    </span>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                      Buy Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-purple-800 bg-black/95">
                    <DialogHeader>
                      <DialogTitle>Confirm Purchase</DialogTitle>
                      <DialogDescription>
                        You are about to purchase {asset.symbol} tokens from {asset.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Amount</span>
                        <span className="font-medium">
                          {buyAmount || "0"} {asset.symbol}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Price per Token</span>
                        <span className="font-medium">${asset.priceUsd.toFixed(2)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Total</span>
                        <span className="text-lg font-bold">
                          ${buyAmount ? (Number.parseFloat(buyAmount) * asset.priceUsd).toFixed(2) : "0.00"}
                        </span>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" className="border-gray-700">
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                        onClick={handleBuy}
                      >
                        Confirm Purchase
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-800 bg-black/60 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="text-white">Stake Tokens</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80">Staking tokens helps validate the asset and provides you with annual yield</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CardDescription>Earn {asset.annualYield}% annual yield</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-gray-400">Total Staked</span>
                    <span className="font-medium text-white">
                      {asset.stakedAmount.toLocaleString()} {asset.symbol}
                    </span>
                  </div>
                  <Progress value={(asset.stakedAmount / asset.totalSupply) * 100} className="h-2 bg-gray-800" />
                  <div className="mt-1 text-right text-xs text-gray-400">
                    {((asset.stakedAmount / asset.totalSupply) * 100).toFixed(2)}% of total supply
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-cyan-900/20 p-3">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm text-gray-300">
                    {asset.stakedAmount > asset.totalSupply * 0.5
                      ? "This asset has a high trust level"
                      : "This asset is in the validation process"}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stakeAmount" className="text-white">Stake Amount</Label>
                  <div className="relative">
                    <Input
                      id="stakeAmount"
                      type="number"
                      placeholder="0"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="pr-16 border-cyan-800 bg-black/60 text-white"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-sm text-gray-400">ETH</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-cyan-900/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Estimated Annual Yield</span>
                    <span className="font-medium text-white">
                      {stakeAmount
                        ? ((Number.parseFloat(stakeAmount) * asset.priceUsd * asset.annualYield) / 100).toFixed(2)
                        : "0.00"}{" "}
                      USD
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  onClick={handleStake}
                >
                  Stake Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-black/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Contract Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">Contract Address</div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm text-white">
                      {asset.contractAddress.slice(0, 18)}...{asset.contractAddress.slice(-4)}
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Blockchain</div>
                  <div className="text-white">{asset.blockchain}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Tokenization Date</div>
                  <div className="text-white">{new Date(asset.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
