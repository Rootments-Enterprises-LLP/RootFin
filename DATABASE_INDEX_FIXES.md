# Database Index Fixes

## Issues Fixed

### 1. PostgreSQL Syntax Error
**Error:** `syntax error at or near "UNIQUE"`

**Root Cause:** The `SalesInvoice` Sequelize model had an index definition missing the `name` property, causing Sequelize to generate invalid SQL.

**Fix:** Added proper index names to all indexes in `backend/models/sequelize/SalesInvoice.js`

```javascript
// Before
indexes: [
  {
    fields: ['userId', 'createdAt']
  },
  {
    fields: ['invoiceNumber'],
    unique: true
  }
]

// After
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

## Testing

After deploying these changes, your server should start without errors:

```bash
npm start
```

Expected output:
- ✅ No PostgreSQL syntax errors
- ✅ No Mongoose duplicate index warnings
- ✅ Both databases connect successfully

## What Changed

### PostgreSQL (Sequelize)
- Fixed index naming in `SalesInvoice` model

### MongoDB (Mongoose)
- Removed redundant `schema.index()` calls for fields already marked as `unique: true`
- Added comments explaining why certain indexes were removed

## No Action Required

These are code-level fixes that don't require any database migrations or manual intervention. The indexes will be properly created/updated automatically when the server starts.
