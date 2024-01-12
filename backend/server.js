import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const port = process.env.PORT;

connectDB();
const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/products', productRoutes);


app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});