// Load environment variables
require('dotenv').config({ path: '.env' });

const { neon } = require('@neondatabase/serverless');

async function main() {
  console.log('Removing duplicate blog post...');

  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  console.log('Connecting to database...');
  
  const sql = neon(connectionString);

  try {
    // Get all blog posts about Security in AI and MCP to see duplicates
    console.log('Checking for duplicate posts...');
    const posts = await sql`
      SELECT id, title, slug FROM blog_posts 
      WHERE title LIKE '%Security in AI and Model Context Protocol%'
      ORDER BY id DESC;
    `;

    console.log('Found posts:', posts);

    if (posts.length > 1) {
      // Keep the first one, delete the rest
      const idsToDelete = posts.slice(1).map(p => p.id);
      
      for (const id of idsToDelete) {
        await sql`DELETE FROM blog_posts WHERE id = ${id}`;
        console.log(`✅ Deleted blog post with id ${id}`);
      }
      
      console.log('✅ Duplicate removed successfully!');
    } else {
      console.log('No duplicates found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to remove duplicate:', error.message);
    process.exit(1);
  }
}

main();
