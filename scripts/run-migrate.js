// Load environment variables
require('dotenv').config({ path: '.env' });

const { neon } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-http');

async function main() {
  console.log('Starting database migration...');

  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  console.log('Connecting to database...');
  
  const sql = neon(connectionString);
  const db = drizzle(sql);

  try {
    // Create the subscribers table
    console.log('Creating subscribers table...');
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Subscribers table created or already exists');

    // Create the users table
    console.log('Creating users table...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        clerk_id TEXT NOT NULL UNIQUE,
        role VARCHAR(20) DEFAULT 'user' NOT NULL,
        is_first_user BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Users table created or already exists');

    // Create the blog_posts table
    console.log('Creating blog_posts table...');
    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image TEXT,
        author TEXT NOT NULL,
        read_time TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Blog posts table created or already exists');

    // Create the projects table
    console.log('Creating projects table...');
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        items JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Projects table created or already exists');

    console.log('✅ Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

main();
