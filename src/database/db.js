// Importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

// Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// Utilizar o objeto de banco de dados, para nossas operações

db.serialize(() => {
  const step = 0;
  if (step == 1) {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT
    );
    `);

    let query = `
    INSERT INTO users (
      email,
      password
    ) VALUES (?,?);
  `;

    let values = [
      {
        email: "admin@2eco.com",
        password: "U2FsdGVkX18FNpTc5CEJdPaQMSpzsdE5QIkkOq1YxC4=",
      },
    ];

    runInsertData();

    function afterInsertData(err) {
      if (err) {
        return console.log(err);
      }

      console.log("Cadastrado com sucesso");
      console.log(this);
    }

    function runInsertData() {
      // comando que adicionar informações na tabela
      for (var i = 0; i < values.length; i++) {
        const arrObject = values[i];
        const arrvalues = [];
        for (var key in arrObject) {
          if (arrObject.hasOwnProperty(key)) {
            arrvalues.push(arrObject[key]);
          }
        }
        db.run(query, arrvalues, afterInsertData);
      }
    }
  }
});
