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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 lg:py-28 xl:py-40 bg-gradient-to-b from-slate-900 via-slate-950 to-black relative overflow-hidden dark:bg-black">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-4 lg:grid-cols-[1fr_400px] lg:gap-6 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Federico Bustos</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 dark:text-gray-400">
                  Systems Engineer with a strong cybersecurity foundation
                </p>
                <p className="max-w-[600px] text-gray-300 dark:text-gray-400 md:text-base">
                  SOC Analyst | Cybersecurity & Threat Monitoring. Bringing hands-on experience in event monitoring, incident response, and vulnerability management. Fortinet Tools Expert building resilient digital ecosystems. Based in Melbourne, VIC.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Link href="#contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Contact Me
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Download CV
                </Button>
              </div>
              <div className="flex gap-4 pt-4">
                <Link href="https://linkedin.com/in/federico-bustos-systems-engineer" target="_blank">
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://github.com/federicobustos" target="_blank">
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="mailto:federicobl93@gmail.com">
                  <Button variant="ghost" size="icon">
                    <Mail className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[400px]">
                <Image
                  src="/images/foto.png"
                  width={400}
                  height={400}
                  alt="Federico Bustos"
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-5"></div>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-900 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* About Me Section */}
      <section id="about" className="w-full py-8 md:py-16 lg:py-20 bg-background relative overflow-hidden" style={{backgroundImage: 'url(/about-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="absolute inset-0 bg-background/75"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Comprehensive overview of my professional background and expertise
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <Card className="bg-background border-primary/20">
              <CardContent className="pt-6">
                <p className="text-base leading-relaxed mb-4">
                  As a Systems Engineer with a strong cybersecurity foundation, I bring hands-on experience in event monitoring, incident response, and vulnerability management across diverse infrastructures. During my time at COINSA SAS, I transitioned from Level 1 to Level 2 SOC Analyst, leading initiatives that enhanced threat detection accuracy and incident response times by up to 30%.
                </p>
                <p className="text-base leading-relaxed">
                  I've worked closely with Fortinet technologies—FortiSIEM, FortiAnalyzer, and FortiGate—developing tailored dashboards, automating processes, and ensuring secure environments for clients in highly sensitive sectors. My passion lies in driving security excellence through continuous learning, process optimization, and effective collaboration across multidisciplinary teams. I thrive in dynamic, results-oriented environments, and I'm always looking for new ways to build safer digital ecosystems.
                </p>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <p className="text-sm text-muted-foreground mt-1">Years Professional Experience</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">7</div>
                <p className="text-sm text-muted-foreground mt-1">Certifications</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">30%</div>
                <p className="text-sm text-muted-foreground mt-1">Improvement In Response Times</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section id="experience" className="w-full py-8 md:py-16 lg:py-20 bg-muted/40 relative overflow-hidden" style={{backgroundImage: 'url(/experience-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="absolute inset-0 bg-muted/50"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Professional Experience</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              My career journey in cybersecurity and systems engineering
            </p>
          </div>
          <div className="mx-auto max-w-4xl space-y-4">
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>SOC Analyst Level 2</CardTitle>
                    <CardDescription>COINSA SAS • September 2022 – October 2023 • 1 year 2 months</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">Bogotá, Colombia</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Achievements:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Improved response times by 30% through enhanced incident handling processes</li>
                    <li>• Managed critical security incidents and oversaw technical reporting across client environments</li>
                    <li>• Implemented monitoring dashboards that improved detection accuracy and incident response speed by 30%</li>
                    <li>• Administered Fortinet infrastructure including FortiSIEM, FortiGate, and FortiAnalyzer</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>SOC Analyst Level 1</CardTitle>
                    <CardDescription>COINSA SAS • March 2022 – September 2022 • 7 months</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">Bogotá, Colombia</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Achievements:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Monitored over 20 dashboards for real-time infrastructure supervision</li>
                    <li>• Developed over 40 use case templates, significantly improving notification speeds and operational efficiency</li>
                    <li>• Generated compliance reports and handled daily incident documentation</li>
                    <li>• Improved system performance by optimising hardware configuration and OS performance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Medical Accounts Analyst</CardTitle>
                    <CardDescription>La Equidad Seguros OC • February 2020 – March 2022 • 2 years 2 months</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">Bogotá, Colombia</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Achievements:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Managed provider networks and pricing structures across national healthcare services</li>
                    <li>• Led data analysis and pricing strategies to optimise service costs and streamline claims processing</li>
                    <li>• Designed and implemented a nationwide provider network aligned with regulatory requirements</li>
                    <li>• Contributed to cross-functional coordination between technical, operational, and customer service areas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full py-8 md:py-16 lg:py-20 bg-background relative overflow-hidden" style={{backgroundImage: 'url(/skills-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="absolute inset-0 bg-background/75"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Skills & Expertise</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Technical tools and security competencies I've developed
            </p>
          </div>
          <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-4">
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Technical Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {["FortiSIEM", "FortiAnalyzer", "FortiGate", "VMware", "Citrix", "Cisco", "MS Office", "Confluence", "SharePoint", "Excel", "Power BI"].map((tool) => (
                    <div key={tool} className="text-sm bg-primary/10 rounded px-3 py-2">
                      {tool}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Security Competencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Security Monitoring & Analysis</p>
                  <p>• Vulnerability Assessment</p>
                  <p>• Incident Response & Management</p>
                  <p>• Security Policy Development</p>
                  <p>• Threat Detection & Monitoring</p>
                  <p>• Security Training & Awareness</p>
                  <p>• Documentation & Reporting</p>
                  <p>• Compliance & Regulatory Standards</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="w-full py-8 md:py-16 lg:py-20 bg-muted/40 relative overflow-hidden" style={{backgroundImage: 'url(/education-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="absolute inset-0 bg-muted/60"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Education & Certifications</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Academic background and professional certifications
            </p>
          </div>
          <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-4">
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Bachelor's Degree in Systems Engineering</h4>
                  <p className="text-sm text-muted-foreground">Information Technology / Computer Systems Technology</p>
                  <p className="text-sm text-muted-foreground">Universidad EAN, Colombia</p>
                  <p className="text-sm text-primary font-medium">2018 - 2023</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Professional Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Fortinet NSE 1: Network Security Associate (April 2022)</p>
                  <p>• Fortinet NSE 2: Network Security Associate (April 2022)</p>
                  <p>• Fortinet NSE 3: Network Security Associate (July 2022)</p>
                  <p>• Ethical Hacker Essentials (EHE) - EC-Council (June 2023)</p>
                  <p>• Cybersecurity for Businesses - EC-Council (June 2023)</p>
                  <p>• AWS Academy Cloud Foundations (November 2022)</p>
                  <p>• Seguridad de la Información - MoE (November 2022)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-8 md:py-16 lg:py-20 bg-background relative overflow-hidden" style={{backgroundImage: 'url(/contact-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="absolute inset-0 bg-background/75"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get In Touch</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Interested in working together? Feel free to reach out through any of these channels
            </p>
          </div>
          <div className="mx-auto max-w-2xl">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-background border-primary/20">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <Mail className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <Link href="mailto:federicobl93@gmail.com" className="text-primary hover:underline">
                    federicobl93@gmail.com
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-background border-primary/20">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <Phone className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <Link href="tel:+61423562487" className="text-primary hover:underline">
                    0423 562 487
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-background border-primary/20">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <MapPin className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">Hawthorn East, VIC, Australia</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-8 md:py-16 lg:py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-black relative overflow-hidden dark:bg-black">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Newsletter</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Stay Updated on Cybersecurity Trends
              </h2>
              <p className="max-w-[600px] text-gray-300 dark:text-gray-400 md:text-xl/relaxed">
                Subscribe to our newsletter for the latest cybersecurity news, tips, and insights.
              </p>
            </div>
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-5"></div>
      </section>

      {/* Recent Blog Posts */}
      <section className="w-full py-8 md:py-16 lg:py-20 bg-background relative overflow-hidden" style={{backgroundImage: 'url(/hero-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Blog</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Insights</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Stay informed with our latest articles on cybersecurity trends, threats, and best practices.
              </p>
            </div>
          </div>

          {dbError ? (
            <div className="mx-auto max-w-5xl py-12 text-center">
              <p className="text-muted-foreground">Unable to load blog posts at this time. Please try again later.</p>
            </div>
          ) : (
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-8 lg:grid-cols-3 lg:gap-8">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="overflow-hidden bg-background border-primary/20 transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-md">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={post.coverImage || "/placeholder.svg?height=400&width=600&query=cybersecurity"}
                        width={600}
                        height={400}
                        alt={post.title}
                        className="object-cover transition-all duration-200 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <Link href="/blog">
              <Button variant="outline">View All Articles</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
