const express = require('express');
const cors = require('cors');
const loginRoutes = require('./Routes/LoginRouter');
const registerRoutes = require('./Routes/registerRouter');
const productRoutes = require('./Routes/ProductRouter');
const sellerRouter = require('./Routes/sellerRouter');
const saleRouter = require('./Routes/saleRouter');
const userRouter = require('./Routes/userRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/products', productRoutes);
app.use('/sellers', sellerRouter);
app.use('/users', userRouter);
app.use('/sales', saleRouter);

app.use(express.static('public'));

module.exports = app;
