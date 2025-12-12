"use client"

import Image from 'next/image';
import { useState, useCallback } from 'react';

/**
 * OptimizedImage Component
 * 
 * Características:
 * - Image optimization automática con Next.js Image
 * - Fallback a placeholder si la imagen falla
 * - Lazy loading
 * - Blur placeholder
 * - Error handling robusto
 * - Accesibilidad (alt text, title)
 */

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  priority?: boolean;
  className?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
}

// Placeholder SVG base64 para imágenes
const DEFAULT_BLUR_DATA_URL = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22%3E%3Crect fill=%22%23334155%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 fill=%22%238B93A8%22 text-anchor=%22middle%22 dominant-baseline=%22central%22 font-family=%22system-ui%22%3EImage Loading%3C/text%3E%3C/svg%3E';

// Placeholder para cuando falla
const FALLBACK_IMAGE_SVG = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22%3E%3Crect fill=%22%231e293b%22 width=%22400%22 height=%22400%22/%3E%3Ccircle cx=%22200%22 cy=%22180%22 r=%2250%22 fill=%22%2364748b%22/%3E%3Cpath d=%22M100 300 Q200 200 300 300%22 stroke=%22%2364748b%22 stroke-width=%222%22 fill=%22none%22/%3E%3Ctext x=%2250%25%22 y=%2295%25%22 font-size=%2224%22 fill=%22%238B93A8%22 text-anchor=%22middle%22 font-family=%22system-ui%22%3EImage Unavailable%3C/text%3E%3C/svg%3E';

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  title,
  priority = false,
  className = '',
  placeholder = 'blur',
  blurDataURL = DEFAULT_BLUR_DATA_URL,
  sizes,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError) {
      console.warn(`Failed to load image: ${src}`);
      setImageSrc(FALLBACK_IMAGE_SVG);
      setHasError(true);
    }
  }, [src, hasError]);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        title={title || alt}
        width={width}
        height={height}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        onError={handleError}
        quality={75}
        loading={priority ? 'eager' : 'lazy'}
        // Estilos por defecto
        className="object-cover"
        // ARIA para accesibilidad
        role="img"
        aria-label={alt}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded">
          <p className="text-xs text-slate-400 text-center">Image unavailable</p>
        </div>
      )}
    </div>
  );
}

/**
 * BlogImage Component
 * Especializado para imágenes de blog con cover image
 */
export function BlogCoverImage({
  src,
  title,
  className = '',
}: {
  src?: string;
  title: string;
  className?: string;
}) {
  // Determina la imagen a usar
  let imageToUse = FALLBACK_IMAGE_SVG;
  
  if (src) {
    if (src.startsWith('/') || src.startsWith('http')) {
      // Es una ruta válida
      imageToUse = src;
    } else if (src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.webp') || src.endsWith('.svg')) {
      // Es un nombre de archivo, búscalo en /public/
      imageToUse = `/${src}`;
    } else {
      // Intenta agregando .svg si no tiene extensión
      imageToUse = `/${src}.svg`;
    }
  }

  return (
    <div className={`relative overflow-hidden bg-slate-800 w-full h-full ${className}`}>
      <OptimizedImage
        src={imageToUse}
        alt={title}
        width={1200}
        height={630}
        className="w-full h-full object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        priority={false}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
}

/**
 * Avatar Component
 * Para fotos de perfil con fallback
 */
export function AvatarImage({
  src,
  alt,
  size = 'md',
  className = '',
}: {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizeMap = {
    sm: { width: 32, height: 32, container: 'w-8 h-8' },
    md: { width: 64, height: 64, container: 'w-16 h-16' },
    lg: { width: 96, height: 96, container: 'w-24 h-24' },
    xl: { width: 128, height: 128, container: 'w-32 h-32' },
  };

  const { width, height, container } = sizeMap[size];
  const validSrc = src && (src.startsWith('/') || src.startsWith('http')) 
    ? src 
    : 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%234F46E5%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2250%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22central%22 font-family=%22system-ui%22%3E?%3C/text%3E%3C/svg%3E';

  return (
    <div className={`${container} rounded-full overflow-hidden flex-shrink-0 ${className}`}>
      <OptimizedImage
        src={validSrc}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full rounded-full"
        placeholder="blur"
        priority={false}
      />
    </div>
  );
}
