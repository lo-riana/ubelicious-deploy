const db = require("../database");

module.exports = async (req, res) => {
  const database = db.initializeDatabase();

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await db.loginUtilisateur(database, email, password);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
};
