import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle } from "lucide-react"

interface TokenInfoProps {
  token: {
    name: string
    description: string
    price: string
    marketCap: string
    fullyDilutedMarketCap: string
    tokensSold: string
    totalSupply: string
    realWorldValue: string
    tokenAddress: string
    image: string
  }
}

export default function TokenInfo({ token }: TokenInfoProps) {
  return (
    <div className="rounded-xl bg-dark-200 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <h2 className="text-xl font-bold">Token Information</h2>
        </div>
        <Badge variant="purple">MIGRATED</Badge>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex items-start gap-4">
          <Image
            src={token.image || "/placeholder.svg"}
            alt={token.name}
            width={120}
            height={120}
            className="rounded-md"
          />
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-gray-400">Token</span>
              <Badge variant="success" className="bg-green-500/10">
                <CheckCircle className="mr-1 h-3 w-3" /> Verified
              </Badge>
            </div>
            <h3 className="mb-2 text-xl font-bold">{token.name}</h3>
            <p className="text-sm text-gray-400">{token.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="text-sm text-gray-400">Current Price</div>
          <div className="text-xl font-bold">{token.price}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Tokens Sold</div>
          <div className="text-xl font-bold">{token.tokensSold}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Circulating Market Cap</div>
          <div className="text-xl font-bold">{token.marketCap}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Fully Diluted Market Cap</div>
          <div className="text-xl font-bold">{token.fullyDilutedMarketCap}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Total Supply</div>
          <div className="text-xl font-bold">{token.totalSupply}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Real world value</div>
          <div className="text-xl font-bold">{token.realWorldValue}</div>
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <div className="text-sm text-gray-400">Token Address</div>
          <div className="overflow-hidden text-ellipsis text-sm">{token.tokenAddress}</div>
        </div>
      </div>
    </div>
  )
}
