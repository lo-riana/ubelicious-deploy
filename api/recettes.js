/*const db = require("../database");

module.exports = async (req, res) => {
  const database = db.initializeDatabase();

  if (req.method === "GET") {
    try {
      const recettes = await db.getRecettes(database);
      res.status(200).json(recettes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
  else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
};*/

// pages/api/recettes.js

const recettesMock = [
  {
    id: 1,
    titre: "Gâteau à l'ube",
    description: "Un délicieux gâteau violet moelleux.",
    ingredients: ["ube", "farine", "sucre", "beurre", "œufs"],
    etapes: [
      "Préchauffez le four à 180°C.",
      "Mélangez l'ube râpé avec les autres ingrédients.",
      "Versez dans un moule beurré.",
      "Faites cuire pendant 40 minutes."
    ]
  },
  {
    id: 2,
    titre: "Tarte à l'ube",
    description: "Une tarte onctueuse au goût doux et sucré.",
    ingredients: ["ube", "pâte sablée", "crème liquide", "sucre"],
    etapes: [
      "Étalez la pâte dans un moule à tarte.",
      "Préparez une crème à l'ube.",
      "Versez sur la pâte.",
      "Cuire 30 minutes à 170°C."
    ]
  }
];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(recettesMock);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}

