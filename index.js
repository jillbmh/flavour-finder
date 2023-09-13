import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

app.use(express.json());

const port = process.env.PORT;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`✅ Database connection established`);
        app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
    } catch (error) {
        console.log(`⛔️ Something went wrong starting the server!`);
        console.log(error);
    }
};

startServer();
