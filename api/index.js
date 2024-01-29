import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
dotenv.config()
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('MongoDb is connected');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.listen(3000, () => {
    console.log('Server Is Running On port 3000');
})


app.use('/api/user', userRoutes);