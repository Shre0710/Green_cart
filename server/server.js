import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);

// Connect to database before starting server
await connectDB();

app.get('/', (req, res) => res.send('API is Working'));
app.use('/api/user',userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
