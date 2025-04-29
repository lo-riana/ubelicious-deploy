const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes importées
app.use("/api/admin_login", require("./admin_login"));
app.use("/api/delete_recette", require("./delete_recette"));
app.use("/api/delete_recommandation", require("./delete_recommandation"));
app.use("/api/login", require("./login"));
app.use("/api/recette_by_id", require("./recette_by_id"));
app.use("/api/recettes", require("./recettes"));
app.use("/api/recommandations", require("./recommandations"));
app.use("/api/recommandations_utilisateur", require("./recommandations_utilisateur"));
app.use("/api/register", require("./register"));
app.use("/api/update_recette", require("./update_recette"));

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
