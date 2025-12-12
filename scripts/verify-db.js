require('dotenv').config({ path: '.env' });
const { neon } = require('@neondatabase/serverless');

(async () => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('📋 Verificando imágenes en la base de datos:\n');
    
    const posts = await sql`
      SELECT id, title, cover_image FROM blog_posts ORDER BY created_at DESC LIMIT 10;
    `;
    
    posts.forEach(p => {
      const shortTitle = p.title.substring(0, 45).padEnd(45, ' ');
      console.log(`  ✓ ${shortTitle} → ${p.cover_image}`);
    });
    
    console.log(`\n✅ Total de posts: ${posts.length}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
