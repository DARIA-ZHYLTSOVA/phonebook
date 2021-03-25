// импорт библиотек для работы с бд и запросами
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const app1 = express();
const cors = require("cors");
// номер порта
const port = 4000;
const port1 = 4001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("./routes/contactRoutes")(app, {});

app1.use(cors());
app1.use(bodyParser.urlencoded({ extended: true }));
app1.use(bodyParser.json());
require("./routes/userRoutes")(app1, {});
// функция старта сервера
async function start_app() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(port, () => {
      console.log("Server has been started: " + port);
    });
  } catch (e) {
    console.log(e);
  }
}
start_app();

async function start_app1() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app1.listen(port1, () => {
      console.log("Server has been started: " + port1);
    });
  } catch (e) {
    console.log(e);
  }
}
start_app1();