import Link from "next/link"
import Image from "next/image"
import { Shield, Lock, Server, Database, AlertTriangle, FileCode, Mail, Phone, MapPin, Linkedin, Github, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsletterForm } from "@/components/newsletter-form"
import { db, blogPosts } from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function Home() {
  // Fetch the latest 3 blog posts with error handling
  let latestPosts: { id: string; slug: string; title: string; excerpt: string; coverImage?: string; createdAt: string }[] = []
  let dbError = false

  try {
    latestPosts = (await db.select().from(blogPosts).orderBy(blogPosts.createdAt).limit(3)).map(post => ({
      id: post.id.toString(),
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      coverImage: post.coverImage || undefined,
      createdAt: post.createdAt ? post.createdAt.toISOString() : ""
    }))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    dbError = true
  }

  return (
    <div className="flex flex-col bg-slate-950">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
        {/* Animated background with network effect */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black"></div>
          
          {/* Circuit/Network pattern overlay */}
          <svg className="absolute w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="50" y="50" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10 50 L90 50 M50 10 L50 90" stroke="currentColor" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" />
                <circle cx="50" cy="50" r="3" fill="currentColor" />
              </pattern>
              <pattern id="grid" x="40" y="40" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#circuit)" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5" />
          </svg>

          {/* Gradient orbs */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl opacity-15"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-primary/20 rounded-lg border border-primary/40 w-fit backdrop-blur">
                  <p className="text-sm font-medium text-primary">Welcome to my portfolio</p>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                  Federico Bustos
                </h1>
                <p className="text-2xl md:text-3xl font-light">
                  <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">Cybersecurity Expert</span>
                </p>
                <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                  SOC Analyst & Systems Engineer specializing in threat monitoring, incident response, and infrastructure security. Based in Melbourne, Australia.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="#contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/50">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                    Read Insights
                  </Button>
                </Link>
              </div>
              <div className="flex gap-4 pt-2">
                <Link href="https://linkedin.com/in/federico-bustos-systems-engineer" target="_blank" title="LinkedIn">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/20 hover:text-primary text-gray-400">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://github.com/federicobustos" target="_blank" title="GitHub">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/20 hover:text-primary text-gray-400">
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="mailto:federicobl93@gmail.com" title="Email">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/20 hover:text-primary text-gray-400">
                    <Mail className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-square">
                <Image
                  src="/images/foto.png"
                  width={400}
                  height={400}
                  alt="Federico Bustos"
                  className="rounded-2xl object-cover shadow-2xl shadow-primary/50 border border-primary/20"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="50" y="50" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="rgba(59, 130, 246, 0.3)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">About Me</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto"></div>
            </div>
            <div className="prose dark:prose-invert prose-lg max-w-none text-gray-300">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                As a Systems Engineer with a strong cybersecurity foundation, I bring hands-on experience in event monitoring, incident response, and vulnerability management across diverse infrastructures. During my time at COINSA SAS, I transitioned from Level 1 to Level 2 SOC Analyst, leading initiatives that enhanced threat detection accuracy and incident response times by up to 30%.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I've worked closely with Fortinet technologies—FortiSIEM, FortiAnalyzer, and FortiGate—developing tailored dashboards, automating processes, and ensuring secure environments for clients in highly sensitive sectors. My passion lies in driving security excellence through continuous learning, process optimization, and effective collaboration across multidisciplinary teams.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-700">
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg border border-primary/20 backdrop-blur">
                <div className="text-4xl font-bold text-primary mb-2">5+</div>
                <p className="text-gray-400">Years Experience</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg border border-primary/20 backdrop-blur">
                <div className="text-4xl font-bold text-primary mb-2">7</div>
                <p className="text-gray-400">Certifications</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg border border-primary/20 backdrop-blur">
                <div className="text-4xl font-bold text-primary mb-2">30%</div>
                <p className="text-gray-400">Improvement Achieved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section id="experience" className="w-full py-16 md:py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Professional Experience</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto"></div>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">SOC Analyst Level 2</h3>
                    <p className="text-primary font-medium">COINSA SAS</p>
                  </div>
                  <span className="text-sm text-gray-400">Sep 2022 - Oct 2023</span>
                </div>
                <p className="text-gray-400 mb-3">Bogotá, Colombia</p>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ Improved response times by 30% through enhanced incident handling processes</li>
                  <li>✓ Managed critical security incidents and technical reporting across client environments</li>
                  <li>✓ Administered Fortinet infrastructure (FortiSIEM, FortiGate, FortiAnalyzer)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">SOC Analyst Level 1</h3>
                    <p className="text-primary font-medium">COINSA SAS</p>
                  </div>
                  <span className="text-sm text-gray-400">Mar 2022 - Sep 2022</span>
                </div>
                <p className="text-gray-400 mb-3">Bogotá, Colombia</p>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ Monitored 20+ dashboards for real-time infrastructure supervision</li>
                  <li>✓ Developed 40+ use case templates improving notification speeds</li>
                  <li>✓ Generated compliance reports and handled incident documentation</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">Medical Accounts Analyst</h3>
                    <p className="text-primary font-medium">La Equidad Seguros OC</p>
                  </div>
                  <span className="text-sm text-gray-400">Feb 2020 - Mar 2022</span>
                </div>
                <p className="text-gray-400 mb-3">Bogotá, Colombia</p>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ Managed provider networks and pricing structures across national healthcare services</li>
                  <li>✓ Led data analysis and pricing strategies to optimize service costs</li>
                  <li>✓ Designed nationwide provider network aligned with regulatory requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Technical Skills</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 backdrop-blur">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> Security Tools
                </h3>
                <div className="space-y-2">
                  {["FortiSIEM", "FortiAnalyzer", "FortiGate", "Cisco", "VMware", "Citrix", "Splunk"].map((tool) => (
                    <div key={tool} className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm mr-2 mb-2 border border-primary/40 backdrop-blur">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 backdrop-blur">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" /> Core Competencies
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ Security Monitoring & Analysis</li>
                  <li>✓ Incident Response & Management</li>
                  <li>✓ Vulnerability Assessment</li>
                  <li>✓ Threat Detection & Hunting</li>
                  <li>✓ Security Policy Development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="w-full py-16 md:py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Education & Certifications</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" /> Education
                </h3>
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 backdrop-blur">
                  <h4 className="font-bold text-white">Bachelor's in Systems Engineering</h4>
                  <p className="text-primary text-sm font-medium">Universidad EAN, Colombia</p>
                  <p className="text-gray-400 text-sm">2018 - 2023</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> Certifications
                </h3>
                <div className="space-y-2 text-gray-300 text-sm bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 backdrop-blur">
                  <p>✓ Fortinet NSE 1, 2, 3 - Network Security Associate</p>
                  <p>✓ Ethical Hacker Essentials (EHE) - EC-Council</p>
                  <p>✓ Cybersecurity for Businesses - EC-Council</p>
                  <p>✓ AWS Academy Cloud Foundations</p>
                  <p>✓ Seguridad de la Información - MoE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Get In Touch</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 mb-12">
              Ready to discuss cybersecurity, systems engineering, or collaboration opportunities? Let's connect.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <Link href="mailto:federicobl93@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
                  federicobl93@gmail.com
                </Link>
              </div>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Phone</h3>
                <Link href="tel:+61423562487" className="text-primary hover:text-primary/80 transition-colors">
                  +61 423 562 487
                </Link>
              </div>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Location</h3>
                <p className="text-gray-400">
                  Hawthorn East, VIC, Australia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-primary/20 via-blue-600/20 to-cyan-600/20 relative overflow-hidden border-y border-primary/30">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%, transparent 75%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1)), linear-gradient(45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%, transparent 75%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1))', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px'}}></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Stay Informed</h2>
            <p className="text-lg text-gray-300 mb-8">
              Subscribe to my newsletter for insights on cybersecurity trends, threat analysis, and security best practices.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Latest Insights</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto mb-4"></div>
              <p className="text-lg text-gray-300">
                In-depth articles on cybersecurity threats, best practices, and industry trends.
              </p>
            </div>

            {dbError ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Unable to load blog posts. Please try again later.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 rounded-lg overflow-hidden border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
                      <div className="aspect-video w-full overflow-hidden bg-slate-800">
                        <Image
                          src={post.coverImage || "/placeholder.svg?height=400&width=600&query=cybersecurity"}
                          width={600}
                          height={400}
                          alt={post.title}
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{post.excerpt}</p>
                        <p className="text-xs text-gray-500 mt-3">{formatDate(post.createdAt)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-8">
              <Link href="/blog">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/50">
                  View All Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
