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

  app.put("/userhistory", (req, res) => {
    try {
      res.send(getHistory(req.body));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.post("/buy", (req, res) => {
    try {
      addHistory(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.post("/add", (req, res) => {
    try {
      addBike(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
};

const users = fakeData.users;
const bikes = fakeData.bikes;

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
    admin: false
  };
  users.push(newUser);
  return "A new user was successfully added";
}

function login(data) {
  let user = users.filter(
    (el) => el.userName.toLocaleLowerCase() === data.payload.userName.toLocaleLowerCase()
  );
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

function addHistory(data) {
  users.forEach((el) => {
    if(el.userName.toLocaleLowerCase() === data.userName.toLocaleLowerCase()) {
      el.history.push(data.bike)
    }
  })
}

function getHistory(data) {
  let returnVal = {user: {}, history: []};
  let user = users.filter(
    (el) => el.userName.toLocaleLowerCase() === data.userName.toLocaleLowerCase()
  );
  returnVal.user = user[0]
  user[0].history.forEach((id) => {
    let bike = fakeData.bikes.filter((el) => el.id == id);
    returnVal.history.push(bike[0]);
  });
  return returnVal;
}

function addBike(data) {
  console.log("ddata: ", data)
  bikes.push(data.payload)
}
