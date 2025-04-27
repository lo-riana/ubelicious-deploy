const sqlite3 = require("sqlite3").verbose();
const path = require("path");

function initializeDatabase() {
  const dbPath = path.join(__dirname, "ubelicious.db");
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Erreur d'initialisation de la base de données:", err.message);
    } else {
      console.log("Base de données initialisée avec succès.");
    }
  });
  return db;
}

function getRecettes(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM recettes", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getRecetteById(db, id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM recettes WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function addRecette(db, recette, userId) {
  return new Promise((resolve, reject) => {
    const { titre, ingredients, etapes } = recette;
    db.run(
      "INSERT INTO recettes (titre, ingredients, etapes, utilisateur_id) VALUES (?, ?, ?, ?)",
      [titre, ingredients, etapes, userId],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function updateRecette(db, id, titre, ingredients, etapes) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE recettes SET titre = ?, ingredients = ?, etapes = ? WHERE id = ?",
      [titre, ingredients, etapes, id],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

function deleteRecette(db, id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM recettes WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}

function getRecommandations(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM recommandations", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getRecommandationsByUtilisateur(db, userId) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM recommandations WHERE utilisateur_id = ?", [userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function addRecommandation(db, recommandation) {
  return new Promise((resolve, reject) => {
    const { titre, description, utilisateur_id } = recommandation;
    db.run(
      "INSERT INTO recommandations (titre, description, utilisateur_id) VALUES (?, ?, ?)",
      [titre, description, utilisateur_id],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function deleteRecommandation(db, id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM recommandations WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}

function registerUtilisateur(db, email, password) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO utilisateurs (email, password) VALUES (?, ?)",
      [email, password],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function loginUtilisateur(db, email, password) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM utilisateurs WHERE email = ? AND password = ?",
      [email, password],
      (err, row) => {
        if (err) reject(err);
        else if (!row) reject(new Error("Utilisateur non trouvé"));
        else resolve(row);
      }
    );
  });
}

function loginAdmin(db, email, password) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM administrateurs WHERE email = ? AND password = ?",
      [email, password],
      (err, row) => {
        if (err) reject(err);
        else if (!row) reject(new Error("Administrateur non trouvé"));
        else resolve(row);
      }
    );
  });
}

module.exports = {
  initializeDatabase,
  getRecettes,
  getRecetteById,
  addRecette,
  updateRecette,
  deleteRecette,
  getRecommandations,
  getRecommandationsByUtilisateur,
  addRecommandation,
  deleteRecommandation,
  registerUtilisateur,
  loginUtilisateur,
  loginAdmin,
};
