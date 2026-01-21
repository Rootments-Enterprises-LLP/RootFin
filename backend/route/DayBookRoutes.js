// backend/route/DayBookRoutes.js
import express from "express";
import { getDayBook, getDayBookRange, getCloseReportOptimized } from "../controllers/DayBookController.js";

const router = express.Router();

/**
 * @swagger
 * /api/close-report/optimized:
 *   get:
 *     summary: Get optimized Close Report (all stores in one call)
 */
router.get("/close-report/optimized", getCloseReportOptimized);

/**
 * @swagger
 * /api/daybook:
 *   get:
 *     summary: Get Day Book for a specific date
 *     description: Retrieves all transactions for a specific location and date
 *     parameters:
 *       - in: query
 *         name: locCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Location code
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: Date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Successfully retrieved day book data
 *       400:
 *         description: Missing required parameters
 *       500:
 *         description: Server error
 */
router.get("/daybook", getDayBook);

/**
 * @swagger
 * /api/daybook/range:
 *   get:
 *     summary: Get Day Book for a date range
 *     description: Retrieves all transactions for a specific location and date range
 *     parameters:
 *       - in: query
 *         name: locCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Location code
 *       - in: query
 *         name: dateFrom
 *         required: true
 *         schema:
 *           type: string
 *         description: Start date in YYYY-MM-DD format
 *       - in: query
 *         name: dateTo
 *         required: true
 *         schema:
 *           type: string
 *         description: End date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Successfully retrieved day book data for date range
 *       400:
 *         description: Missing required parameters
 *       500:
 *         description: Server error
 */
router.get("/daybook/range", getDayBookRange);

export default router;