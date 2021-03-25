import React from "react";
import cn from "classnames";
import { addContact } from "../requests/addContact";
// класс компонент с состоянием полей  и классов применяемых к полям для валидации
class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
    classInputName: "form-control",
    classInputEmail: "form-control",
    classInputPhone: "form-control",
  };
  // валидцаия полей
  validateField = (className, field) => {
    // валидция на укр номер
    if(className === "classInputPhone"){
      console.log(className, field)
      const reg =  /^\+?3?8?(0[5-9][0-9]\d{7})$/;
      const check = reg.test(field);
      if (!check) {
        this.setState({ [className]: cn("form-control danger") });
      }else{
        this.setState({ [className]: cn("form-control", { danger: !field }) });
      }
    }
    // валидация на почту
    else if(className === "classInputEmail"){
      console.log(className, field)
      const reg = /\S+@\S+\.\S+/;
      const check = reg.test(field);
      if (!check) {
        this.setState({ [className]: cn("form-control danger") });
      }else{
        this.setState({ [className]: cn("form-control", { danger: !field }) });
      }
    }else{
      this.setState({ [className]: cn("form-control", { danger: !field }) });
    }
  };
  // по отправке формы, проверяется заполнение всех полей и очищение их
  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, phone } = this.state;
    this.validateForm();
    console.log(this.props.idUser);
    if (name && email && phone) {
      await addContact(name, email, phone, this.props.idUser);
      this.props.getContacts(this.props.idUser);
      this.setState({ name: "", email: "", phone: "" });
    }
  };
  // изменение значения в полях
  nameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  emailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  phoneChange = (event) => {
    // при вводе каждого символа проверяем, что это число
    const value = event.target.value;
    const reg = /^-?\d+\.?\d*$/;
    const check = reg.test(value);
    if (check || !value) {
      this.setState({ phone: event.target.value });
    }
  };
  // -----------------------------------------------
  // валидация формы
  validateForm = () => {
    const { name, email, phone } = this.state;
    this.setState({
      classInputName: cn("form-control", { danger: !name }),
      classInputEmail: cn("form-control", { danger: !email }),
      classInputPhone: cn("form-control", { danger: !phone }),
    });
  };

  render() {
    // деструктуризация
    const {
      name,
      email,
      phone,
      classInputName,
      classInputEmail,
      classInputPhone,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {}
        <div className="row list-group-item add">
          <div className="label-input">
            <label htmlFor="phone-name">Name</label>
            <input
              id="phone-name"
              value={name}
              className={classInputName}
              onChange={this.nameChange}
              onBlur={() => this.validateField("classInputName", name)}
            ></input>
          </div>
          <div className="label-input">
            <label htmlFor="phone-email">Email</label>
            <input
              id="phone-email"
              value={email}
              className={classInputEmail}
              onChange={this.emailChange}
              onBlur={() => this.validateField("classInputEmail", email)}
            ></input>
          </div>
          <div className="label-input">
            <label htmlFor="phone-phone">Phone</label>
            <input
              id="phone-phone"
              value={phone}
              className={classInputPhone}
              onChange={this.phoneChange}
              onBlur={() => this.validateField("classInputPhone", phone)}
            ></input>
          </div>
          <div className="submit-button">
            <button className="btn btn-success" email="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    );
  }
}
//  экспорт компонента
export default AddContact;
