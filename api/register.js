const db = require("../database");

module.exports = async (req, res) => {
  const database = db.initializeDatabase();

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const userId = await db.registerUtilisateur(database, email, password);
      res.status(201).json({ id: userId, message: "Utilisateur inscrit" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
};
