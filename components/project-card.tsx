import Link from "next/link"
import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    image: string
    marketCap: string
    migrated: boolean
    description?: string
    progress?: number
    tokensSold?: string
    target?: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/token/${project.id}`}>
      <div className="overflow-hidden rounded-xl bg-dark-200 transition-all hover:ring-1 hover:ring-purple-500">
        <div className="relative h-48 w-full">
          <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
          {project.migrated && (
            <div className="absolute right-2 top-2 rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-500">
              <CheckCircle className="mr-1 inline-block h-3 w-3" /> Migrated
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold">{project.name}</h3>
          <div className="mt-2">
            <div className="text-sm text-gray-400">Market Cap</div>
            <div className="text-lg font-bold text-white">{project.marketCap}</div>
          </div>

          {project.migrated ? (
            <div className="mt-4 rounded-md bg-dark-300 p-3">
              <div className="flex items-center text-green-500">
                <CheckCircle className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">Migrated to liquidity pool</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">{project.description}</p>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress to Migration</span>
                <span className="font-medium text-purple-400">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2 bg-dark-300" />
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{project.tokensSold} tokens sold</span>
                <span>{project.target} target</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
