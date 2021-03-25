// импортируем монгус для работы с бд
const mongoose = require("mongoose");
// создаем схему объекта, который будет элементом коллекции
const Schema = mongoose.Schema;
// схема
const userScheme = new Schema(
  {
    login: String,
    password: String,
  },
  { collection: 'users' }
);
const User = mongoose.model("User", userScheme);
// валидцаия формы, которую мы отправляем на сервер
const validateForm = (login, password) => {
  if (login && password) {
    return true;
  } else {
    return false;
  }
};
// функция добавления в коллекции объекта
module.exports = function (app1) {
  app1.post("/", (req, res) => {
    const { login, password } = req.body;
    if (validateForm(login, password)) {
        user = new User(req.body);
        user.save(function () {
        res.send(user);
      });
    } else {
      res.send(err);
    }
  });
  // функция получение объекта из коллекции в бд
  app1.get("/:id", (req, res) => {
    User.findOne({ login: req.params.id }, function (err, user) {
      console.log(err);
      user ? res.send(user) : res.json(err);
    });
  });
  // функция получения всех объектов из коллекции
  app1.get("/", (req, res) => {
    User.find({}, function (err, contacts) {
      res.send(contacts);
    });
  });
  // функция удаления объекта из коллекции
  app1.delete("/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id, function (err) {
      User.find({}, function (err, users) {
        res.send(users);
      });
    });
  });
  // функция апдейта оюъекта в коллекции 
  app1.put("/:id", (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { isFavourite: !req.body.isFavourite },
      { new: true },
      function () {
        Contact.find({}, function (err, contacts) {
          res.send(contacts);
        });
      }
    );
  });
};
