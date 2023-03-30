const express = require('express');
const cors = require('cors');
const loginRoutes = require('./Routes/LoginRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoutes);
app.use('/', (req, res) => res.status(200).send('tamo on'));

module.exports = app;
