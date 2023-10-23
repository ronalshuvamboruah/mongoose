const mongoose = require("mongoose");
const uri =
  "mongodb+srv://Ronal:Ronal123@cluster0.7zchqrh.mongodb.net/?retryWrites=true&w=majority";
const express = require("express");
const { rateLimit } = require('express-rate-limit')
const Routes = require("./Routes/userRoutes");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const winston = require("winston");
const fs = require("fs");
const path = require("path");
// const cors=require("cors")
const { combine, timestamp, printf, colorize, align, json } = winston.format;

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})
const app = express();
app.use(express.json());
app.use(limiter)
app.use(morgan("combined", { stream: accessLogStream }));

const corsOptions = {
  origin: "https://localhost:3000", // Allow requests from a specific origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed HTTP methods
  credentials: true, // Allow cookies and authentication headers to be included
};
app.use(cors(corsOptions));
app.use("/api", Routes);
dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV == "development") {
  logger.log({
    level: "info",
    message: "Hello distributed log files!",
  });
  logger.error("If Error occurs handle in this");
  logger.warn("If warning occurs handle in this");
}

let PORT = process.env.PORT || 6004;

//DB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//server running

app.listen(PORT, () => {
  console.log(`Server up and running ${PORT}`);
});
