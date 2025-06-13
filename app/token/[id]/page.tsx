import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import TokenChart from "@/components/token-chart"
import TokenInfo from "@/components/token-info"
import LiveActivity from "@/components/live-activity"
import TopHolders from "@/components/top-holders"

interface TokenPageProps {
  params: {
    id: string
  }
}

export default function TokenPage({ params }: TokenPageProps) {
  // In a real app, you would fetch this data based on the ID
  const token = {
    id: params.id,
    name: "Tiamond #003 - Sapphire",
    symbol: "S003",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "GIA certified natural sapphire, professionally cut and polished. Stored in Swiss Alps vault, insured by Lloyd's London. Ethically sourced and UN compliant.",
    price: "$0.0134",
    marketCap: "$13.44K",
    fullyDilutedMarketCap: "$13.44K",
    tokensSold: "999.99K",
    totalSupply: "999.99K",
    realWorldValue: "$4.70K",
    tokenAddress: "6BBtbfd2hRVUjJpahHsQzD7qvu3YoQrYsdwdDKmet8a",
    migrated: true,
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center gap-4">
        <Image src={token.image || "/placeholder.svg"} alt={token.name} width={80} height={80} className="rounded-md" />
        <div>
          <h1 className="text-3xl font-bold">{token.name}</h1>
          <p className="text-gray-400">{token.symbol}</p>
        </div>
        <div className="ml-auto">
          <Badge variant="default" className="ml-auto bg-dark-200 text-white">
            Token
          </Badge>
        </div>
      </div>

      <div className="mb-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-dark-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">MC: $13.44K</div>
                <div className="flex items-center gap-2">
                  <span>0.00100000 SOL</span>
                  <span className="text-green-500">$0.200000 USD</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 rounded-md bg-dark-300">
                  1m
                </Button>
                <Button variant="outline" size="sm" className="h-8 rounded-md bg-dark-300">
                  PRICE/MCAP
                </Button>
                <Button variant="outline" size="sm" className="h-8 rounded-md bg-dark-300">
                  S003/SOL
                </Button>
              </div>
            </div>
            <TokenChart />
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl bg-dark-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-medium">Liquidity Pool Trading</h3>
              </div>
              <Badge variant="purple">MIGRATED</Badge>
            </div>
            <p className="text-sm text-gray-400">This RWA has migrated to liquidity pool for trading</p>
          </div>

          <div className="rounded-xl bg-dark-200 p-4">
            <h3 className="mb-4 text-lg font-medium">Trade S003</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <p className="text-sm text-gray-400">Connect Wallet</p>
                <p className="text-sm">Connect to start secure trading</p>
              </div>
              <Button className="rounded-full bg-purple-600 hover:bg-purple-700">Select Wallet</Button>
            </div>
          </div>

          <TopHolders />
        </div>
      </div>

      <div className="space-y-8">
        <TokenInfo token={token} />
        <LiveActivity />
      </div>
    </div>
  )
}
