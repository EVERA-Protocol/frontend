import { Badge } from "@/components/ui/badge"
import { RefreshCw, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LiveActivity() {
  const transactions = [
    {
      type: "Buy",
      amount: "7.2K S003",
      price: "@ 0.0000914 SOL",
      wallet1: "36jL...MLwk",
      wallet2: "3geL...DCDN",
      time: "17 minutes ago",
    },
    {
      type: "Buy",
      amount: "0.00 S003",
      price: "@ 0.000000 SOL",
      wallet1: "Rxha...Rc1b",
      wallet2: "J7Um...4cTe",
      time: "about 1 hour ago",
    },
    {
      type: "Buy",
      amount: "0.00 S003",
      price: "@ 0.000000 SOL",
      wallet1: "3w9R...VFDe",
      wallet2: "2QfB...WW2T",
      time: "about 1 hour ago",
    },
    {
      type: "Buy",
      amount: "0.00 S003",
      price: "@ 0.000000 SOL",
      wallet1: "5nx1...WsYP",
      wallet2: "2QfB...WW2T",
      time: "about 1 hour ago",
    },
    {
      type: "Buy",
      amount: "0.00 S003",
      price: "@ 0.000000 SOL",
      wallet1: "3xGY...JSgz",
      wallet2: "2QfB...WW2T",
      time: "about 1 hour ago",
    },
  ]

  return (
    <div className="rounded-xl bg-dark-200 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-dark-300">
            <RefreshCw className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-bold">Live Activity - S003</h2>
          <Badge variant="purple" className="ml-2">
            MIGRATED
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-400">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span>LIVE</span>
        </div>
        <span>•</span>
        <span>DEX Trading</span>
        <span>•</span>
        <span>5 txs</span>
        <span>•</span>
        <span>Jupiter: 0</span>
        <span>•</span>
        <span>Updated 2 minutes ago</span>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4 rounded-md bg-dark-300 p-4">
        <div className="text-center">
          <div className="text-sm text-gray-400">Volume USD</div>
          <div className="text-xl font-bold">$96</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400">Volume SOL</div>
          <div className="text-xl font-bold">0.65</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400">Avg USD/tx</div>
          <div className="text-xl font-bold">$19</div>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <div key={index} className="flex items-center justify-between rounded-md bg-dark-300 p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dark-200 text-green-500">
                <ArrowUp className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-green-500">{tx.type}</span>
                  <span>{tx.amount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{tx.price}</span>
                  <span>•</span>
                  <span>{tx.wallet1}</span>
                  <span>•</span>
                  <span>{tx.wallet2}</span>
                </div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span>{tx.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
