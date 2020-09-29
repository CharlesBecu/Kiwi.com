<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php

        $bdd = new PDO("mysql:host=127.0.0.1;dbname=Kiwi", "root", ""); //conexion à la BDD
        $request = $bdd->query("SELECT nom, prenom FROM Chomeur"); // sélection des données nom et prenom dans la table chomeur
        $resultat = $request->fetch(); // récupère les information sélectionnés
        echo $resultat;


    ?>
</body>
</html>