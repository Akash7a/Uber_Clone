import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
    path:"./.env"
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());

export default  app;