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
    <div className="flex flex-col bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)'}}></div>
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 80% 80%, rgba(79, 172, 254, 0.2) 0%, transparent 50%)'}}></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-lg border border-primary/20 w-fit">
                  <p className="text-sm font-medium text-primary">Welcome to my portfolio</p>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-slate-900 dark:text-white">Federico Bustos</span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent">Cybersecurity Expert</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                  SOC Analyst & Systems Engineer specializing in threat monitoring, incident response, and infrastructure security. Based in Melbourne, Australia.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="#contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button size="lg" variant="outline" className="dark:border-slate-600 dark:text-slate-300">
                    Read Insights
                  </Button>
                </Link>
              </div>
              <div className="flex gap-4 pt-2">
                <Link href="https://linkedin.com/in/federico-bustos-systems-engineer" target="_blank" title="LinkedIn">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://github.com/federicobustos" target="_blank" title="GitHub">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="mailto:federicobl93@gmail.com" title="Email">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
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
                  className="rounded-2xl object-cover shadow-2xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-slate-900 relative">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto"></div>
            </div>
            <div className="prose dark:prose-invert prose-lg max-w-none">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                As a Systems Engineer with a strong cybersecurity foundation, I bring hands-on experience in event monitoring, incident response, and vulnerability management across diverse infrastructures. During my time at COINSA SAS, I transitioned from Level 1 to Level 2 SOC Analyst, leading initiatives that enhanced threat detection accuracy and incident response times by up to 30%.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                I've worked closely with Fortinet technologies—FortiSIEM, FortiAnalyzer, and FortiGate—developing tailored dashboards, automating processes, and ensuring secure environments for clients in highly sensitive sectors. My passion lies in driving security excellence through continuous learning, process optimization, and effective collaboration across multidisciplinary teams.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5+</div>
                <p className="text-slate-600 dark:text-slate-400">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">7</div>
                <p className="text-slate-600 dark:text-slate-400">Certifications</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">30%</div>
                <p className="text-slate-600 dark:text-slate-400">Improvement Achieved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section id="experience" className="w-full py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 relative">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">Professional Experience</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto"></div>
            </div>
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">SOC Analyst Level 2</h3>
                    <p className="text-primary font-medium">COINSA SAS</p>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">Sep 2022 - Oct 2023</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-3">Bogotá, Colombia</p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>✓ Improved response times by 30% through enhanced incident handling processes</li>
                  <li>✓ Managed critical security incidents and technical reporting across client environments</li>
                  <li>✓ Administered Fortinet infrastructure (FortiSIEM, FortiGate, FortiAnalyzer)</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">SOC Analyst Level 1</h3>
                    <p className="text-primary font-medium">COINSA SAS</p>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">Mar 2022 - Sep 2022</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-3">Bogotá, Colombia</p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>✓ Monitored 20+ dashboards for real-time infrastructure supervision</li>
                  <li>✓ Developed 40+ use case templates improving notification speeds</li>
                  <li>✓ Generated compliance reports and handled incident documentation</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Medical Accounts Analyst</h3>
                    <p className="text-primary font-medium">La Equidad Seguros OC</p>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">Feb 2020 - Mar 2022</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-3">Bogotá, Colombia</p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
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
      <section id="skills" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-slate-900 relative">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">Technical Skills</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> Security Tools
                </h3>
                <div className="space-y-2">
                  {["FortiSIEM", "FortiAnalyzer", "FortiGate", "Cisco", "VMware", "Citrix", "Splunk"].map((tool) => (
                    <div key={tool} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mr-2 mb-2 border border-primary/20">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" /> Core Competencies
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
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
      <section id="education" className="w-full py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 relative">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">Education & Certifications</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" /> Education
                </h3>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white">Bachelor's in Systems Engineering</h4>
                  <p className="text-primary text-sm font-medium">Universidad EAN, Colombia</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">2018 - 2023</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> Certifications
                </h3>
                <div className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
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
      <section id="contact" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-slate-900 relative">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">
              Ready to discuss cybersecurity, systems engineering, or collaboration opportunities? Let's connect.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Email</h3>
                <Link href="mailto:federicobl93@gmail.com" className="text-primary hover:underline">
                  federicobl93@gmail.com
                </Link>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Phone</h3>
                <Link href="tel:+61423562487" className="text-primary hover:underline">
                  +61 423 562 487
                </Link>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Location</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Hawthorn East, VIC, Australia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 dark:from-slate-950 dark:via-primary/5 dark:to-slate-950 relative overflow-hidden">
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
      <section className="w-full py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 relative">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">Latest Insights</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto mb-4"></div>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                In-depth articles on cybersecurity threats, best practices, and industry trends.
              </p>
            </div>

            {dbError ? (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400">Unable to load blog posts. Please try again later.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-primary/50 transition-all">
                      <div className="aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <Image
                          src={post.coverImage || "/placeholder.svg?height=400&width=600&query=cybersecurity"}
                          width={600}
                          height={400}
                          alt={post.title}
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{post.excerpt}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-3">{formatDate(post.createdAt)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-8">
              <Link href="/blog">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
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
