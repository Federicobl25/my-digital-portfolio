require('dotenv').config({ path: '.env' });
const { neon } = require('@neondatabase/serverless');

async function main() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const sql = neon(connectionString);

  try {
    console.log('Corrigiendo imágenes de blogs...');
    
    // Actualizar ID 4 (AI Protector) a la imagen correcta
    await sql`
      UPDATE blog_posts 
      SET cover_image = '/images/ai-protector-workshop.svg'
      WHERE id = 4
    `;
    console.log('✅ Blog AI Protector actualizado');

    // Actualizar ID 6 (Cybersecurity Importance) a la imagen correcta  
    await sql`
      UPDATE blog_posts 
      SET cover_image = '/images/cybersecurity-digital-age.svg'
      WHERE id = 6
    `;
    console.log('✅ Blog Cybersecurity Importance actualizado');

    // Actualizar ID 7 (Data Protection) a una imagen correcta
    await sql`
      UPDATE blog_posts 
      SET cover_image = '/images/ai-protector-workshop.svg'
      WHERE id = 7
    `;
    console.log('✅ Blog Data Protection actualizado');

    // Verificar cambios
    const updated = await sql`SELECT id, slug, title, cover_image FROM blog_posts`;
    
    console.log('\n📋 Blogs después de actualización:');
    updated.forEach(blog => {
      console.log(`  ${blog.id}: ${blog.title.substring(0, 50)}...`);
      console.log(`     → ${blog.cover_image}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
