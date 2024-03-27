const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = 3001;


const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection

const authRoutes = require('./route/authRoutes');
const eventRoutes = require('./route/eventRoutes');
const userRoutes = require('./route/userRoutes');
const rateRoutes = require('./route/rateRoutes');




app.use(express.json());

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


app.use(`${process.env.API_VERSION}`, authRoutes)
app.use(`${process.env.API_VERSION}events`, eventRoutes)
app.use(`${process.env.API_VERSION}users`, userRoutes)
app.use(`${process.env.API_VERSION}rates`, rateRoutes)











