#!/usr/bin/env node

/**
 * Generador de imágenes PNG optimizadas usando Sharp
 * Crea imágenes hermosas y pequeñas (<50KB) con gradientes
 */

const fs = require('fs');
const path = require('path');

const imageConfigs = [
  {
    filename: 'ai-security.png',
    colors: ['#667eea', '#764ba2'],
    title: 'Security in AI',
  },
  {
    filename: 'ai-protector-security.png',
    colors: ['#f093fb', '#f5576c'],
    title: 'AI Protector',
  },
  {
    filename: 'cybersecurity-importance.png',
    colors: ['#4facfe', '#00f2fe'],
    title: 'Cybersecurity',
  },
  {
    filename: 'ai-data-protection.png',
    colors: ['#43e97b', '#38f9d7'],
    title: 'Data Protection',
  },
];

async function generateImages() {
  try {
    const sharp = require('sharp');

    console.log('📸 Generando imágenes PNG optimizadas con Sharp...\n');

    for (const config of imageConfigs) {
      const width = 1200;
      const height = 630;

      try {
        // Crear un SVG con gradiente (Sharp puede renderizarlo)
        const svg = `
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${config.colors[0]};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${config.colors[1]};stop-opacity:1" />
              </linearGradient>
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>
            <!-- Fondo con gradiente -->
            <rect width="${width}" height="${height}" fill="url(#grad)" />
            
            <!-- Círculos decorativos -->
            <circle cx="100" cy="100" r="200" fill="rgba(255,255,255,0.08)" filter="url(#blur)" />
            <circle cx="${width - 150}" cy="150" r="180" fill="rgba(255,255,255,0.08)" filter="url(#blur)" />
            <circle cx="${width / 2}" cy="${height - 100}" r="220" fill="rgba(255,255,255,0.08)" filter="url(#blur)" />
            
            <!-- Overlay oscuro -->
            <rect width="${width}" height="${height}" fill="rgba(0,0,0,0.25)" />
            
            <!-- Texto principal -->
            <text 
              x="${width / 2}" 
              y="${height / 2}" 
              font-size="72" 
              font-weight="bold"
              font-family="Arial, sans-serif"
              text-anchor="middle"
              fill="white"
              filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"
            >
              ${config.title}
            </text>
          </svg>
        `;

        const buffer = Buffer.from(svg);
        const outputPath = path.join(__dirname, '..', 'public', config.filename);
        
        // Renderizar SVG a PNG y optimizar
        await sharp(buffer, { density: 96 })
          .png({ 
            quality: 80,
            progressive: true,
            compressionLevel: 9,
            adaptiveFiltering: true
          })
          .resize(width, height, {
            fit: 'cover',
            position: 'center'
          })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`✅ ${config.filename} (${sizeKB} KB) - ${config.title}`);
      } catch (error) {
        console.error(`❌ Error en ${config.filename}:`, error.message);
      }
    }

    console.log('\n🎉 ¡Imágenes PNG reales y optimizadas generadas exitosamente!');
    process.exit(0);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND' && error.message.includes('sharp')) {
      console.log('⚠️  Sharp no está instalado. Instalando...\n');
      const { execSync } = require('child_process');
      try {
        execSync('pnpm add -D sharp', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
        console.log('\n✅ Sharp instalado. Ejecutando script nuevamente...');
        require('./generate-images.js');
      } catch (e) {
        console.error('❌ Error:', e.message);
        process.exit(1);
      }
    } else {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  }
}

generateImages();
