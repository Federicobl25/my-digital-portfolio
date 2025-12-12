import Link from "next/link"
import { Shield, Github, Linkedin, Mail, ExternalLink } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-primary/20 bg-slate-950">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Shield className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-lg font-bold text-white">Federico</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Cybersecurity expert specializing in SOC operations, threat analysis, and infrastructure security.
            </p>
            <div className="flex gap-3 pt-2">
              <Link href="https://linkedin.com/in/federico-bustos-systems-engineer" target="_blank" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://github.com/federicobustos" target="_blank" className="text-gray-400 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="mailto:federicobl93@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
                  About <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-gray-400 hover:text-primary transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources/tools" className="text-gray-400 hover:text-primary transition-colors">
                  Security Tools
                </Link>
              </li>
              <li>
                <Link href="/resources/guides" className="text-gray-400 hover:text-primary transition-colors">
                  Security Guides
                </Link>
              </li>
              <li>
                <Link href="/resources/checklists" className="text-gray-400 hover:text-primary transition-colors">
                  Checklists
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/privacy" className="text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-gray-400 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-gray-400 hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} Federico Bustos. All rights reserved.</p>
            <p className="text-xs text-gray-500">Built with Next.js, Tailwind CSS, and TypeScript</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
