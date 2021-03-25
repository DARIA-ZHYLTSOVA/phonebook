import React from "react";
import cn from "classnames";
import { addUser } from "../requests/addUser";
import { fetchUser } from "../requests/fetchUser";
import { fetchUsers } from "../requests/fetchUsers";
import App from "./App";


class Login extends React.Component {
  state = {
    login: "",
    password: "",
    isSucces: false,
    classInputLogin: "form-control",
    classInputPassword: "form-control",
  };
  // валидцаия полей
  validateField = (className, field) => {
    // валидция на укр номер
    if (className === "classInputPhone") {
      console.log(className, field);
      const reg = /^\+?3?8?(0[5-9][0-9]\d{7})$/;
      const check = reg.test(field);
      if (!check) {
        this.setState({ [className]: cn("form-control danger") });
      } else {
        this.setState({ [className]: cn("form-control", { danger: !field }) });
      }
    }
    // валидация на почту
    else if (className === "classInputpassword") {
      console.log(className, field);
      const reg = /\S+@\S+\.\S+/;
      const check = reg.test(field);
      if (!check) {
        this.setState({ [className]: cn("form-control danger") });
      } else {
        this.setState({ [className]: cn("form-control", { danger: !field }) });
      }
    } else {
      this.setState({ [className]: cn("form-control", { danger: !field }) });
    }
  };
  // по отправке формы, проверяется заполнение всех полей и очищение их
  signUp = async () => {
    const { login, password } = this.state;
    this.validateForm();
    if (login && password) {
      const repeatUser = await fetchUser(login);
      if (repeatUser) {
        alert("User with this login is exist");
      } else {
        const user = await addUser(login, password);
        console.log(user);
        this.props.history.push({
            pathname: '/Contacts',
            search: `?query=${user._id}`,
           // state: { detail: response.data }
          });
      }
    }
  };

  signIn = async () => {
    const { login, password } = this.state;
    this.validateForm();
    if (login && password) {
      const user = await fetchUser(login);
      if(user){
        this.props.history.push({
          pathname: '/Contacts',
          search: `?query=${user._id}`,
         // state: { detail: response.data }
        })
      }
      else{
        alert("User does not exist");
      }
    }
  };
  // изменение значения в полях
  loginChange = (event) => {
    this.setState({ login: event.target.value });
  };

  passwordChange = (event) => {
    this.setState({ password: event.target.value });
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
    const { login, password } = this.state;
    this.setState({
      classInputlogin: cn("form-control", { danger: !login }),
      classInputpassword: cn("form-control", { danger: !password }),
    });
  };

  render() {
    const { login, password, isSucces, classInputLogin, classInputPassword } = this.state;
    return (
      <div className="main-login">
        <div className="form-login">
        <h3> 📱Phonebook</h3>
          <div className="col list-group-item add">
            <div className="label-input">
              <label htmlFor="login-login">Login</label>
              <input
                id="login-login"
                value={login}
                className={classInputLogin}
                onChange={this.loginChange}
                onBlur={() => this.validateField("classInputlogin", login)}
              ></input>
            </div>
            <div className="label-input">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                value={password}
                type="password"
                className={classInputPassword}
                onChange={this.passwordChange}
                onBlur={() =>
                  this.validateField("classInputpassword", password)
                }
              ></input>
            </div><br></br>
            <div className="block-button-login">
              {/* кнопки добавления, удаления из избранного */}
              <div className="button-sign">
                <button
                  className="btn btn-primary login"
                  onClick={() => this.signIn()}
                  
                >
                  Sign In
                </button>
              </div><br></br>
              {/* кнопка удаления */}
              <div className="button-sign">
                <button
                  className="btn btn-primary login"
                  onClick={() => this.signUp()}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
