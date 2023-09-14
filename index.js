import express from 'express';
import mongoose from 'mongoose';
import router from './config/routes.js'
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request received ${req.method} ${req.url}`)
  next()
})

app.use('/api', router)

app.use((req, res) => {
  return res.status(404).json({ message: 'Route not found' })
})


const startServer = async () => {
    try {

      
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`✅ Database connection established`);
        app.listen(process.env.PORT, () => console.log(`🚀 Server listening on port ${process.env.PORT}`));
    } catch (error) {
        console.log(`⛔️ Something went wrong starting the server!`);
        console.log(error);
    }
};

startServer();
