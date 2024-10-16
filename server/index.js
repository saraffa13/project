const dotenv = require('dotenv').config();
const express = require("express");
const cors = require('cors')

const connection = require("./config/dbConfig");
const userRouter = require('./routes/user-routes');
const cartRouter = require('./routes/cart-routes');
const medicineRouter = require('./routes/medicine-routes');

const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000

const app = express();


app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5174', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Allow credentials (cookies)
};
1

app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    return res.status(200).send("Server is running fine!")
})

app.use('/user', userRouter)
app.use('/medicine', medicineRouter)
app.use('/cart', cartRouter)

app.listen(PORT, async () => {
    await connection;
    console.log('server running fine!');
})