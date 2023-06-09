const fakeData = require('../database/fakeData')

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

const users = [];

function registerNewUser(data) {
  users.push(data.payload);
  return "A new user was successfully added";
}

function login(data) {
  let user = users.filter((el) => el.userName === data.payload.userName);
  if (user.length) {
    if (user[0].password === data.payload.password) {
      return user[0]
    }
  }
  return "invalid username or password";
}

function getCategorys() {
  let categoryList = []
  fakeData.forEach(element => {
    categoryList.push(element.category)
  });
}