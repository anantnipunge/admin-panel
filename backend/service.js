const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const db = process.env.DATABASE_URL;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🚀 MongoDB Connected..."))
  .catch((err) => console.log(err));

//Routes
const product = require("./routes/api/product");

//Use Routes
app.use("/api/product", product);

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`✈️  Server running on port http://localhost:${port}`)
);
