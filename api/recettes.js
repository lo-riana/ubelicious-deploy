// pages/api/recettes.js

const recettesMock = [
  {
    id: 1,
    titre: "Gâteau à l'ube",
    description: "Un délicieux gâteau violet moelleux.",
    ingredients: "ube, farine, sucre, beurre, œufs",
    etapes: "Préchauffez le four à 180°C.\nMélangez l'ube râpé avec les autres ingrédients.\nVersez dans un moule beurré.\nFaites cuire pendant 40 minutes."
  },
  {
    id: 2,
    titre: "Tarte à l'ube",
    description: "Une tarte onctueuse au goût doux et sucré.",
    ingredients: "ube, pâte sablée, crème liquide, sucre",
    etapes: "Étalez la pâte dans un moule à tarte.\nPréparez une crème à l'ube.\nVersez sur la pâte.\nCuire 30 minutes à 170°C."
  }
];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(recettesMock);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
