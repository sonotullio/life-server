import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongodb/connect.js";
import userRoutes from "./routes/user.routes.js";
import propertyRoutes from "./routes/property.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' });
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/properties', propertyRoutes);

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);

        app.listen(process.env.PORT, () => {
           console.log(`Server is listening on port ${process.env.PORT}`)
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();