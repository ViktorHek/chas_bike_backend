const fakeData = require("../database/fakeData");

module.exports = function (app) {
  app.put("/register", (req, res) => {
    try {
      res.send(registerNewUser(req.body));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.post("/login", (req, res) => {
    try {
      res.send(login(req.body));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.get("/bikes/all", (req, res) => {
    try {
      res.send(fakeData.bikes);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.get("/user", (req, res) => {
    try {
      res.send(fakeData.users[0]);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
};

const users = fakeData.users;

function registerNewUser(data) {
  let newUser = {
    userName: data.payload.userName,
    password: data.payload.password,
    email: data.payload.email,
    kilometers: 0,
    rides: 0,
    carbon: 0,
    favoritBike: 0,
    imgUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80",
    money: 5000,
    history: [],
    events: [],
    pinnedGiftId: 0,
    points: 0,
  };
  users.push(newUser);
  return "A new user was successfully added";
}

function login(data) {
  let user = users.filter((el) => el.userName === data.payload.userName);
  if (user.length) {
    if (user[0].password == data.payload.password) {
      return user[0];
    }
  }
  return "invalid username or password";
}

function getCategorys() {
  let categoryList = [];
  fakeData.forEach((element) => {
    categoryList.push(element.category);
  });
}
