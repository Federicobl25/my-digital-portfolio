require('dotenv').config({ path: '.env' });
const { neon } = require('@neondatabase/serverless');

async function main() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const sql = neon(connectionString);

  try {
    console.log('Obteniendo todos los blogs...');
    
    const blogs = await sql`SELECT id, slug, title, cover_image FROM blog_posts`;
    
    console.log('\n📋 Blogs actuales:');
    blogs.forEach(blog => {
      console.log(`  ID: ${blog.id}`);
      console.log(`  Slug: ${blog.slug}`);
      console.log(`  Título: ${blog.title}`);
      console.log(`  Imagen: ${blog.cover_image}`);
      console.log('');
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
