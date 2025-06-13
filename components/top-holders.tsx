import { RefreshCw, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TopHolders() {
  return (
    <div className="rounded-xl bg-dark-200 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h3 className="text-lg font-medium">Top Holders</h3>
          <Badge className="bg-purple-600 text-white">Jupiter</Badge>
        </div>
        <RefreshCw className="h-4 w-4 cursor-pointer text-gray-400" />
      </div>

      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Users className="mb-4 h-12 w-12 text-gray-500" />
        <p className="mb-1 text-gray-400">No holder data available</p>
        <p className="text-sm text-gray-500">Jupiter API will show holders once available</p>
      </div>
    </div>
  )
}
