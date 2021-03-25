// запрос на изменение контакта по айди
const updateStatus = async (id, isFavourite) => {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        isFavourite: isFavourite,
      }),
    });
    return await response.json();
  };

  export { updateStatus };