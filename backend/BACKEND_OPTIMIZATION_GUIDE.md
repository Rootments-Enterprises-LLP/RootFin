# Backend Performance Optimization Guide

## Critical: Create Aggregated Endpoints

### Problem
Frontend makes 6+ separate API calls for one page load:
```javascript
// Current approach (SLOW)
fetch(bookingU)    // 500ms
fetch(rentoutU)    // 500ms
fetch(returnU)     // 500ms
fetch(deleteU)     // 500ms
fetch(mongoU)      // 500ms
fetch(openingU)    // 500ms
// Total: ~3 seconds
```

### Solution: Aggregated Endpoint

Create a single endpoint that returns all data:

```javascript
// routes/DayBookRoutes.js
router.get('/api/daybook/aggregated', async (req, res) => {
  const { locCode, fromDate, toDate } = req.query;
  
  try {
    // Fetch all data in parallel
    const [booking, rentout, returnData, deleteData, mongo, opening] = await Promise.all([
      fetch(`https://rentalapi.rootments.live/api/GetBooking/GetBookingList?LocCode=${locCode}&DateFrom=${fromDate}&DateTo=${toDate}`),
      fetch(`https://rentalapi.rootments.live/api/GetBooking/GetRentoutList?LocCode=${locCode}&DateFrom=${fromDate}&DateTo=${toDate}`),
      fetch(`https://rentalapi.rootments.live/api/GetBooking/GetReturnList?LocCode=${locCode}&DateFrom=${fromDate}&DateTo=${toDate}`),
      fetch(`https://rentalapi.rootments.live/api/GetBooking/GetDeleteList?LocCode=${locCode}&DateFrom=${fromDate}&DateTo=${toDate}`),
      Transaction.find({ locCode, date: { $gte: fromDate, $lte: toDate } }),
      getOpeningBalance(locCode, getPreviousDate(fromDate))
    ]);
    
    res.json({
      success: true,
      data: {
        booking: await booking.json(),
        rentout: await rentout.json(),
        return: await returnData.json(),
        delete: await deleteData.json(),
        mongo: mongo,
        opening: opening
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Frontend Usage
```javascript
// New approach (FAST)
const response = await fetch(`${baseUrl}/api/daybook/aggregated?locCode=700&fromDate=2026-01-21&toDate=2026-01-21`);
const { booking, rentout, return, delete, mongo, opening } = response.data;
// Total: ~500ms (single round trip)
```

## Database Indexes

### MongoDB
```javascript
// Add to your MongoDB setup
db.transactions.createIndex({ locCode: 1, date: 1 });
db.transactions.createIndex({ invoiceNo: 1 });
db.transactions.createIndex({ type: 1, category: 1 });
db.saveCashBank.createIndex({ locCode: 1, date: 1 });
```

### PostgreSQL
```sql
-- Add to your PostgreSQL migrations
CREATE INDEX IF NOT EXISTS idx_transactions_loccode_date 
  ON transactions(loc_code, date);
  
CREATE INDEX IF NOT EXISTS idx_transactions_invoice 
  ON transactions(invoice_no);
  
CREATE INDEX IF NOT EXISTS idx_sales_invoices_date 
  ON sales_invoices(invoice_date);
```

## Caching Layer (Optional but Recommended)

### Install Redis
```bash
npm install redis
```

### Setup Redis Client
```javascript
// utils/redis.js
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export default client;
```

### Cache Opening Balances
```javascript
// utils/openingBalanceCache.js
import redis from './redis.js';

export async function getOpeningBalance(locCode, date) {
  const cacheKey = `opening:${locCode}:${date}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // Fetch from DB
  const data = await fetchOpeningBalanceFromDB(locCode, date);
  
  // Cache for 1 hour
  await redis.setEx(cacheKey, 3600, JSON.stringify(data));
  
  return data;
}
```

## Implementation Priority

### High Priority (Do First)
1. ✅ Create aggregated daybook endpoint
2. ✅ Add MongoDB indexes
3. ✅ Add PostgreSQL indexes

### Medium Priority
4. Create aggregated close report endpoint
5. Optimize slow queries

### Low Priority (Nice to Have)
6. Add Redis caching
7. Implement query result pagination
8. Add response compression

## Expected Results

### Before Optimization:
- Page load: 3-5 seconds
- 6+ API calls per page
- No caching

### After Optimization:
- Page load: <1 second
- 1 API call per page
- Cached opening balances
- Indexed queries

## Testing

```bash
# Test aggregated endpoint
curl "http://localhost:10000/api/daybook/aggregated?locCode=700&fromDate=2026-01-21&toDate=2026-01-21"

# Should return all data in one response
```
