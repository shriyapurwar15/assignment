const express = require('express')
require("dotenv").config(); 
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./utils/DB');
const groupRoutes = require("./routes/groupRoutes");
const notesRoutes = require("./routes/notesRoutes");

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.use("/api/v1/group",groupRoutes)
app.use("/api/v1/notes",notesRoutes)


app.listen(process.env.PORT,console.log(`Server Running on Port ${process.env.PORT}`))