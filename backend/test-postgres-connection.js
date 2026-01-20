import { getSequelize } from './db/postgresql.js';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment
const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}

async function testConnection() {
  try {
    const sequelize = getSequelize();
    
    console.log('🔍 Testing PostgreSQL connection...');
    console.log(`📊 Environment: ${env}`);
    console.log(`📊 Database: ${sequelize.getDatabaseName()}`);
    
    // Test authentication
    await sequelize.authenticate();
    console.log('✅ Connection successful!');
    
    // Test a simple query
    const [results] = await sequelize.query('SELECT version();');
    console.log('📊 PostgreSQL version:', results[0].version);
    
    // Check if tables exist
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('\n📋 Existing tables:');
    tables.forEach(t => console.log(`  - ${t.table_name}`));
    
    // Check for any unique constraints
    const [constraints] = await sequelize.query(`
      SELECT 
        tc.table_name, 
        tc.constraint_name, 
        tc.constraint_type,
        kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu 
        ON tc.constraint_name = kcu.constraint_name
      WHERE tc.constraint_type = 'UNIQUE'
        AND tc.table_schema = 'public'
      ORDER BY tc.table_name, tc.constraint_name;
    `);
    
    console.log('\n🔒 Existing UNIQUE constraints:');
    constraints.forEach(c => {
      console.log(`  - ${c.table_name}.${c.column_name} (${c.constraint_name})`);
    });
    
    await sequelize.close();
    console.log('\n✅ Test completed successfully');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('📋 Full error:', error);
    process.exit(1);
  }
}

testConnection();
