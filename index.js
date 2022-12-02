import dotenv from 'dotenv/config.js'; // for initializing environment variables
import express from 'express';
import OrderRoute from './src/routes/Order.js';
const app = express()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

app.use(express.json())

app.use('/orders',OrderRoute)