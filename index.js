const exprpess = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = exprpess();
const port = 3000;
const userRouters = require("./routers/users");
app.use(bodyParser.json());

app.use("/api/taskManagement", userRouters);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
