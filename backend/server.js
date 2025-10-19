const express = require('express');
const mongoose = require('mongoose');
const cookeiParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config()

const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err))

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : 'http://localhost:5173/',
        method : ['GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders :[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true
    })
);

app.use(cookeiParser());
app.use(express.json());

app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`)
)