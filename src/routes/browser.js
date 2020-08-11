"use strict";

const express = require("express");
let router = express.Router();

router.route("/login").get((req, res) => {
  return res.render("create-account.html");
});

router.route("/smart").get((req, res) => {
  return res.render("smart.html");
});

router.route("/dispositivo").get((req, res) => {
  return res.render("dispositivo.html");
});

router.route("/calculadora").get((req, res) => {
  return res.render("calculadora.html");
});

router.route("/configuracao").get((req, res) => {
  return res.render("configuracao.html");
});

router.route("/cadastrodispositivo").get((req, res) => {
  return res.render("cadastro-dispositivo.html");
});

router.route("/consumo").get((req, res) => {
  return res.render("consumo.html");
});

router.route("/cad-panel").get((req, res) => {
  return res.render("cad-panel.html");
});

module.exports = router;
