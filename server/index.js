const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const registerRoute = require("./routes/auth");
const taskRouter = require("./routes/task")
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 8000

app.use("/api/auth", registerRoute);
app.use("/api/task", taskRouter);
app.use("/api/user",userRouter);

mongoose.set('strictQuery', true);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true })
    .then(() => console.log("Connection successful")).catch((err) => console.log(err));

    
    

// app.get("/", (req, res) => res.send("API Running"));
app.listen(8000, () => console.log(`server is running on 8000`));