const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(console.log("Database connected succefull"))
    .catch((error) =>{
        console.log("Databse not connected");
        console.error(error);
        process.exit(1);
    })
}

module.exports = dbConnection;