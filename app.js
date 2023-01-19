require("dotenv").config();
require("express-async-errors");
const notFoundMiddleware = require("./middleware/not_found");
const errorMiddleware = require("./middleware/error_handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const express = require("express");
const app = express();

// Middleware

app.use(express.json());

// Routes

app.get("/", (request, response) => {
  response.send(
    '<h1>Store API</h1><a href="/api/v1/products">Products route</a>'
  );
});

app.use("/api/v1/products", productsRouter);

// Products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
