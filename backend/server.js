// backend/server.js
import express        from "express";
import cookieParser   from "cookie-parser";
import cors           from "cors";
import dotenv         from "dotenv";
import fs             from "fs";

import connectMongoDB from "./db/database.js";
import UserRouter     from "./route/LoginRoute.js";   // ← you already had this
import TwsRoutes      from "./route/TwsRoutes.js";    // ← fixed router
import setupSwagger   from "./swagger.js";

if (process.env.NODE_ENV !== 'production') {
  const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
  if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
  } else {
    dotenv.config();
  }
}
const env = process.env.NODE_ENV || "development";
//JUST FOR COMMITING
const app  = express();
const PORT = process.env.PORT || 7000;

setupSwagger(app);

// ── middleware ──────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",      // ✖ remove trailing slash
      "http://localhost:3000",
      "https://rootfin.vercel.app",
      "https://rootfin.rootments.live",
      "https://rootfin-testenv-clab.vercel.app",
      'https://rootfin-testenv-3.onrender.com',
    ],
    credentials: true,
  })
);

// ── routes ──────────────────────────────────────────────────
app.get("/", (_req, res) => res.send("App is running"));

app.use("/user",    UserRouter);   // no change
app.use("/api/tws", TwsRoutes);   // ← this now has ONE /getEditedTransactions

// ── start server ────────────────────────────────────────────
app.listen(PORT, () => {
  connectMongoDB(env);
  console.log(`🚀  Server listening on :${PORT}`);
});
