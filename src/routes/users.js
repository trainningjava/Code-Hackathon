"use strict";

const express = require("express");
const db = require("../database/db");
let router = express.Router();

const CryptoJS = require("crypto-js");
const key1 = "secretkey249";

router.use(function (req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});

router
  .route("/login")
  .get((req, res) => {
    console.dir({ req });
    const email = req.query.email;
    const senha = req.query.password;
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
  })

  .post((req, res) => {
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

module.exports = router;
