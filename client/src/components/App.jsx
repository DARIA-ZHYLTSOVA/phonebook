import React from "react";
import AddContact from "./addContact";
import { fetchContacts } from "../requests/fetchContacts";
import { updateStatus } from "../requests/updateStatus";
import { ContactTable } from "./contactTable";
// главный компонент приложения
class App extends React.Component {
  // состояние, в котором храним все контакты
  state = {
    contacts: [],
    search: "",
    idUser: "",
  };
  // выполняем асинхронную функцию получения всех контактов
  getContacts = async (_idUser) => {
    const allContacts = await fetchContacts();
    const contacts = allContacts.filter(({idUser}) => idUser === _idUser);
    // обновляем состояние
    this.setState({ contacts: contacts, idUser: _idUser });
  };
  // метод жизненного цикла, который выполняется при загрузке
  async componentDidMount() {
    const tmp = this.props.location.search;
    this.setState({idUser: tmp.substring(7)})
    this.getContacts(this.props.location.search.substring(7));
  }
  // асинхр функция удаления контакта
  remove = async (id) => {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });
    const contacts = await response.json();
    this.getContacts(this.props.location.search.substring(7))
  };
  // функции добавления в избранное или удаление из него
  addOrCancelStatus = async (id) => {
    const { isFavourite } = this.state.contacts.find(({ _id }) => _id === id);
    const contacts = await updateStatus(id, isFavourite);
    this.getContacts(this.props.location.search.substring(7))
  };
  searchChange = (event) => {
    this.setState({ search: event.target.value });
  };
  // Поиск контактов
  searchContacts = () =>{
    let contactSearched = [];
    if(this.state.search){
      contactSearched = this.state.contacts.filter((contact) => {
        if(contact.name.includes(this.state.search) === true){
          return contact;
        }
        else{
          return "";
        }
      })
    }
    return contactSearched;
  }
  removeUser = async () =>{
    if(window.confirm("Are you sure?")){   
      const response = await fetch(`http://localhost:4001/${this.state.idUser}`, {
        method: "DELETE",
      });
      const users = await response.json();
      this.props.history.push({
        pathname: '/',
        search: `?query=${this.state.idUser}`,
        // state: { detail: response.data }
      })
    }
  }
  // метод жизненного цикла, рендерить то, что в нем
  render() {
    // деструктуризация
    const { contacts, search, idUser } = this.state;
    // разбиваем контакты на избранные и нет
    const contactsFavourite = contacts.filter(({ isFavourite }) => isFavourite);
    const contactsJust = contacts.filter(({ isFavourite }) => !isFavourite);
    const contactSearched = this.searchContacts();
    // разметка
    return (
      <div className="main">
        <br />
        <div className="form">
          <div className="title">
            <h3>📱 Phonebook </h3>
            <button className="btn btn-outline-danger" onClick={()=>this.removeUser()}>🗑</button>
          </div>
          <br />
          <h4>Create contact</h4>
          
          {/* отрисовываем компонент форму для добавления контактов */}
          <AddContact getContacts={this.getContacts} idUser ={idUser} />
        </div>
        <br />
        <div className="label-input">
        <label htmlFor="phone-search">Find Contact</label>
          <input
            id="phone-search"
            className="form-control"
            value={search}
            onChange={this.searchChange}
          ></input>
        </div>
        {/* отрисовываем компонент список контактов с примением поиска */}
        {(contactSearched.length !== 0) && (
          <div className="lists">
            <ContactTable
              header={<h4>Found ({contactSearched.length})</h4>}
              contacts={contactSearched}
              addOrCancelStatus={this.addOrCancelStatus}
              remove={this.remove}
              idUser ={idUser}
            />
            <br />
          </div>
        )}
        {/* отрисовываем компонент список контактов со статусом "избранное" и передаем пропсами контакты и функции */}
        
        {(contactsFavourite.length !== 0 && contactSearched.length === 0 && search.length === 0) && (
          <div className="lists">
            <ContactTable
              header={<h4> Favourite ({contactsFavourite.length})</h4>}
              contacts={contactsFavourite}
              addOrCancelStatus={this.addOrCancelStatus}
              remove={this.remove}
              idUser ={idUser}
            />
            <br />
          </div>
        )}
        {/* отрисовываем компонент список контактов со статусом "не избранное" и передаем пропсами контакты и функции */}
        {(contactsJust.length !== 0 && contactSearched.length === 0  && search.length === 0) && (
          <div className="lists">
            <ContactTable
              header={<h4>Contacts ({contactsJust.length})</h4>}
              contacts={contactsJust}
              addOrCancelStatus={this.addOrCancelStatus}
              remove={this.remove}
              idUser ={idUser}
            />
            <br />
          </div>
        )}
      </div>
    );
  }
}
// экспортируем компонент, используется в индексе
export default App;
