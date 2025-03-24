// Detect User is Login or not

const isLogin = async userID => {
  const resp = await fetch("https://train-react-159d4-default-rtdb.firebaseio.com/users.json");
  const data = await resp.json();
  const users = Object.entries(data);

  return users.some(user => user[0] === userID);
};

export { isLogin };
