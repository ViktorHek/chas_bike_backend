module.exports = function (app) {
  app.get("/user", (req, res) => {
    try {
      res.send("access user");
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
};
