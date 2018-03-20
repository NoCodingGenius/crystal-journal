const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const routes = require("./server/routes");
const config = require("session.config");

const app = express();
const port = process.env.PORT || 3000;
const SESSION_SECRET = config.SESSION_SECRET

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride("_method"));

app.use(session({
  name: "session_id",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use(routes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
