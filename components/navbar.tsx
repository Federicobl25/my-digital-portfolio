"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield, X, FileText, Download } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/hooks/use-admin";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin } = useAdmin();
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About", smooth: true },
    { href: "#experience", label: "Experience", smooth: true },
    { href: "/blog", label: "Blog" },
    { href: "#contact", label: "Contact", smooth: true },
  ];
  
  const adminLink = { 
    href: "/admin", 
    label: "Admin Dashboard" 
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60 border-primary/20">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold hover:text-primary transition-colors">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-white">Federico</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/20 hover:text-primary",
                pathname === link.href || (pathname === "/" && link.href === "/") 
                  ? "text-primary bg-primary/10" 
                  : "text-gray-400"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center lg:hidden gap-2">
          <ThemeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-slate-950 border-primary/20">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-primary/20 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Add Admin link in mobile menu */}
                {isAdmin && (
                  <Link
                    href={adminLink.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-primary/20 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {adminLink.label}
                  </Link>
                )}
              </nav>
              <div className="mt-auto pt-6 border-t border-primary/20">
                <SignedOut>
                  <div className="flex flex-col gap-2">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full">Sign Up</Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center justify-between">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Auth Buttons and Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <ThemeToggle />

          {/* Admin dashboard button */}
          <SignedIn>
            {isAdmin && (
              <Button variant="outline" size="sm" asChild>
                <Link href={adminLink.href} className="flex items-center gap-2">
                  {adminLink.label}
                </Link>
              </Button>
            )}
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
