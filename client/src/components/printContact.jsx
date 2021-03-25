import React from "react";
// компонент для создания ссылки
import { Link } from "react-router-dom";

// функц компонент для отрисовки контакта
const PrintContact = ({
  // деструктурихация
  contact: { _id, name, email, phone, isFavourite },
  addOrCancelStatus,
  remove,
  idUser
}) => {
  const classNameButton = "";
  return (
    <div key={_id} id={_id} className="row list-group-item">
      <div className="phone-p">
        {/* ссылка для переходу на страницу с контактом */}
        <Link to={`/Contact/${_id+idUser}`}>
          <p className="text-justify">
            {name} / {email} / {phone}{" "}
          </p>
        </Link>
      </div>
      <div className="block-button">
        {/* кнопки добавления, удаления из избранного */}
        <div className="button">
          <button
            className={!isFavourite ? "btn btn-primary" : "btn btn-danger"}
            onClick={() => addOrCancelStatus(_id, !isFavourite)}
          >
            {isFavourite ? "👇" : "⭐️"}
          </button>
        </div>
        {/* кнопка удаления */}
        {!isFavourite && (
          <div className="button">
            <button className="btn btn-danger" onClick={() => remove(_id)}>
              🗑
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
// экспортируем наш компонент
export { PrintContact };
