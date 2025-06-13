"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Upload, Info, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function CreateTokenPage() {
  const [step, setStep] = useState(1)
  const [tokenName, setTokenName] = useState("COLOSSEUM PENCIL")
  const [tokenSymbol, setTokenSymbol] = useState("JUDGE")
  const [targetRaise, setTargetRaise] = useState("3010")
  const [solPrice, setSolPrice] = useState("150")
  const [selectedConfig, setSelectedConfig] = useState(0)
  const [customSelected, setCustomSelected] = useState(false)
  const [activePhase, setActivePhase] = useState(1)
  const totalSteps = 3
  const [showSuccess, setShowSuccess] = useState(false)
  const [createdTokenId, setCreatedTokenId] = useState("")

  const configs = [
    {
      type: "Premium",
      score: "97%",
      supply: "4,663",
      raises: "20 SOL",
      usd: "$3,062",
      efficiency: "79.1%",
      priceIncrease: "1.4x",
      priceRange: "0.004829 → 0.006920 SOL",
      selected: selectedConfig === 0,
    },
    {
      type: "Standard",
      score: "94%",
      supply: "100,720",
      raises: "21 SOL",
      usd: "$3,147",
      efficiency: "78.6%",
      priceIncrease: "1.3x",
      priceRange: "0.000251 → 0.000331 SOL",
      selected: selectedConfig === 1,
    },
    {
      type: "Premium",
      score: "95%",
      supply: "4,698",
      raises: "21 SOL",
      usd: "$3,139",
      efficiency: "79.1%",
      priceIncrease: "1.4x",
      priceRange: "0.004914 → 0.007040 SOL",
      selected: selectedConfig === 2,
    },
    {
      type: "Premium",
      score: "94%",
      supply: "4,516",
      raises: "20 SOL",
      usd: "$2,991",
      efficiency: "81.0%",
      priceIncrease: "1.4x",
      priceRange: "0.004947 → 0.006812 SOL",
      selected: selectedConfig === 3,
    },
    {
      type: "Premium",
      score: "94%",
      supply: "4,662",
      raises: "21 SOL",
      usd: "$3,093",
      efficiency: "80.8%",
      priceIncrease: "1.4x",
      priceRange: "0.004948 → 0.006840 SOL",
      selected: selectedConfig === 4,
    },
    {
      type: "Premium",
      score: "94%",
      supply: "4,536",
      raises: "20 SOL",
      usd: "$3,045",
      efficiency: "81.9%",
      priceIncrease: "1.4x",
      priceRange: "0.005047 → 0.006830 SOL",
      selected: selectedConfig === 5,
    },
  ]

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const selectConfig = (index: number) => {
    setSelectedConfig(index)
    setCustomSelected(false)
  }

  const selectCustom = () => {
    setCustomSelected(true)
    setSelectedConfig(-1)
  }

  const handleCreateToken = () => {
    // Simulate token creation process
    setShowSuccess(true)
    setCreatedTokenId("tiamond-003") // This would be generated from the actual token creation
  }

  return (
    <div className="min-h-screen bg-[#0a0b14]">
      <div className="container py-8">
        <div className="mb-6">
          {step === 2 && tokenName ? (
            <h1 className="text-2xl font-bold">
              Token Creation Wizard{" "}
              <span className="text-gray-400">
                - {tokenName} ({tokenSymbol})
              </span>
            </h1>
          ) : (
            <h1 className="text-2xl font-bold">Token Creation Wizard</h1>
          )}
          <Progress
            value={(step / totalSteps) * 100}
            className="mt-4 h-2 bg-[#1a1c2e]"
            indicatorClassName="bg-blue-500"
          />
        </div>

        <div className="rounded-xl bg-[#111322] p-6">
          {step === 1 && (
            <>
              <h2 className="mb-6 text-2xl font-bold">Step 1: Token Basics</h2>

              <div className="mb-6 rounded-md bg-[#1a1c2e] p-4">
                <h3 className="mb-2 text-lg font-medium">Import RWA Data</h3>
                <p className="mb-4 text-sm text-gray-400">
                  Upload a JSON file with pre-filled RWA data and bonding curve parameters.
                </p>

                <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-gray-600 bg-[#111322] p-10">
                  <Upload className="mb-2 h-8 w-8 text-gray-400" />
                  <p className="mb-1 text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">JSON file with RWA data</p>
                  <div className="mt-4 h-4 w-4 rounded-full bg-blue-500"></div>
                </div>
              </div>

              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="tokenName" className="text-sm font-medium">
                    Token Name
                  </label>
                  <Input
                    id="tokenName"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    className="h-12 rounded-md border-0 bg-[#1a1c2e] text-white focus:ring-0"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tokenSymbol" className="text-sm font-medium">
                    Token Symbol
                  </label>
                  <Input
                    id="tokenSymbol"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    className="h-12 rounded-md border-0 bg-[#1a1c2e] text-white focus:ring-0"
                  />
                </div>
              </div>

              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <label htmlFor="targetRaise" className="text-sm font-medium">
                      Target Raise (USD)
                    </label>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="relative">
                    <Input
                      id="targetRaise"
                      value={targetRaise}
                      onChange={(e) => setTargetRaise(e.target.value)}
                      className="h-12 rounded-md border-0 bg-[#1a1c2e] pr-10 text-white focus:ring-0"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button className="text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">For asset purchase</p>
                  <p className="text-xs text-gray-400">≈ 20 SOL</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="solPrice" className="text-sm font-medium">
                    SOL Price (USD)
                  </label>
                  <Input
                    id="solPrice"
                    value={solPrice}
                    onChange={(e) => setSolPrice(e.target.value)}
                    className="h-12 rounded-md border-0 bg-[#1a1c2e] text-white focus:ring-0"
                  />
                </div>
              </div>

              <div className="mb-6 rounded-md bg-[#1a1c2e] p-4">
                <h3 className="mb-4 text-lg font-medium">Total Fundraise Projection</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Asset Purchase (80%)</p>
                    <p className="text-xl font-bold">$3,010.00</p>
                    <p className="text-sm text-gray-400">≈ 20 SOL</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">LP Provision (15%)</p>
                    <p className="text-xl font-bold">$564.38</p>
                    <p className="text-sm text-gray-400">≈ 4 SOL</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Protocol Fee (5%)</p>
                    <p className="text-xl font-bold">$188.13</p>
                    <p className="text-sm text-gray-400">≈ 1 SOL</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <p className="text-sm text-gray-400">Total Fundraise</p>
                  <p className="text-xl font-bold">$3,762.50</p>
                  <p className="text-sm text-gray-400">≈ 25 SOL</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 text-lg font-medium">Recommended Configurations</h3>
                <p className="mb-4 text-sm text-gray-400">
                  Based on your target raise, we've identified these optimal configurations:
                </p>

                <div className="mb-4 flex items-center justify-end gap-4">
                  <div className="relative inline-block w-48">
                    <select className="h-10 w-full appearance-none rounded-md bg-[#1a1c2e] px-4 py-2 pr-8 text-sm text-white focus:outline-none">
                      <option>Sort by: Optimal Balance</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <button className="text-sm text-gray-400 hover:text-white">Show All</button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {configs.map((config, index) => (
                    <div
                      key={index}
                      className={cn(
                        "cursor-pointer rounded-lg bg-[#1a1c2e] p-4 transition-all",
                        config.selected && "ring-2 ring-blue-500",
                      )}
                      onClick={() => selectConfig(index)}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span
                          className={cn(
                            "rounded-full px-2 py-1 text-xs font-medium",
                            config.type === "Premium" ? "bg-pink-900/30 text-pink-500" : "bg-blue-900/30 text-blue-500",
                          )}
                        >
                          {config.type}
                        </span>
                        <span className="text-sm text-green-500">Score: {config.score}</span>
                      </div>
                      <div className="mb-2 text-sm text-gray-400">Supply: {config.supply}</div>
                      <div className="mb-2 grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-400">Raises:</p>
                          <p className="font-medium">{config.raises}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">USD:</p>
                          <p className="font-medium">{config.usd}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Efficiency:</p>
                          <p className="font-medium">{config.efficiency}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Price Increase:</p>
                          <p className="font-medium">{config.priceIncrease}</p>
                        </div>
                      </div>
                      <div className="mb-2">
                        <p className="text-xs text-gray-400">Price Range:</p>
                        <p className="text-xs">{config.priceRange}</p>
                      </div>
                      <button
                        className={cn(
                          "mt-2 w-full rounded-md py-2 text-center text-sm font-medium",
                          config.selected ? "bg-white text-black" : "bg-transparent text-white hover:bg-gray-800",
                        )}
                      >
                        {config.selected ? "Selected" : "Select"}
                      </button>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm text-gray-400">
                  In the next step, you'll be able to select and customize these configurations.
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={nextStep} className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                  Continue to Bonding Curve
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <h2 className="mb-6 text-2xl font-bold">Step 2: Bonding Curve Configuration</h2>
                <h3 className="mb-4 text-lg font-medium">Select a Configuration</h3>

                <div className="mb-4 flex items-center justify-end gap-4">
                  <div className="relative inline-block w-48">
                    <select className="h-10 w-full appearance-none rounded-md bg-[#1a1c2e] px-4 py-2 pr-8 text-sm text-white focus:outline-none">
                      <option>Sort by: Score</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <button className="text-sm text-gray-400 hover:text-white">Show All</button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {configs.slice(0, 6).map((config, index) => (
                    <div
                      key={index}
                      className={cn(
                        "cursor-pointer rounded-lg border-2",
                        config.selected ? "border-blue-500 bg-[#1a1c2e]" : "border-transparent bg-[#1a1c2e]",
                      )}
                      onClick={() => selectConfig(index)}
                    >
                      <div className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span
                            className={cn(
                              "rounded-full px-2 py-1 text-xs font-medium",
                              config.type === "Premium"
                                ? "bg-pink-900/30 text-pink-500"
                                : "bg-blue-900/30 text-blue-500",
                            )}
                          >
                            {config.type}
                          </span>
                          <span className="text-sm text-green-500">Score: {config.score}</span>
                        </div>
                        <div className="mb-2 text-sm text-gray-400">Supply: {config.supply}</div>
                        <div className="mb-2 grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-400">Raises:</p>
                            <p className="font-medium">{config.raises}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">USD:</p>
                            <p className="font-medium">{config.usd}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Efficiency:</p>
                            <p className="font-medium">{config.efficiency}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Price Increase:</p>
                            <p className="font-medium">{config.priceIncrease}</p>
                          </div>
                        </div>
                        <div className="mb-2">
                          <p className="text-xs text-gray-400">Price Range:</p>
                          <p className="text-xs">{config.priceRange}</p>
                        </div>
                        <button
                          className={cn(
                            "mt-2 w-full rounded-md py-2 text-center text-sm font-medium",
                            config.selected ? "bg-white text-black" : "bg-transparent text-white hover:bg-gray-800",
                          )}
                        >
                          {config.selected ? "Selected" : "Select"}
                        </button>
                      </div>
                    </div>
                  ))}

                  <div
                    className={cn(
                      "cursor-pointer rounded-lg border-2",
                      customSelected ? "border-blue-500 bg-[#1a1c2e]" : "border-transparent bg-[#1a1c2e]",
                    )}
                    onClick={selectCustom}
                  >
                    <div className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-white">
                          Custom
                        </span>
                        <span className="text-sm text-gray-400">Manual Setup</span>
                      </div>
                      <p className="mb-4 text-sm text-gray-400">Customize all parameters</p>

                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-600">
                          <Plus className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-400">Manually configure all bonding curve parameters</p>
                      </div>

                      <button
                        className={cn(
                          "mt-2 w-full rounded-md py-2 text-center text-sm font-medium",
                          customSelected ? "bg-white text-black" : "bg-transparent text-white hover:bg-gray-800",
                        )}
                      >
                        {customSelected ? "Selected" : "Customize"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Always show custom configuration section */}
                <div className="mt-8 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="initialPriceNum" className="text-sm font-medium">
                        Initial Price Numerator
                      </label>
                      <Input
                        id="initialPriceNum"
                        defaultValue="45"
                        className="h-12 rounded-md border-0 bg-[#1a1c2e] text-white focus:ring-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="initialPriceDenom" className="text-sm font-medium">
                        Initial Price Denominator
                      </label>
                      <Input
                        id="initialPriceDenom"
                        defaultValue="9319"
                        className="h-12 rounded-md border-0 bg-[#1a1c2e] text-white focus:ring-0"
                      />
                      <p className="text-xs text-gray-400">Initial Price: 0.004829 SOL</p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="slopeNum" className="text-sm font-medium">
                        Slope Numerator
                      </label>
                      <Input
                        id="slopeNum"
                        defaultValue="4"
                        className="h-12 rounded-md border-0 bg-[#1a1c2e] text-white focus:ring-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="slopeDenom" className="text-sm font-medium">
                        Slope Denominator
                      </label>
                      <Input
                        id="slopeDenom"
                        defaultValue="3271074"
                        className="h-12 rounded-md border-0 bg-[#1a1c2e] text-white focus:ring-0"
                      />
                      <p className="text-xs text-gray-400">Slope: 0.00000122 SOL per token</p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="totalSupply" className="text-sm font-medium">
                        Total Supply
                      </label>
                      <Input
                        id="totalSupply"
                        defaultValue="4663"
                        className="h-12 rounded-md border-0 bg-[#1a1c2e] text-white focus:ring-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="bootstrapPercentage" className="text-sm font-medium">
                        Bootstrap Percentage
                      </label>
                      <Input
                        id="bootstrapPercentage"
                        defaultValue="1771"
                        className="h-12 rounded-md border-0 bg-[#1a1c2e] text-white focus:ring-0"
                      />
                      <p className="text-xs text-gray-400">17.71% of tokens sold with gentler slope</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="customPricing"
                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <label htmlFor="customPricing" className="ml-2 text-sm font-medium">
                        Use Custom Pricing Phases
                      </label>
                    </div>

                    <div className="rounded-md bg-[#1a1c2e] p-4">
                      <div className="mb-4 flex space-x-1">
                        <button
                          className={cn(
                            "rounded-md px-4 py-2 text-sm font-medium",
                            activePhase === 1 ? "bg-blue-600 text-white" : "bg-[#111322] text-gray-400",
                          )}
                          onClick={() => setActivePhase(1)}
                        >
                          Phase 1
                        </button>
                        <button
                          className={cn(
                            "rounded-md px-4 py-2 text-sm font-medium",
                            activePhase === 2 ? "bg-blue-600 text-white" : "bg-[#111322] text-gray-400",
                          )}
                          onClick={() => setActivePhase(2)}
                        >
                          Phase 2
                        </button>
                        <button
                          className={cn(
                            "rounded-md px-4 py-2 text-sm font-medium",
                            activePhase === 3 ? "bg-blue-600 text-white" : "bg-[#111322] text-gray-400",
                          )}
                          onClick={() => setActivePhase(3)}
                        >
                          Phase 3
                        </button>
                        <button
                          className={cn(
                            "rounded-md px-4 py-2 text-sm font-medium",
                            activePhase === 4 ? "bg-blue-600 text-white" : "bg-[#111322] text-gray-400",
                          )}
                          onClick={() => setActivePhase(4)}
                        >
                          Phase 4
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="startPercentage" className="text-sm font-medium">
                            Start Percentage
                          </label>
                          <Input
                            id="startPercentage"
                            defaultValue="0"
                            className="h-12 rounded-md border-0 bg-[#111322] text-white focus:ring-0"
                          />
                          <p className="text-xs text-gray-400">0.00% of total supply</p>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="slopeAdjustment" className="text-sm font-medium">
                            Slope Adjustment
                          </label>
                          <Input
                            id="slopeAdjustment"
                            defaultValue="0,5"
                            className="h-12 rounded-md border-0 bg-[#111322] text-white focus:ring-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Improved Bonding Curve Chart */}
                  <div className="rounded-md bg-[#1a1c2e] p-4">
                    <div className="relative h-80 w-full rounded bg-[#111322] p-4">
                      {/* Y-axis labels */}
                      <div className="absolute left-2 top-4 flex h-72 flex-col justify-between text-xs text-gray-400">
                        <span>0.008</span>
                        <span>0.006</span>
                        <span>0.004</span>
                        <span>0.002</span>
                        <span>0</span>
                      </div>

                      {/* Y-axis title */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-400">
                        Price (SOL)
                      </div>

                      {/* X-axis labels */}
                      <div className="absolute bottom-2 left-12 right-4 flex justify-between text-xs text-gray-400">
                        <span>0</span>
                        <span>2</span>
                        <span>4</span>
                        <span>6</span>
                        <span>9</span>
                        <span>11</span>
                        <span>13</span>
                        <span>15</span>
                        <span>17</span>
                        <span>19</span>
                        <span>21</span>
                        <span>24</span>
                        <span>27</span>
                        <span>30</span>
                        <span>33</span>
                        <span>36</span>
                        <span>39</span>
                        <span>42</span>
                        <span>45</span>
                        <span>48</span>
                        <span>51</span>
                        <span>54</span>
                        <span>61</span>
                        <span>64</span>
                        <span>67</span>
                        <span>70</span>
                        <span>73</span>
                        <span>76</span>
                        <span>79</span>
                        <span>82</span>
                        <span>85</span>
                        <span>88</span>
                        <span>91</span>
                        <span>94</span>
                        <span>97</span>
                        <span>100</span>
                      </div>

                      {/* X-axis title */}
                      <div className="absolute bottom-0 right-4 text-xs text-gray-400">Tokens Sold (%)</div>

                      {/* Chart area */}
                      <div className="absolute left-12 top-4 h-72 w-[calc(100%-4rem)]">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          {/* Grid lines */}
                          <defs>
                            <pattern id="grid" width="10" height="20" patternUnits="userSpaceOnUse">
                              <path
                                d="M 10 0 L 0 0 0 20"
                                fill="none"
                                stroke="#374151"
                                strokeWidth="0.5"
                                opacity="0.3"
                              />
                            </pattern>
                          </defs>
                          <rect width="100" height="100" fill="url(#grid)" />

                          {/* Bonding curve */}
                          <path
                            d="M0,85 C5,82 10,80 15,78 C20,76 25,74 30,72 C35,70 40,68 45,66 C50,64 55,62 60,58 C65,54 70,50 75,46 C80,42 85,38 90,34 C95,30 100,26"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md bg-[#1a1c2e] p-4">
                    <h3 className="mb-4 text-lg font-medium">Fundraising Target vs. Projected Raise</h3>

                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-sm text-gray-400">Target Total Raise:</p>
                        <p className="text-2xl font-bold">25 SOL</p>
                        <p className="text-sm text-gray-400">Asset Purchase: 20 SOL (80%)</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">Projected Actual Raise:</p>
                        <p className="text-2xl font-bold text-red-500">20 SOL</p>
                        <p className="text-sm text-gray-400">Asset Purchase: 16 SOL (80%)</p>
                      </div>
                    </div>

                    <div className="my-4">
                      <p className="mb-1 text-sm text-gray-400">Fundraising Accuracy:</p>
                      <div className="h-2 w-full rounded-full bg-gray-700">
                        <div className="h-2 w-[81.4%] rounded-full bg-red-500"></div>
                      </div>
                      <div className="mt-1 flex justify-end text-xs text-gray-400">18.6% under target</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Target Asset Purchase:</p>
                        <p className="font-medium">20 SOL</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Projected Asset Purchase:</p>
                        <p className="font-medium">16 SOL</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Difference:</p>
                        <p className="font-medium text-red-500">4 SOL less</p>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="rounded-md bg-[#111322] p-3">
                        <h4 className="mb-2 text-blue-400">Price Information</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Initial Price:</span>
                            <span>0.004829 SOL</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Final Price (80%):</span>
                            <span>0.006920 SOL</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Price Increase:</span>
                            <span>1.43x</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md bg-[#111322] p-3">
                        <h4 className="mb-2 text-blue-400">Fundraising</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">SOL Raised (80%):</span>
                            <span>20.41 SOL</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">USD Raised:</span>
                            <span>$3061.55</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Avg Price:</span>
                            <span>0.005471 SOL</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md bg-[#111322] p-3">
                        <h4 className="mb-2 text-blue-400">Valuation</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">FDV:</span>
                            <span>32.27 SOL</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">At 80% Sold:</span>
                            <span>25.82 SOL</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tokens for LP:</span>
                            <span>933</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  className="rounded-md border border-gray-600 bg-transparent px-6 py-2 text-white hover:bg-gray-800"
                >
                  Back to Basics
                </Button>
                <Button onClick={nextStep} className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                  Continue to Meteora LP
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="mb-6 text-2xl font-bold">Step 3: Meteora LP Configuration</h2>

              <div className="mb-6 rounded-xl bg-[#1a1c2e] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Meteora DAMMv2 Configuration Simulator</h3>
                  <Button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                    Import Bonding Curve Data
                  </Button>
                </div>

                <p className="mb-6 text-sm text-gray-400">
                  Configure and visualize optimal pool settings before migration. The simulator helps you find the best
                  liquidity distribution for your token and provides performance estimates based on your parameters.
                </p>

                {/* Quote Token Selection */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium">Quote Token</label>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>1 SOL = 150.00 USDC</span>
                      <Button size="sm" className="h-6 rounded bg-blue-600 px-2 text-xs text-white hover:bg-blue-700">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">SOL</Button>
                    <Button
                      variant="outline"
                      className="rounded-md border-gray-600 bg-transparent px-4 py-2 text-white hover:bg-gray-800"
                    >
                      USDC
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    Select the quote token. This will affect prices, decimals, and calculations. The exchange rate is
                    used when converting between tokens.
                  </p>
                </div>

                {/* Pool Configuration */}
                <div className="mb-6">
                  <h4 className="mb-4 text-lg font-medium text-blue-400">Pool Configuration</h4>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Total Token Supply (6 decimals)</label>
                      <Input
                        defaultValue="4663000000"
                        className="h-12 rounded-md border-0 bg-[#111322] text-white focus:ring-0"
                      />
                      <p className="text-xs text-gray-400">Human-readable: 4,663 tokens</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Migrated Token Amount</label>
                      <Input
                        defaultValue="932600000"
                        className="h-12 rounded-md border-0 bg-[#111322] text-white focus:ring-0"
                      />
                      <p className="text-xs text-gray-400">20.0% of total supply</p>
                      <p className="text-xs text-gray-400">Human-readable: 932.6 tokens</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Counter Pair Amount (SOL)</label>
                      <Input
                        defaultValue="3.061551902402697"
                        className="h-12 rounded-md border-0 bg-[#111322] text-white focus:ring-0"
                      />
                      <p className="text-xs text-gray-400">Used for initial liquidity provision</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <label className="text-sm font-medium">Initial Price</label>
                    <Input
                      defaultValue="0.006920357044811582"
                      className="h-12 rounded-md border-0 bg-[#111322] text-white focus:ring-0"
                    />
                    <p className="text-xs text-gray-400">
                      0.006920357044811582 tokens per SOL <span className="text-blue-400">0.0069 SOL per token</span>
                    </p>
                  </div>
                </div>

                {/* Bin Configuration */}
                <div className="mb-6">
                  <h4 className="mb-4 text-lg font-medium text-blue-400">Bin Configuration</h4>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium">Bin Step (basis points)</label>
                        <div className="relative">
                          <input type="range" min="1" max="100" defaultValue="25" className="w-full" />
                          <div className="mt-2 flex justify-between text-xs text-gray-400">
                            <span>1 (tight)</span>
                            <span>50</span>
                            <span>100 (wide)</span>
                          </div>
                        </div>
                        <div className="mt-2 rounded-md bg-[#111322] p-3">
                          <p className="text-sm">
                            Current setting: <span className="font-medium">25 BPS</span>
                          </p>
                          <p className="text-sm">
                            Price change per bin: <span className="font-medium">0.50%</span>
                          </p>
                          <p className="text-sm">
                            Total bins in range: <span className="font-medium">~74</span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">Fee BPS</label>
                        <div className="relative">
                          <input type="range" min="1" max="100" defaultValue="100" className="w-full" />
                          <div className="mt-2 flex justify-between text-xs text-gray-400">
                            <span>1 (0.01%)</span>
                            <span>25 (0.25%)</span>
                            <span>100 (1%)</span>
                          </div>
                        </div>
                        <div className="mt-2 rounded-md bg-[#111322] p-3">
                          <p className="text-sm">
                            Current setting: <span className="font-medium">100 BPS = 1.00%</span>
                          </p>
                          <p className="text-sm">
                            Est. daily fees: <span className="font-medium">1.35 SOL</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium">Price Range</label>
                        <div className="grid gap-2 md:grid-cols-2">
                          <div>
                            <label className="text-xs text-gray-400">Min Price (SOL)</label>
                            <Input
                              defaultValue="0.006228321340330424"
                              className="h-10 rounded-md border-0 bg-[#111322] text-white focus:ring-0"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-400">Max Price (SOL)</label>
                            <Input
                              defaultValue="0.008996464158255056"
                              className="h-10 rounded-md border-0 bg-[#111322] text-white focus:ring-0"
                            />
                          </div>
                        </div>

                        <div className="mt-2 rounded-md bg-[#111322] p-3">
                          <p className="text-xs text-gray-400">Price Range Visualization:</p>
                          <div className="mt-1 h-2 w-full rounded-full bg-gray-700">
                            <div className="h-2 w-1/2 rounded-full bg-blue-500"></div>
                          </div>
                          <p className="mt-1 text-xs text-gray-400">Range: 10.0% below to 30.0% above current price</p>
                        </div>

                        <Button className="mt-2 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">
                          Optimize Price Range
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium">Liquidity Distribution</label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="rounded-md border-gray-600 bg-transparent px-4 py-2 text-white hover:bg-gray-800"
                      >
                        Uniform
                      </Button>
                      <Button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Concentrated
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-md border-gray-600 bg-transparent px-4 py-2 text-white hover:bg-gray-800"
                      >
                        Custom
                      </Button>
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-medium">Concentration Factor</label>
                      <div className="relative">
                        <input type="range" min="1" max="5" step="0.1" defaultValue="2.0" className="w-full" />
                        <div className="mt-2 flex justify-between text-xs text-gray-400">
                          <span>More spread out</span>
                          <span className="font-medium">2.0</span>
                          <span>More concentrated</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulation Results */}
                <div className="mb-6">
                  <h4 className="mb-4 text-lg font-medium">Simulation Results</h4>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-md bg-[#111322] p-4">
                      <h5 className="mb-2 font-medium">Liquidity Distribution</h5>
                      <p className="mb-4 text-xs text-gray-400">
                        Shows how tokens are spread across price ranges (SOL)
                      </p>

                      <div className="h-48 w-full rounded bg-[#0a0b14] p-4">
                        <div className="flex h-full items-end justify-center space-x-1">
                          {Array.from({ length: 20 }, (_, i) => (
                            <div
                              key={i}
                              className="w-2 bg-blue-500"
                              style={{
                                height: `${Math.random() * 80 + 20}%`,
                                opacity: i === 10 ? 1 : 0.6,
                              }}
                            />
                          ))}
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-gray-400">
                          <span>0.006564</span>
                          <span>0.007381</span>
                          <span>0.008990</span>
                        </div>
                        <div className="mt-1 text-center text-xs text-gray-400">Price (SOL)</div>
                        <div className="mt-1 text-center text-xs text-blue-400">■ Liquidity (tokens)</div>
                      </div>
                    </div>

                    <div className="rounded-md bg-[#111322] p-4">
                      <h5 className="mb-2 font-medium">Price Impact</h5>
                      <p className="mb-4 text-xs text-gray-400">Shows price slippage for different trade sizes</p>

                      <div className="h-48 w-full rounded bg-[#0a0b14] p-4">
                        <div className="relative h-full">
                          <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-gray-400">
                            <span>50</span>
                            <span>30</span>
                            <span>15</span>
                            <span>0</span>
                          </div>
                          <div className="ml-8 h-full">
                            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <path
                                d="M0,95 L25,95 L50,95 L75,95 L100,95"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2"
                              />
                              <circle cx="25" cy="95" r="2" fill="#3b82f6" />
                              <circle cx="50" cy="95" r="2" fill="#3b82f6" />
                              <circle cx="75" cy="95" r="2" fill="#3b82f6" />
                              <circle cx="100" cy="95" r="2" fill="#3b82f6" />
                            </svg>
                          </div>
                          <div className="mt-2 flex justify-between text-xs text-gray-400">
                            <span>0.0%</span>
                            <span>0.0%</span>
                            <span>0.0%</span>
                            <span>0.0%</span>
                            <span>0.0%</span>
                          </div>
                          <div className="mt-1 text-center text-xs text-blue-400">→ Price Impact (%)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optimal Configuration */}
                <div className="mb-6 rounded-md bg-[#111322] p-4">
                  <h4 className="mb-4 text-lg font-medium">Optimal Configuration</h4>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h5 className="mb-3 font-medium">Pool Parameters</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bin Step:</span>
                          <span>25</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Fee BPS:</span>
                          <span>100 (1.00%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Price Range:</span>
                          <span>0.006228 - 0.008996 SOL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Initial Liquidity:</span>
                          <span>932,600,000 tokens</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Single-sided:</span>
                          <span>No</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="mb-3 font-medium">Performance Estimates</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Expected Daily Fees:</span>
                          <span>1.35 SOL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Expected Weekly Fees:</span>
                          <span>9.43 SOL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Max Sell Price Impact (10%):</span>
                          <span>6.83%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Export Configuration
                  </Button>
                </div>
              </div>

              {/* Launch Summary */}
              <div className="mb-6 rounded-xl bg-[#1a1c2e] p-6">
                <h3 className="mb-6 text-xl font-bold">Launch Summary</h3>

                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="mb-4 text-lg font-medium text-blue-400">Token Configuration</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-400">Name: </span>
                        <span>{tokenName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Symbol: </span>
                        <span>{tokenSymbol}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Total Supply: </span>
                        <span>4,663 tokens</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Initial Price: </span>
                        <span>0.004829 SOL</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Final Price (80%): </span>
                        <span>0.006920 SOL</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Migration Threshold: </span>
                        <span>80% (3,730 tokens)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-4 text-lg font-medium text-blue-400">SOL Allocation</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-400">Total Projected Raise: </span>
                        <span>20.41 SOL</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Protocol Fee (5%): </span>
                        <span>1.02 SOL</span>
                      </div>
                      <div>
                        <span className="text-gray-400">LP Allocation (15%): </span>
                        <span>3.06 SOL</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Asset Purchase (80%): </span>
                        <span>16.33 SOL</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Tokens for LP: </span>
                        <span>933 tokens</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SOL Allocation Breakdown */}
                <div className="mt-6">
                  <h5 className="mb-2 text-sm font-medium">SOL Allocation Breakdown</h5>
                  <div className="h-4 w-full rounded-full bg-gray-700 overflow-hidden">
                    <div className="flex h-full">
                      <div className="bg-red-500" style={{ width: "5%" }}></div>
                      <div className="bg-blue-500" style={{ width: "15%" }}></div>
                      <div className="bg-green-500" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-400">
                    <span>
                      5%
                      <br />
                      Protocol
                    </span>
                    <span>
                      15%
                      <br />
                      LP
                    </span>
                    <span>
                      80%
                      <br />
                      Asset Purchase
                    </span>
                  </div>
                </div>

                {/* Target vs. Projected */}
                <div className="mt-6 rounded-md bg-[#111322] p-4">
                  <h5 className="mb-4 font-medium">Target vs. Projected</h5>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-400">Target Asset Purchase:</p>
                      <p className="text-xl font-bold">$3,009.98 (20 SOL)</p>
                      <p className="text-xs text-gray-400">From initial fundraising goal</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Projected Asset Purchase:</p>
                      <p className="text-xl font-bold text-red-500">$2,449.24 (16 SOL)</p>
                      <p className="text-xs text-gray-400">80% of projected actual raise</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-1 text-sm text-gray-400">Accuracy:</p>
                    <div className="h-2 w-full rounded-full bg-gray-700">
                      <div className="h-2 w-[81.4%] rounded-full bg-red-500"></div>
                    </div>
                    <div className="mt-1 flex justify-end text-xs text-gray-400">18.6% under target</div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 text-sm text-gray-400">Liquidity Breakdown:</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-gray-400">Target Liquidity Allocation:</p>
                        <p className="font-medium">4 SOL</p>
                        <p className="text-xs text-gray-400">15% of total fundraise (from asset purchase target)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Projected Liquidity Allocation:</p>
                        <p className="font-medium text-red-500">3 SOL</p>
                        <p className="text-xs text-gray-400">15% of projected actual fundraise</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  className="rounded-md border border-gray-600 bg-transparent px-6 py-2 text-white hover:bg-gray-800"
                >
                  Back to Bonding Curve
                </Button>
                <Button
                  onClick={handleCreateToken}
                  className="rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700"
                >
                  Create Token
                </Button>
              </div>
            </>
          )}

          {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="mx-4 w-full max-w-md rounded-xl bg-[#111322] p-8 text-center">
                <div className="mb-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                    <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Token Created Successfully!</h2>
                  <p className="mt-2 text-gray-400">
                    Your RWA token "{tokenName}" ({tokenSymbol}) has been successfully created and deployed on Solana.
                  </p>
                </div>

                <div className="mb-6 rounded-md bg-[#1a1c2e] p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Token Name:</span>
                      <span className="text-white">{tokenName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Symbol:</span>
                      <span className="text-white">{tokenSymbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Supply:</span>
                      <span className="text-white">4,663 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Initial Price:</span>
                      <span className="text-white">0.004829 SOL</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700">
                    <Link href={`/token/${createdTokenId}`}>View Token Details</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-md border-gray-600 bg-transparent py-3 text-white hover:bg-gray-800"
                  >
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
