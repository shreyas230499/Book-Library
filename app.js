const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectDb } = require("./dbConnection");
const { bookRouter } = require("./routes/routes");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const cookieParser = require("cookie-parser");

dotenv.config();

connectDb();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(cookieParser());

app.use("/book", bookRouter);
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname + "/public")));

app.listen(3000, () => {
  console.log("server is running on 3000 ");
});
