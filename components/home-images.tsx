"use client"

import { OptimizedImage, BlogCoverImage } from "@/components/optimized-image"

export function HeroImage() {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <div className="relative w-full max-w-[400px] aspect-square">
        <OptimizedImage
          src="/images/foto.svg"
          width={400}
          height={400}
          alt="Federico Bustos"
          className="rounded-2xl object-cover shadow-2xl shadow-primary/50 border border-primary/20"
          priority
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/30 to-transparent"></div>
      </div>
    </div>
  )
}

interface BlogCardImageProps {
  src?: string
  title: string
  postId: string
  slug: string
}

export function BlogCardImage({ src, title, postId, slug }: BlogCardImageProps) {
  return (
    <div className="aspect-video w-full overflow-hidden bg-slate-800">
      <BlogCoverImage
        src={src}
        title={title}
        className="group-hover:scale-105 transition-transform h-full"
      />
    </div>
  )
}
