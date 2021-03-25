// запрос на добваление
const addContact = async (name, email, phone, idUser) => {
  const response = await fetch(`http://localhost:4000`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, idUser, isFavourite: false}),
  });
  return await response.json();
};

export { addContact };
