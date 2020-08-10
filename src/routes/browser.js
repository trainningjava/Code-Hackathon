"use strict";

const express = require("express");
let router = express.Router();

router
  .route("/login")
  .get((req, res) => {
    return res.render("create-account.html");
  })

  .route("/create-tax")
  .get((req, res) => {
    return res.render("consumo.html");
  })

  .route("/smart")
  .get((req, res) => {
    return res.render("smart.html");
  })

  .route("/dispositivo")
  .get((req, res) => {
    return res.render("dispositivo.html");
  })

  .route("/calculadora")
  .get((req, res) => {
    return res.render("calculadora.html");
  })

  .route("/configuracao")
  .get((req, res) => {
    return res.render("configuracao.html");
  })

  .route("/cadastrodispositivo")
  .get((req, res) => {
    return res.render("cadastro-dispositivo.html");
  })

  .route("/consumo")
  .get((req, res) => {
    return res.render("consumo.html");
  })

  .route("/cad-panel")
  .get((req, res) => {
    return res.render("cad-panel.html");
  });

module.exports = router;
