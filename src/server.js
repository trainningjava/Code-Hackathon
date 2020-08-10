const express = require("express");
const server = express();

const db = require("./database/db");

const port = process.env.PORT || 3000;

// Configura a rota para a pasta PUBLICA
server.use(express.static("public"));

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }));

// Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});
let router = express.Router();
router.use(function (req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});

server.get("/", (req, res) => {
  return res.render("index.html");
});

const users = require("./routes/users");
const browser = require("./routes/browser");

server.use("/users", users);
server.use("/browser", browser);

//ligar o servidor
server.listen(port, (err) => {
  if (err) {
    return console.error("ERROR ", err);
  }
  console.log(`Listening on port ${port}`);
});
