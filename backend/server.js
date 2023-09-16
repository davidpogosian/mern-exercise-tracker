const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// environment variables in .env file
require('dotenv').config();

// create server (port 5000)
const app = express();
const port = process.env.PORT || 5000;

// middleware (allows us to parse json)
app.use(cors());
app.use(express.json());

/* 
database uri (we get it from Atlas dashboard)
connect to database

looks like useCreateIndex isn't supported
*/
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

// once connection is open =>
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established");
});

// starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});