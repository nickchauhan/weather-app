var getUser = (id, callback) => {
  var user = {
    id: id,
    name: "Prakash"
  };
  setTimeout(() => callback(user), 1000);
};

getUser(12, user => {
  console.log(user);
});
