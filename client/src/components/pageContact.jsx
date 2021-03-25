import React from "react";
// линк обратно к контактам
import { Link } from "react-router-dom";
// запрос get из бд по айди контакта который передается при переходе на эту страницу в параметрах
import { fetchContact } from "../requests/fetchContact";

// класс компонент
class Contact extends React.Component {
  // состояние комп - контакт
  state = {
    contact: "",
    idUser: "",
  };
  //  метод жизненного цикла до загрузки, вытягиваем контакт
  async componentDidMount() {
    console.log(this.props.match.params.id);
    const idContact = this.props.match.params.id.substring(0, 24);
    const idUser = this.props.match.params.id.substring(24);
    console.log(idUser);
    const contact = await fetchContact(idContact);
    this.setState({ contact: contact, idUser: idUser });
  }
  back = () => {
    this.props.history.push({
      pathname: "/Contacts/",
      search: `?query=${this.state.idUser}`,
      // state: { detail: response.data }
    });
  };

  render() {
    // деструктуризация
    const { name, email, phone, isFavourite } = this.state.contact;
    return (
      <div className="container-phone">
        <div className="row list-group-item">
          <div className="phone-p">
            <p>
              {name} / {email} / {phone}
              {isFavourite && `⭐️`}
            </p>
          </div>

          <div className="cell">
            {/* линк обратно на главную страницу */}
            <button
              className="btn btn-secondary custom-button"
              onClick={() => this.back()}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}
// экспортируем контакт
export default Contact;
