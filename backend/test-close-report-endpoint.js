// Test the optimized close report endpoint
// Node.js 22 has built-in fetch, no import needed

const baseUrl = 'http://localhost:7000';
const testDate = '2026-01-21'; // Change to a date that has data

async function testCloseReport() {
  console.log('🧪 Testing Close Report Optimized Endpoint...\n');
  
  try {
    const url = `${baseUrl}/api/close-report/optimized?date=${testDate}&role=admin`;
    console.log(`📡 Fetching: ${url}\n`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('✅ Response Status:', response.status);
    console.log('✅ Response Data:', JSON.stringify(data, null, 2));
    console.log(`\n📊 Found ${data.data?.length || 0} stores with closing data`);
    
    if (data.data && data.data.length > 0) {
      console.log('\n📋 Sample record:');
      console.log(JSON.stringify(data.data[0], null, 2));
    } else {
      console.log('\n⚠️  No data found for this date. Try a different date.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testCloseReport();
