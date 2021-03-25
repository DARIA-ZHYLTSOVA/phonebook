// запрос на получение по айди
const fetchContact = async (id) => {
    const response = await fetch(
        `http://localhost:4000/${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return await response.json();
      
}
export { fetchContact };