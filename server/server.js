require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models");
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middleware");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT ?? 5001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
