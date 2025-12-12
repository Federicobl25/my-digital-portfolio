import Link from "next/link"
import { Shield, Lock, Server, Database, AlertTriangle, FileCode, Mail, Phone, MapPin, Linkedin, Github, Download, ArrowRight, CheckCircle2, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsletterForm } from "@/components/newsletter-form"
import { HeroImage, BlogCardImage } from "@/components/home-images"
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
                  <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">Security Expert & Threat Analyst</span>
                </p>
                <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                  🔒 SOC Analyst | 🛡️ Incident Response | 🎯 Threat Hunting
                </p>
                <p className="text-base text-gray-400 max-w-lg leading-relaxed">
                  5+ years protecting critical infrastructure. Expert in FortiSIEM, incident response, and security operations. Based in Melbourne 🇦🇺
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="#contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/50 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Let's Work Together
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 flex items-center gap-2">
                    Read Insights
                    <ArrowRight className="h-4 w-4" />
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
            <HeroImage />
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Why Choose Me</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto"></div>
            </div>
            
            {/* Impact Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-primary/20 to-blue-500/10 p-6 rounded-lg border border-primary/30 backdrop-blur">
                <Target className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">30% Faster Responses</h3>
                <p className="text-gray-400 text-sm">Improved incident response times through optimized processes and automation</p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-blue-500/10 p-6 rounded-lg border border-primary/30 backdrop-blur">
                <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">20+ Dashboards Created</h3>
                <p className="text-gray-400 text-sm">Custom monitoring solutions for critical infrastructure visibility and compliance</p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-blue-500/10 p-6 rounded-lg border border-primary/30 backdrop-blur">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Proven Expertise</h3>
                <p className="text-gray-400 text-sm">7 certifications + hands-on experience with enterprise security tools</p>
              </div>
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
              <div className="bg-gradient-to-br from-primary/5 to-slate-900/30 p-6 rounded-lg border border-primary/30 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/30 transition-all backdrop-blur">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">SOC Analyst Level 2</h3>
                    <p className="text-primary font-semibold text-sm">COINSA SAS</p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full font-medium">Sep 2022 - Oct 2023</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">📍 Bogotá, Colombia</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Improved response times by 30% through enhanced incident handling processes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Managed critical security incidents and technical reporting across client environments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Administered Fortinet infrastructure (FortiSIEM, FortiGate, FortiAnalyzer)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">SOC Analyst Level 1</h3>
                    <p className="text-primary font-semibold text-sm">COINSA SAS</p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full font-medium">Mar 2022 - Sep 2022</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">📍 Bogotá, Colombia</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Monitored 20+ dashboards for real-time infrastructure supervision</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Developed 40+ use case templates improving notification speeds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Generated compliance reports and handled incident documentation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">Medical Accounts Analyst</h3>
                    <p className="text-primary font-semibold text-sm">La Equidad Seguros OC</p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full font-medium">Feb 2020 - Mar 2022</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">📍 Bogotá, Colombia</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Managed provider networks and pricing structures across national healthcare services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Led data analysis and pricing strategies to optimize service costs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Designed nationwide provider network aligned with regulatory requirements</span>
                  </li>
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
                <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> Security Tools
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Fortinet Ecosystem</p>
                    <div className="flex flex-wrap gap-2">
                      {["FortiSIEM", "FortiAnalyzer", "FortiGate"].map((tool) => (
                        <span key={tool} className="inline-block bg-primary/30 text-primary px-3 py-1.5 rounded-md text-sm border border-primary/50 backdrop-blur">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Infrastructure</p>
                    <div className="flex flex-wrap gap-2">
                      {["Cisco", "VMware", "Citrix"].map((tool) => (
                        <span key={tool} className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-md text-sm border border-blue-500/40 backdrop-blur">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">SIEM & Monitoring</p>
                    <div className="flex flex-wrap gap-2">
                      {["Splunk"].map((tool) => (
                        <span key={tool} className="inline-block bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-md text-sm border border-cyan-500/40 backdrop-blur">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 backdrop-blur">
                <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" /> Core Competencies
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Security Monitoring & Analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Incident Response & Management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Vulnerability Assessment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Threat Detection & Hunting</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Security Policy Development</span>
                  </li>
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
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 backdrop-blur">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> Certifications
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">Fortinet NSE 1, 2, 3</p>
                      <p className="text-gray-400 text-xs">Network Security Associate</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">Ethical Hacker Essentials (EHE)</p>
                      <p className="text-gray-400 text-xs">EC-Council</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">AWS Academy Cloud</p>
                      <p className="text-gray-400 text-xs">Cloud Foundations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">Cybersecurity for Businesses</p>
                      <p className="text-gray-400 text-xs">EC-Council</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">Seguridad de la Información</p>
                      <p className="text-gray-400 text-xs">Ministry of Education</p>
                    </div>
                  </div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Let's Connect</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-cyan-400 mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 mb-4">
              Have a security question? Need a consultation? Ready to collaborate?
            </p>
            <p className="text-base text-gray-400 mb-12">
              I'm available for freelance work, consulting, and full-time opportunities.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur group">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <Link href="mailto:federicobl93@gmail.com" className="text-primary hover:text-primary/80 transition-colors text-sm">
                  federicobl93@gmail.com
                </Link>
              </div>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur group">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Phone</h3>
                <Link href="tel:+61423562487" className="text-primary hover:text-primary/80 transition-colors text-sm">
                  +61 423 562 487
                </Link>
              </div>
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur group">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Location</h3>
                <p className="text-gray-400 text-sm">
                  Hawthorn East, VIC 🇦🇺
                </p>
              </div>
            </div>
            <div className="mt-10 pt-10 border-t border-slate-700">
              <p className="text-gray-400 text-sm mb-4">⚡ Open to:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-primary text-sm font-medium">Freelance Projects</span>
                <span className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-primary text-sm font-medium">Security Consulting</span>
                <span className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-primary text-sm font-medium">Full-time Roles</span>
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
                  <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 rounded-lg overflow-hidden border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur h-full flex flex-col">
                    <div className="relative overflow-hidden h-48 bg-slate-800">
                      <BlogCardImage
                        src={post.coverImage}
                        title={post.title}
                        postId={post.id}
                        slug={post.slug}
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-white group-hover:text-primary transition-colors line-clamp-2 mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-400 mt-auto mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
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
