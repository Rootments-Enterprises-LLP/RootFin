import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectMongoDB from './db/database.js';
// import { sendWhatsAppMessage } from './lib/WhatsAppMessage.js';
const app = express();

const port = process.env.PORT || 7000;

//http://localhost:3000

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['https://unicode-mu.vercel.app', 'http://localhost:3000', 'https://lms-dev-jishnu.vercel.app', 'https://lms-3w6k.vercel.app', 'https://lmsrootments.vercel.app'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('App is running');
});




app.listen(port, () => {
  connectMongoDB()
  console.log(`Server running on port ${port}`);
});

