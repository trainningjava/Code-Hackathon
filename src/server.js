const express = require("express");
const server = express();

const db = require("./database/db");

const CryptoJS = require("crypto-js");

const key1 = "secretkey249";

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

server.get("/", (req, res) => {
  return res.render("index.html");
});

/* ============================================================== */
/*                           A C C E S S                          */
/* ============================================================== */
server.post("/access", (req, res) => {
  const email = req.body.email;
  const senha = req.body.password;
  const secretkey = email + key1;

  let pwd = "";
  db.get(`SELECT password FROM users WHERE email = ?`, [email], function (
    err,
    rows
  ) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    pwd = rows ? rows.password : "";

    if (pwd == "") {
      return res.render("index.html", {
        msg: true,
        msgtxt: "Email não cadastrado",
      });
    }

    var bytes = CryptoJS.AES.decrypt(pwd, secretkey);
    pwd = bytes.toString(CryptoJS.enc.Utf8);

    if (pwd != senha) {
      return res.render("index.html", {
        msg: true,
        msgtxt: "A senha está diferente",
      });
    }
    return res.render("cad-panel.html");
  });
});

/* ============================================================== */
/*                   C R E A T E - A C C O U N T                  */
/* ============================================================== */
server.post("/create-account", (req, res) => {
  return res.render("create-account.html");
});

/* ============================================================== */
/*                        C A D - P A N E L                       */
/* ============================================================== */
server.get("/cad-panel", (req, res) => {
  return res.render("cad-panel.html");
});

/* ============================================================== */
/*                      D I S P O S I T I V O                     */
/* ============================================================== */
server.get("/dispositivo", (req, res) => {
  return res.render("dispositivo.html");
});

/* ============================================================== */
/*                          C O N S U M O                         */
/* ============================================================== */
server.get("/consumo", (req, res) => {
  return res.render("consumo.html");
});

/* ============================================================== */
/*                            S M A R T                           */
/* ============================================================== */
server.get("/smart", (req, res) => {
  return res.render("smart.html");
});

/* ============================================================== */
/*                       C A L C U L A D O R A                    */
/* ============================================================== */
server.get("/calculadora", (req, res) => {
  return res.render("calculadora.html");
});

/* ============================================================== */
/*               C R E A T E - A C C O U N T - A P P              */
/* ============================================================== */
server.post("/create-account-app", (req, res) => {
  const page = "create-account.html";
  const email = req.body.email;
  const senha = req.body.password;
  const senha1 = req.body.password2;
  const secretkey = email + key1;

  if (senha != senha1) {
    return res.render(page, {
      msg: true,
      msgtxt: "As senhas estão diferentes",
    });
  }

  const query = `
  INSERT INTO users (
    email,
    password
  ) VALUES (?,?);
`;
  const values = [req.body.email, req.body.password];

  function afterInsertData(err) {
    if (err) {
      return res.render(page, {
        msg: true,
        msgtxt: "Erro no cadastro",
      });
    }

    return res.render("cad-panel.html", {
      saved: true,
      msgtxt: "Cadastro concluído",
    });
  }
  db.run(query, values, afterInsertData);
});

/* ============================================================== */
/*                         CREATE-TAX                      */
/* ============================================================== */
server.post("/create-tax", (req, res) => {
  // todo
  return res.render("consumo.html");
});

//ligar o servidor
server.listen(3000);
