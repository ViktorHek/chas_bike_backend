const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");

const PORT = 3001

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./requests/index.js")(app);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});