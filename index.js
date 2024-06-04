const express = require('express');
require('dotenv').config();
const app = express();
const dbConnection = require('./config/database');
const user = require('./routes/user')
const cookieParser = require('cookie-parser');

//middleware
app.use(cookieParser());
app.use(express.json());

//defing routes
app.use('/api/v1' , user)

dbConnection();

//server activation
app.listen(process.env.PORT , ()=>{
    console.log(`App is listening at port ${process.env.PORT}`)
} )




