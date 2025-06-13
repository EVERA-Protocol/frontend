import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"

export default function Home() {
  const projects = [
    {
      id: "tiamond-003",
      name: "Tiamond #003 - Sapphire",
      image: "/placeholder.svg?height=300&width=400",
      marketCap: "$13,682",
      migrated: true,
      description: "This token has successfully migrated to a liquidity pool",
    },
    {
      id: "haguenau",
      name: "Haguenau Commercial Unit",
      image: "/placeholder.svg?height=300&width=400",
      marketCap: "$32,634",
      migrated: false,
      progress: 15,
      tokensSold: "127,245,283.12",
      target: "800,000,000",
    },
    {
      id: "tiamond-04c1",
      name: "Tiamond #04C1 - Diamond",
      image: "/placeholder.svg?height=300&width=400",
      marketCap: "$5,135",
      migrated: true,
      description: "This token has successfully migrated to a liquidity pool",
    },
    {
      id: "solecooler",
      name: "Solecooler Bridge Funding",
      image: "/placeholder.svg?height=300&width=400",
      marketCap: "$23,391",
      migrated: true,
      description: "This token has successfully migrated to a liquidity pool",
    },
  ]

  return (
    <>
      <section className="relative py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-5xl space-y-4 text-left">
            <h2 className="text-xl font-medium text-gray-400">Internet Capital Markets</h2>
            <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
              Tokenize Everything,
              <br />
              on <span className="solana-gradient">Solana</span>.
            </h1>
            <p className="text-xl text-gray-400">Launch and trade liquid RWAs instantly.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700">
                <Link href="/create">Launch RWA</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Live</h2>
            <div className="flex gap-2 overflow-x-auto">
              <Button variant="ghost" className="rounded-full bg-dark-200 text-white hover:bg-dark-300">
                All
              </Button>
              <Button variant="ghost" className="rounded-full text-gray-400 hover:bg-dark-200 hover:text-white">
                Real Estate
              </Button>
              <Button variant="ghost" className="rounded-full text-gray-400 hover:bg-dark-200 hover:text-white">
                Equity
              </Button>
              <Button variant="ghost" className="rounded-full text-gray-400 hover:bg-dark-200 hover:text-white">
                Art Luxury
              </Button>
              <Button variant="ghost" className="rounded-full text-gray-400 hover:bg-dark-200 hover:text-white">
                Collectibles
              </Button>
              <Button variant="ghost" className="rounded-full text-gray-400 hover:bg-dark-200 hover:text-white">
                Exotic
              </Button>
              <Button variant="ghost" className="rounded-full text-gray-400 hover:bg-dark-200 hover:text-white">
                Digital
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
