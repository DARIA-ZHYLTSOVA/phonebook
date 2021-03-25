// запрос на получение по айди
const fetchUser = async (login) => {
    const response = await fetch(
        `http://localhost:4001/${login}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return await response.json();
      
}
export { fetchUser };