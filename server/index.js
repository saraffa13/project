const dotenv = require('dotenv').config();
const express = require("express");
const cors = require('cors')

const userRouter = require('./routes/user-routes');
const cartRouter = require('./routes/cart-routes');
const medicineRouter = require('./routes/medicine-routes');
const translationRouter = require('./routes/translation-routes');
const orderRouter = require('./routes/order-routes');

const cookieParser = require('cookie-parser');
const connectToDb = require('./config/dbConfig');

const PORT = process.env.PORT || 3000

const app = express();


app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization '],
    credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    return res.status(200).send("Server is running fine!")
})

app.use('/user', userRouter)
app.use('/medicine', medicineRouter)
app.use('/cart', cartRouter)
app.use('/translation', translationRouter)
app.use('/order', orderRouter)

app.listen(PORT, async () => {
    await connectToDb(process.env.NODE_ENV === 'test' ? process.env.TEST_MONGO_URL : process.env.MONGO_URL)
    console.log('server running fine!');
})

module.exports.app = app;