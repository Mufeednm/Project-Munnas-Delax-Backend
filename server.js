import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
// import exampleRoutes from './routes/exampleRoutes.js';
import userRoutes from './src/routes/userRoute.js';
import buildingRoutes from './src/routes/buildingRoute.js';
import tenantRoute from './src/routes/tenantRoute.js';
import cors from 'cors';
dotenv.config();
connectDB();

const app = express();

// Set up permissive CORS for development
app.use(cors())

app.use(express.json());
 
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend is live 🚀');
});
app.use('/api/users', userRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/tenants', tenantRoute);

// app.use('/api/tenants', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
