// запрос на добваление
const addUser = async (login, password) => {
    const response = await fetch(`http://localhost:4001`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password}),
    });
    return await response.json();
  };
  
  export { addUser };
  