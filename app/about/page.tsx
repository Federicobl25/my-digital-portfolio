import { Award, GraduationCap, Briefcase, Calendar, CheckCircle, Linkedin, Github, Mail, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">About Federico Bustos</h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                Cybersecurity Professional | SOC Analyst | Vulnerability Assessment Specialist
              </p>
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      {/* Profile Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Federico Bustos</h2>
                <p className="text-xl text-muted-foreground">
                  <span className="text-primary font-semibold">Systems Engineer | SOC Analyst | Cybersecurity Specialist</span>
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  As a Systems Engineer with a strong cybersecurity foundation, I bring hands-on experience in event monitoring, incident response, and vulnerability management across diverse infrastructures. My career has focused on protecting critical assets through proactive threat detection and strategic security implementations.
                </p>
                <p className="text-muted-foreground">
                  During my tenure at COINSA SAS, I successfully transitioned from SOC Analyst Level 1 to Level 2, leading initiatives that enhanced threat detection accuracy and reduced incident response times by up to 30%. I have developed expertise working with Fortinet technologies (FortiSIEM, FortiAnalyzer, FortiGate) and have implemented security frameworks for clients in highly sensitive sectors.
                </p>
                <p className="text-muted-foreground">
                  I am passionate about leveraging open-source OSINT tools and free security resources to conduct comprehensive vulnerability research and email analysis. My approach combines technical mastery with continuous learning, staying ahead of emerging threats and security best practices.
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <Link href="https://linkedin.com/in/federico-bustos-systems-engineer" target="_blank">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </Link>
                <Link href="https://github.com/federicobustos" target="_blank">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </Link>
                <Link href="mailto:federicobl93@gmail.com">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-3xl opacity-20"></div>
                <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-background p-2">
                  <Image
                    src="/images/foto.png"
                    alt="Federico Bustos - Cybersecurity Professional"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Credentials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Certifications & Education</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Professional qualifications and academic background that inform my expertise in cybersecurity.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Fortinet NSE 3</CardTitle>
                <CardDescription>Network Security Associate</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Certification in Fortinet security solutions and network security fundamentals. July 2022
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Ethical Hacker (EHE)</CardTitle>
                <CardDescription>EC-Council</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ethical Hacker Essentials certification covering penetration testing and ethical hacking. June 2023
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AWS Cloud Foundations</CardTitle>
                <CardDescription>Amazon Web Services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AWS Academy Cloud Foundations for cloud security and infrastructure. November 2022
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>B.S. Systems Engineering</CardTitle>
                <CardDescription>Universidad EAN, Colombia</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bachelor's degree in Systems Engineering with focus on IT and cybersecurity. 2018 - 2023
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Expertise</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Technical Skills & Specializations</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Core competencies in cybersecurity, threat monitoring, and vulnerability assessment.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Security Monitoring & Analysis</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>FortiSIEM Security Monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>FortiAnalyzer Log Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>FortiGate Firewall Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Real-time Threat Detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Incident Response Management</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Infrastructure & Systems</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>VMware Infrastructure</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Citrix Administration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Cisco Network Security</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>AWS Cloud Security</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>System Performance Optimization</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Reporting & Documentation</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Security Compliance Reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Executive Dashboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Threat Intelligence Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Vulnerability Documentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Process Automation & Workflow</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Career</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Professional Experience</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                My journey in cybersecurity and systems engineering.
              </p>
            </div>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/40 before:to-transparent">
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background shadow-sm z-10 md:group-odd:ml-8 md:group-even:mr-8">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div className="w-full md:w-[calc(50%-4rem)] bg-background p-5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-lg">SOC Analyst Level 2</h3>
                  <time className="font-semibold text-primary flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Sept 2022 - Oct 2023
                  </time>
                </div>
                <p className="text-muted-foreground mb-2">COINSA SAS | Bogotá, Colombia</p>
                <p className="text-sm text-muted-foreground">
                  Managed critical security incidents and oversaw technical reporting across client environments. Implemented monitoring dashboards that improved detection accuracy and incident response speed by 30%. Administered Fortinet infrastructure including FortiSIEM, FortiGate, and FortiAnalyzer. Supported virtual machine environments and contributed to knowledge sharing among Level 1 analysts.
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background shadow-sm z-10 md:group-odd:ml-8 md:group-even:mr-8">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div className="w-full md:w-[calc(50%-4rem)] bg-background p-5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-lg">SOC Analyst Level 1</h3>
                  <time className="font-semibold text-primary flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    March 2022 - Sept 2022
                  </time>
                </div>
                <p className="text-muted-foreground mb-2">COINSA SAS | Bogotá, Colombia</p>
                <p className="text-sm text-muted-foreground">
                  Monitored over 20 dashboards for real-time infrastructure supervision. Generated compliance reports and handled daily incident documentation. Improved system performance by optimizing hardware configuration and OS performance. Authored over 40 use case templates to streamline repetitive analysis and improve operational efficiency.
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background shadow-sm z-10 md:group-odd:ml-8 md:group-even:mr-8">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div className="w-full md:w-[calc(50%-4rem)] bg-background p-5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-lg">Medical Accounts Analyst</h3>
                  <time className="font-semibold text-primary flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Feb 2020 - March 2022
                  </time>
                </div>
                <p className="text-muted-foreground mb-2">La Equidad Seguros OC | Bogotá, Colombia</p>
                <p className="text-sm text-muted-foreground">
                  Led data analysis and pricing strategies to optimize service costs and streamline claims processing. Responded to service incidents with structured protocols, improving turnaround times and operational consistency. Developed commercial proposals for national healthcare providers based on market needs and risk segmentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free OSINT Tools Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Resources</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Free OSINT Tools & Resources</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Essential open-source and free tools for vulnerability research, email analysis, and security investigations.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Email Analysis & OSINT</span>
                  <ExternalLink className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">Hunter.io</p>
                  <p className="text-muted-foreground">Email finder and verifier for lead generation and research</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">Have I Been Pwned</p>
                  <p className="text-muted-foreground">Check if emails appear in data breaches</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">Dehashed</p>
                  <p className="text-muted-foreground">Search leaked database credentials</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Domain & IP Intelligence</span>
                  <ExternalLink className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">Whois.com</p>
                  <p className="text-muted-foreground">WHOIS and domain registration information</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">Shodan</p>
                  <p className="text-muted-foreground">Search for internet-connected devices and services</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">VirusTotal</p>
                  <p className="text-muted-foreground">Analyze URLs, IPs, and files for malicious content</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Vulnerability Scanning</span>
                  <ExternalLink className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">Nessus Essentials</p>
                  <p className="text-muted-foreground">Free vulnerability scanner for personal use</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">OpenVAS</p>
                  <p className="text-muted-foreground">Open-source vulnerability management</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">OWASP ZAP</p>
                  <p className="text-muted-foreground">Web application security scanning</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Network Reconnaissance</span>
                  <ExternalLink className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">Nmap</p>
                  <p className="text-muted-foreground">Network mapping and port discovery</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">Wireshark</p>
                  <p className="text-muted-foreground">Network protocol analyzer</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">Maltego</p>
                  <p className="text-muted-foreground">Open-source intelligence and forensics platform</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Data Breach & Credential Tools</span>
                  <ExternalLink className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">Breach Directory</p>
                  <p className="text-muted-foreground">Search across multiple breach databases</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">LeakCheck</p>
                  <p className="text-muted-foreground">Email and password leak verification</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">Data.Breach.Wiki</p>
                  <p className="text-muted-foreground">Comprehensive breach database</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Research & Threat Intelligence</span>
                  <ExternalLink className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">MITRE ATT&CK</p>
                  <p className="text-muted-foreground">Threat tactics and techniques framework</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">CVE Details</p>
                  <p className="text-muted-foreground">Vulnerability and exposure database</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary">CISA Alerts</p>
                  <p className="text-muted-foreground">Official cybersecurity threat information</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
