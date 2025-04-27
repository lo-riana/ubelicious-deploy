const db = require("../database");

module.exports = async (req, res) => {
  const database = db.initializeDatabase();

  if (req.method === "GET") {
    try {
      const recommandations = await db.getRecommandations(database);
      res.status(200).json(recommandations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else if (req.method === "POST") {
    try {
      const recommandationId = await db.addRecommandation(database, req.body.recommandation);
      res.status(201).json({ id: recommandationId, message: "Recommandation ajoutée" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
};
