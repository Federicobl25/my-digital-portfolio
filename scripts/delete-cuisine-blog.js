// Load environment variables
require('dotenv').config({ path: '.env' });

const { neon } = require('@neondatabase/serverless');

async function main() {
  console.log('Deleting Australian Cuisine blog post...');

  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const sql = neon(connectionString);

  try {
    // Delete the blog post about Australian cuisine
    console.log('Looking for Australian Cuisine post...');
    const result = await sql`
      DELETE FROM blog_posts 
      WHERE slug LIKE 'australian-cooking-techniques%'
      RETURNING id, title, slug;
    `;

    if (result.length > 0) {
      console.log('✅ Blog post deleted successfully!');
      console.log('Deleted post:', result[0]);
    } else {
      console.log('ℹ️ No Australian Cuisine posts found to delete');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to delete blog post:', error.message);
    process.exit(1);
  }
}

main();
