
// запрос на получение всех контактов в коллекции
const fetchContacts = async () => {
    const response = await fetch(`http://localhost:4000/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
     return await response.json();
}
export { fetchContacts };