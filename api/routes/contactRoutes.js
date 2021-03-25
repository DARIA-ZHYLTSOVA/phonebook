// импортируем монгус для работы с бд
const mongoose = require("mongoose");
// создаем схему объекта, который будет элементом коллекции
const Schema = mongoose.Schema;
// схема
const contactScheme = new Schema(
  {
    name: String,
    email: String,
    phone: Number,
    isFavourite: Boolean,
    idUser: String,
  },
  { collection: 'contacts' }
);
const Contact = mongoose.model("Contact", contactScheme);
// валидцаия формы, которую мы отправляем на сервер
const validateForm = (name, email, phone) => {
  if (name && email && phone) {
    return true;
  } else {
    return false;
  }
};
// функция добавления в коллекции объекта
module.exports = function (app) {
  app.post("/", (req, res) => {
  console.log(req.body)
    const { name, email, phone, idUser } = req.body;
    if (validateForm(name, email, phone)) {
      contact = new Contact(req.body);
      contact.save(function () {
        res.send(contact);
      });
    } else {
      res.send(contact);
    }
  });
  // функция получение объекта из коллекции в бд
  app.get("/:id", (req, res) => {
    console.log(req.params.id)
    Contact.findOne({ _id: req.params.id }, function (err, contact) {
      res.send(contact);
    });
  });
  // функция получения всех объектов из коллекции
  app.get("/", (req, res) => {
    console.log(req.params.id)
    Contact.find({}, function (err, contacts) {
      res.send(contacts);
    });
  });
  // функция удаления объекта из коллекции
  app.delete("/:id", (req, res) => {
    Contact.findByIdAndDelete(req.params.id, function (err) {
      Contact.find({}, function (err, contacts) {
        res.send(contacts);
      });
    });
  });
  // функция апдейта оюъекта в коллекции 
  app.put("/:id", (req, res) => {
    Contact.findOneAndUpdate(
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
