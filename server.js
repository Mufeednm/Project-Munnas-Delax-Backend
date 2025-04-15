import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
// import exampleRoutes from './routes/exampleRoutes.js';
import userRoutes from './src/routes/userRoute.js';
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/buildings', userRoutes);
app.use('/api/tenants', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
