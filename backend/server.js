import express from "express";
import path from 'path'
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { checkForAuthCookie } from "./middleware/authentication.js";
import mongoose from "mongoose";
import { userRoutes } from "./routes/user.js";
import { productRoute } from "./routes/product.js";

config();
const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_CONNECTIONURL)
    .then(() => console.log("Connected to mongodb"))
    .catch((error) => console.error("MongoDB connection failed:", error));

app.use(express.urlencoded()); // handles form data
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve('./public'))); // static files will be kept here. Express can now see them.


app.get('/', (req, res) => {
    console.log("get request called on root url");
});

app.use('/user', userRoutes);
app.use('/', productRoute);

app.listen(PORT, (err) => { console.log(`Server running at ${PORT}`) });