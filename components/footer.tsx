import Link from "next/link"
import Image from "next/image"
import { Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-dark-100 py-12">
      <div className="container grid gap-8 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Collaterize Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold">Evera</span>
          </div>
          <p className="text-sm text-gray-400">Launch and trade liquid real-world assets instantly</p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="#" className="hover:text-white">
                Website
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                RWA Explorer
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Mobile App
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="#" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Docs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Fees
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 flex flex-col justify-between border-t border-gray-800 pt-8 sm:flex-row">
        <p className="text-sm text-gray-400">© 2025 Evera. All rights reserved.</p>
        <div className="mt-4 flex space-x-4 sm:mt-0">
          <Link href="#" className="text-gray-400 hover:text-white">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
