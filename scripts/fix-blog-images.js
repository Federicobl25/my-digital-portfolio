require('dotenv').config({ path: '.env' });
const { neon } = require('@neondatabase/serverless');

async function main() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const sql = neon(connectionString);

  try {
    console.log('Actualizando rutas de imágenes en base de datos...');
    
    // Update cover images para todos los blogs
    const updates = [
      {
        slug: 'ai-protector-workshop-learning',
        coverImage: '/images/ai-protector-workshop.svg'
      },
      {
        slug_contains: 'security-in-ai-mcp',
        coverImage: '/images/security-in-ai-mcp.svg'
      },
      {
        slug_contains: 'cybersecurity-importance',
        coverImage: '/images/cybersecurity-digital-age.svg'
      }
    ];

    // Actualizar cualquier blog post que tenga .png a .svg
    console.log('Actualizando blogs con imágenes PNG...');
    
    const result = await sql`
      UPDATE blog_posts 
      SET cover_image = CASE 
        WHEN cover_image LIKE '%security%' OR slug LIKE '%security-in-ai%' THEN '/images/security-in-ai-mcp.svg'
        WHEN cover_image LIKE '%protector%' OR slug LIKE '%protector%' THEN '/images/ai-protector-workshop.svg'
        WHEN cover_image LIKE '%cybersecurity%' OR slug LIKE '%cybersecurity%' THEN '/images/cybersecurity-digital-age.svg'
        ELSE cover_image
      END
      WHERE cover_image IS NOT NULL AND cover_image != ''
      RETURNING id, slug, cover_image;
    `;

    console.log('✅ Blogs actualizados:');
    result.forEach(row => {
      console.log(`  - ${row.slug}: ${row.cover_image}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
