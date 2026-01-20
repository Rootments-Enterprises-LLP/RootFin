# Database Index Fixes

## Issues Fixed

### 1. PostgreSQL Syntax Error
**Error:** `syntax error at or near "UNIQUE"`

**Root Cause:** Multiple Sequelize models had index definitions missing the `name` property, causing Sequelize to generate invalid SQL.

**Files Fixed:**
- `backend/models/sequelize/SalesInvoice.js` - Added index names
- `backend/models/sequelize/VendorHistory.js` - Added index names

**Fix Applied:**

```javascript
// Before (WRONG - causes SQL syntax error)
indexes: [
  {
    fields: ['userId', 'createdAt']
  },
  {
    fields: ['invoiceNumber'],
    unique: true
  }
]

// After (CORRECT)
indexes: [
  {
    fields: ['userId', 'createdAt'],
    name: 'sales_invoices_user_date_idx'
  },
  {
    fields: ['invoiceNumber'],
    name: 'sales_invoices_number_idx',
    unique: true
  }
]
```

### 2. Mongoose Duplicate Index Warnings
**Warnings:**
- `[MONGOOSE] Warning: Duplicate schema index on {"transferOrderNumber":1}`
- `[MONGOOSE] Warning: Duplicate schema index on {"orderNumber":1}`
- `[MONGOOSE] Warning: Duplicate schema index on {"name":1}` (2 instances)

**Root Cause:** Mongoose models were defining unique indexes in two places:
1. In the field definition with `unique: true`
2. Using `schema.index()` method

This creates duplicate indexes which Mongoose warns about.

**Files Fixed:**
- `backend/model/TransferOrder.js` - Removed duplicate `transferOrderNumber` index
- `backend/model/StoreOrder.js` - Removed duplicate `orderNumber` index
- `backend/model/Brand.js` - Removed duplicate `name` index
- `backend/model/Manufacturer.js` - Removed duplicate `name` index

## Deployment to Render

### Step 1: Commit and Push Changes
```bash
git add .
git commit -m "Fix PostgreSQL index syntax errors and Mongoose duplicate index warnings"
git push origin main
```

### Step 2: Render Auto-Deploy
Render will automatically detect the changes and redeploy your backend.

### Step 3: Monitor Deployment
Watch the Render logs for:
- ✅ No PostgreSQL syntax errors
- ✅ No Mongoose duplicate index warnings
- ✅ Both databases connect successfully
- ✅ Message: "✅ Database models synced"

### Expected Clean Output
```
📊 Connecting to MongoDB database...
Connected to MongoDB
📊 Connecting to PostgreSQL database...
✅ PostgreSQL connected [production]
📊 Database: rootfin_zoho
🔄 Syncing database models...
📊 Sync mode: alter (modify existing tables)
✅ Database models synced
```

## What Changed

### PostgreSQL (Sequelize) - 2 Files
1. **SalesInvoice.js** - Fixed index naming
2. **VendorHistory.js** - Fixed index naming

### MongoDB (Mongoose) - 4 Files
1. **TransferOrder.js** - Removed redundant index
2. **StoreOrder.js** - Removed redundant index
3. **Brand.js** - Removed redundant index
4. **Manufacturer.js** - Removed redundant index

## No Database Migration Required

These are code-level fixes that don't require any manual database intervention. The indexes will be properly created/updated automatically when the server starts with `SYNC_DB=true`.

## Verification

After deployment, check:
1. Server starts without errors
2. No warning messages in logs
3. PostgreSQL tables are created/updated
4. Application functions normally
