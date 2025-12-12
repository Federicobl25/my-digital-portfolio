// Script para corregir las rutas de imágenes en la base de datos
// Convierte .png a .svg para las imágenes de blog

require('dotenv').config({ path: '.env' });

const { neon } = require('@neondatabase/serverless');

const imageMapping = {
  '/ai-security.png': '/ai-security.svg',
  '/ai-protector-security.png': '/ai-protector-security.svg',
  '/cybersecurity-importance.png': '/cybersecurity-importance.svg',
  '/ai-data-protection.png': '/ai-data-protection.svg',
  '/ai-protector.png': '/ai-protector.svg',
};

async function fixImagePaths() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  console.log('🔧 Iniciando corrección de rutas de imágenes en la base de datos...');
  
  const sql = neon(connectionString);

  try {
    for (const [oldPath, newPath] of Object.entries(imageMapping)) {
      console.log(`\n📝 Actualizando ${oldPath} → ${newPath}`);
      
      const result = await sql`
        UPDATE blog_posts 
        SET cover_image = ${newPath}
        WHERE cover_image = ${oldPath}
        RETURNING id, title, cover_image;
      `;

      if (result.length > 0) {
        console.log(`✅ ${result.length} post(s) actualizado(s):`);
        result.forEach(post => {
          console.log(`   - ${post.title}: ${post.cover_image}`);
        });
      } else {
        console.log(`⏭️  No hay posts con ${oldPath}`);
      }
    }

    console.log('\n🎉 ¡Corrección completada!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al actualizar la base de datos:', error);
    process.exit(1);
  }
}

fixImagePaths();
