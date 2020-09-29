-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  mar. 29 sep. 2020 à 16:32
-- Version du serveur :  10.3.16-MariaDB
-- Version de PHP :  7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `Kiwi`
--

-- --------------------------------------------------------

--
-- Structure de la table `Ads`
--

CREATE TABLE `Ads` (
  `IdAds` int(11) NOT NULL,
  `Titre` text NOT NULL,
  `Entreprise` text NOT NULL,
  `Lieu` text NOT NULL,
  `Salaire` int(11) DEFAULT NULL,
  `Description` text NOT NULL,
  `DateAds` date NOT NULL,
  `DescriptionFull` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Chomeur`
--

CREATE TABLE `Chomeur` (
  `IdChomeur` int(11) NOT NULL,
  `mail` text NOT NULL,
  `lieu` text NOT NULL,
  `IdConv` int(11) DEFAULT NULL,
  `description` text NOT NULL,
  `psw` text NOT NULL,
  `nom` text NOT NULL,
  `prenom` text NOT NULL,
  `experiencePro` text NOT NULL,
  `projet` text NOT NULL,
  `competences` text NOT NULL,
  `telephone` int(11) DEFAULT NULL,
  `formation` text NOT NULL,
  `centreInteret` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Chomeur`
--

INSERT INTO `Chomeur` (`IdChomeur`, `mail`, `lieu`, `IdConv`, `description`, `psw`, `nom`, `prenom`, `experiencePro`, `projet`, `competences`, `telephone`, `formation`, `centreInteret`) VALUES
(1, '', '', NULL, '', '', 'Boutonton', 'Billy', '', '', '', NULL, '', '');

-- --------------------------------------------------------

--
-- Structure de la table `Company`
--

CREATE TABLE `Company` (
  `IdCompany` int(11) NOT NULL,
  `Name` text NOT NULL,
  `IdAds` int(11) DEFAULT NULL,
  `Employeurs` text NOT NULL,
  `IdConv` int(11) DEFAULT NULL,
  `Lieux` text NOT NULL,
  `Description` text NOT NULL,
  `SuperU` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Professionnel`
--

CREATE TABLE `Professionnel` (
  `IdPro` int(11) NOT NULL,
  `mail` text NOT NULL,
  `IdCompany` int(11) DEFAULT NULL,
  `IdConv` int(11) DEFAULT NULL,
  `psw` text NOT NULL,
  `nom` text NOT NULL,
  `prenom` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Ads`
--
ALTER TABLE `Ads`
  ADD PRIMARY KEY (`IdAds`);

--
-- Index pour la table `Chomeur`
--
ALTER TABLE `Chomeur`
  ADD PRIMARY KEY (`IdChomeur`);

--
-- Index pour la table `Company`
--
ALTER TABLE `Company`
  ADD PRIMARY KEY (`IdCompany`);

--
-- Index pour la table `Professionnel`
--
ALTER TABLE `Professionnel`
  ADD PRIMARY KEY (`IdPro`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Ads`
--
ALTER TABLE `Ads`
  MODIFY `IdAds` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Chomeur`
--
ALTER TABLE `Chomeur`
  MODIFY `IdChomeur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Company`
--
ALTER TABLE `Company`
  MODIFY `IdCompany` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Professionnel`
--
ALTER TABLE `Professionnel`
  MODIFY `IdPro` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
