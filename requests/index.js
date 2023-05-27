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
      return "Welcom back " + user[0].userName;
    }
  }
  return "invalid username or password";
}
