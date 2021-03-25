import React from "react";
// импортируем компонент, который отрисовывает нашу запись с контактом
import { PrintContact } from "./printContact";

const ContactTable = (props) =>{
    // деструктуризация
    const { header, contacts, addOrCancelStatus, remove, idUser } = props;
    console.log(idUser);
    return (
      <div id="ava" className="list-group">
      {header}
        {/* идем по массиву контактов и отрисовываем каждый и передаем пропсы  */}
        {contacts.map(
          (contact) =>
            (
              <PrintContact
                contact={contact}
                addOrCancelStatus={addOrCancelStatus}
                remove={remove}
                idUser ={idUser}
              />
            )
        )}
      </div>
    );
  }
  // экпортируем наш компонент
  export {ContactTable};