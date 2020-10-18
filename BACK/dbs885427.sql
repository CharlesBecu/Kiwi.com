-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Hôte : db5001024440.hosting-data.io
-- Généré le : Dim 18 oct. 2020 à 14:58
-- Version du serveur :  5.7.30-log
-- Version de PHP : 7.0.33-0+deb9u10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dbs885427`
--

-- --------------------------------------------------------

--
-- Structure de la table `COMPANY`
--

CREATE TABLE `COMPANY` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL DEFAULT 'NO_NAME',
  `TEAM` json NOT NULL,
  `CONVS` json NOT NULL,
  `UNPUBLISHED` json NOT NULL,
  `ADS` json NOT NULL,
  `WTEAM` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `COMPANY`
--

INSERT INTO `COMPANY` (`ID`, `NAME`, `TEAM`, `CONVS`, `UNPUBLISHED`, `ADS`, `WTEAM`) VALUES
(0, 'Alphabet', '[\"\"]', '[\"\"]', 'null', 'null', 'null'),
(1, 'Job Kiwi', '[\"\"]', '[\"\"]', 'null', 'null', 'null'),
(10, '', 'null', 'null', 'null', 'null', '42'),
(11, 'NO_NAME', 'null', 'null', 'null', 'null', '428');

-- --------------------------------------------------------

--
-- Structure de la table `JOBAD`
--

CREATE TABLE `JOBAD` (
  `ID` int(11) NOT NULL,
  `START` date NOT NULL,
  `OWNER` int(11) NOT NULL,
  `END` date DEFAULT NULL,
  `TITLE` mediumtext NOT NULL,
  `COMPANY` int(11) NOT NULL,
  `LOCATION` mediumtext NOT NULL,
  `CONTRACT` varchar(50) NOT NULL,
  `TAGS` json NOT NULL,
  `SALARY` mediumtext NOT NULL,
  `PREVIEW` mediumtext NOT NULL,
  `FULL` mediumtext NOT NULL,
  `VIEW` int(11) NOT NULL,
  `OPEN` int(11) NOT NULL,
  `APPLICANT` json NOT NULL,
  `CHATS` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `JOBAD`
--

INSERT INTO `JOBAD` (`ID`, `START`, `OWNER`, `END`, `TITLE`, `COMPANY`, `LOCATION`, `CONTRACT`, `TAGS`, `SALARY`, `PREVIEW`, `FULL`, `VIEW`, `OPEN`, `APPLICANT`, `CHATS`) VALUES
(1, '2020-10-10', 284, NULL, 'Développeur Front-End Angular', 0, 'Nice, France', 'Alternance', '[\"Angular\", \"Bootstrap\"]', '25k€ - 30k€', 'PREVIEWkjblhjkvghjcfxdhfhgcjvjbhknlkmlbjmkyusrteqrz<ywdxtufvguoibomnbiguifudtrstewyzxdtucfvguobhinjmbugyfuticdretywrzxdytcfyivbhinomiuivucrxterwzsxdtcfvgybhunijhlbvyucrxtewyrxdcftuvgbuhnijlbyugvtcirxeywxdcfugvihbhjnbhogvycrxewyztsxdrycvyigboibuyuvoctixerwyzxrydtcfvgbuhoinpbihouvgycutyxrdctfuvgbuohinpibygurderyzetwsxrydcfvgyubohinipbuyogufydruexsyctufyvgubhoipbyouvtiycrtuxeytducfyvigubohibhpovuticryuxtinomiuivucrxterwzsxdtcfvgybhunijhlbvyucrxtewyrxdcftuvgbuhnijlbyugvtcirxeywxdcfugvihbhjnbhogvycrxewyztsxdrycvyigboibuyuvoctixerwyzxrydtcfvgbuhoinpbihouvgycutyxrdctfuvgbuohinpibygurderyzetwsxrydcfvgyubohinipbuyogufydruexsyctufyvgubhoipbyouvtiycrtuxeytducfyvigubohibhpovuticryuxt', '{\"ops\":[{\"attributes\":{\"bold\":true},\"insert\":\"Lorem ipsum dolor sit amet, c\"},{\"insert\":\"\\n\\nonsectetur adipiscing elit. Praesent tristique sagittis nunc, vel dapibus \"},{\"attributes\":{\"link\":\"https:\\/\\/api.job-kiwi.com\\/v1\"},\"insert\":\"sapien\"},{\"insert\":\" hendrerit vel. Suspendisse tempus iaculis felis, non vestibulum diam pretium id. Sed auctor arcu dolor, sit amet consectetur urna tincidunt ac. Cras velit neque, tincidunt tincidunt cursus sollicitudin, pellentesque in tellus. \\n\\nSuspendisse et orci sagittis, dictum libero sagittis, sodales arcu. In maximus nibh eu faucibus eleifend. Vestibulum pretium sapien non porttitor feugiat.\"},{\"attributes\":{\"code-block\":true},\"insert\":\"\\n\"},{\"insert\":\"\\nMauris posuere, erat at sodales bibendum, risus ligula ullamcorper lectus, dictum vehicula magna libero et tortor. Praesent quis porta tortor. Donec luctus, libero eget hendrerit porttitor, dolor quam semper augue, id faucibus nibh sapien sit amet nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed quis dapibus diam, viverra facilisis lorem. \\nMauris vel eros dignissim, varius metus tincidunt, pharetra dui. \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Mauris vehicula, ligula eget imperdiet ultricies, metus massa accumsan purus, a faucibus tellus quam pellentesque arcu. \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Vestibulum quis consectetur ipsum, vitae molestie lorem. Integer a sem venenatis, fermentum purus tincidunt, rhoncus lacus. \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Integer in dapibus ipsum.\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\nEtiam vel vestibulum felis. Nulla ut venenatis dolor. Integer fermentum imperdiet risus id ullamcorper. Vivamus sodales facilisis lobortis. Nunc accumsan purus nec nibh feugiat, vel porta urna ultricies. Morbi id laoreet arcu, quis scelerisque libero. \"},{\"attributes\":{\"blockquote\":true},\"insert\":\"\\n\"},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"Maecenas eu sollicitudin lacus, at rutrum metus. Duis ullamcorper, est quis pellentesque ultrices, quam nisi suscipit massa, eu congue ipsum massa nec justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\"},{\"insert\":\"\\n\\nPellentesque fermentum arcu et nisl hendrerit, eget interdum tellus mollis. Nam fermentum, orci a lobortis elementum, tortor sem mollis lorem, in tristique ipsum mauris at diam. Sed varius, enim ac tristique auctor, mi metus tempus quam, vitae auctor lacus velit vitae enim. Aliquam porta tellus eu mauris cursus, at dapibus ante posuere. Integer porttitor risus eget volutpat imperdiet. Nunc porta et dolor eget laoreet. Mauris nibh lectus, porttitor a turpis vel, ultrices vulputate arcu. Duis ut felis et elit bibendum efficitur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur euismod, nisi vel ornare dictum, arcu odio consectetur libero, in viverra ex urna vestibulum orci. Maecenas vitae semper magna. Vivamus vulputate tincidunt faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quam purus, ornare quis dignissim vel, hendrerit sit amet ante.\\n\"}]}', 145, 0, '[1, 847]', '[]'),
(6, '2020-10-10', 24, NULL, 'Testeur API Rest', 1, 'Nice, France', 'CDD', '[\"PHP\", \"SQL\"]', '0€', '(Alexis)', '{\"ops\":[{\"attributes\":{\"bold\":true},\"insert\":\"Lorem ipsum dolor sit amet, c\"},{\"insert\":\"\\n\\nonsectetur adipiscing elit. Praesent tristique sagittis nunc, vel dapibus \"},{\"attributes\":{\"link\":\"https://api.job-kiwi.com/v1\"},\"insert\":\"sapien\"},{\"insert\":\" hendrerit vel. Suspendisse tempus iaculis felis, non vestibulum diam pretium id. Sed auctor arcu dolor, sit amet consectetur urna tincidunt ac. Cras velit neque, tincidunt tincidunt cursus sollicitudin, pellentesque in tellus. \\n\\nSuspendisse et orci sagittis, dictum libero sagittis, sodales arcu. In maximus nibh eu faucibus eleifend. Vestibulum pretium sapien non porttitor feugiat.\"},{\"attributes\":{\"code-block\":true},\"insert\":\"\\n\"},{\"insert\":\"\\nMauris posuere, erat at sodales bibendum, risus ligula ullamcorper lectus, dictum vehicula magna libero et tortor. Praesent quis porta tortor. Donec luctus, libero eget hendrerit porttitor, dolor quam semper augue, id faucibus nibh sapien sit amet nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed quis dapibus diam, viverra facilisis lorem. \\nMauris vel eros dignissim, varius metus tincidunt, pharetra dui. \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Mauris vehicula, ligula eget imperdiet ultricies, metus massa accumsan purus, a faucibus tellus quam pellentesque arcu. \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Vestibulum quis consectetur ipsum, vitae molestie lorem. Integer a sem venenatis, fermentum purus tincidunt, rhoncus lacus. \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Integer in dapibus ipsum.\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\nEtiam vel vestibulum felis. Nulla ut venenatis dolor. Integer fermentum imperdiet risus id ullamcorper. Vivamus sodales facilisis lobortis. Nunc accumsan purus nec nibh feugiat, vel porta urna ultricies. Morbi id laoreet arcu, quis scelerisque libero. \"},{\"attributes\":{\"blockquote\":true},\"insert\":\"\\n\"},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"Maecenas eu sollicitudin lacus, at rutrum metus. Duis ullamcorper, est quis pellentesque ultrices, quam nisi suscipit massa, eu congue ipsum massa nec justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\"},{\"insert\":\"\\n\\nPellentesque fermentum arcu et nisl hendrerit, eget interdum tellus mollis. Nam fermentum, orci a lobortis elementum, tortor sem mollis lorem, in tristique ipsum mauris at diam. Sed varius, enim ac tristique auctor, mi metus tempus quam, vitae auctor lacus velit vitae enim. Aliquam porta tellus eu mauris cursus, at dapibus ante posuere. Integer porttitor risus eget volutpat imperdiet. Nunc porta et dolor eget laoreet. Mauris nibh lectus, porttitor a turpis vel, ultrices vulputate arcu. Duis ut felis et elit bibendum efficitur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur euismod, nisi vel ornare dictum, arcu odio consectetur libero, in viverra ex urna vestibulum orci. Maecenas vitae semper magna. Vivamus vulputate tincidunt faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quam purus, ornare quis dignissim vel, hendrerit sit amet ante.\\n\"}]}', 0, 0, '[\"\"]', '[\"\"]'),
(9, '2020-10-10', 24, NULL, 'Testeur API Rest', 1, 'Nice, France', 'CDD', '[\"PHP\", \"SQL\"]', '0€', '(Alexis)', '{\"ops\":[{\"attributes\":{\"bold\":true},\"insert\":\"Lorem ipsum dolor sit amet, c\"},{\"insert\":\"nnonsectetur adipiscing elit. Praesent tristique sagittis nunc, vel dapibus \"},{\"attributes\":{\"link\":\"https:\\/\\/api.job-kiwi.com\\/v1\"},\"insert\":\"sapien\"},{\"insert\":\" hendrerit vel. Suspendisse tempus iaculis felis, non vestibulum diam pretium id. Sed auctor arcu dolor, sit amet consectetur urna tincidunt ac. Cras velit neque, tincidunt tincidunt cursus sollicitudin, pellentesque in tellus. nnSuspendisse et orci sagittis, dictum libero sagittis, sodales arcu. In maximus nibh eu faucibus eleifend. Vestibulum pretium sapien non porttitor feugiat.\"},{\"attributes\":{\"code-block\":true},\"insert\":\"n\"},{\"insert\":\"nMauris posuere, erat at sodales bibendum, risus ligula ullamcorper lectus, dictum vehicula magna libero et tortor. Praesent quis porta tortor. Donec luctus, libero eget hendrerit porttitor, dolor quam semper augue, id faucibus nibh sapien sit amet nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed quis dapibus diam, viverra facilisis lorem. nMauris vel eros dignissim, varius metus tincidunt, pharetra dui. \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"n\"},{\"insert\":\"Mauris vehicula, ligula eget imperdiet ultricies, metus massa accumsan purus, a faucibus tellus quam pellentesque arcu. \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"n\"},{\"insert\":\"Vestibulum quis consectetur ipsum, vitae molestie lorem. Integer a sem venenatis, fermentum purus tincidunt, rhoncus lacus. \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"n\"},{\"insert\":\"Integer in dapibus ipsum.\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"n\"},{\"insert\":\"nEtiam vel vestibulum felis. Nulla ut venenatis dolor. Integer fermentum imperdiet risus id ullamcorper. Vivamus sodales facilisis lobortis. Nunc accumsan purus nec nibh feugiat, vel porta urna ultricies. Morbi id laoreet arcu, quis scelerisque libero. \"},{\"attributes\":{\"blockquote\":true},\"insert\":\"n\"},{\"insert\":\"n\"},{\"attributes\":{\"bold\":true},\"insert\":\"Maecenas eu sollicitudin lacus, at rutrum metus. Duis ullamcorper, est quis pellentesque ultrices, quam nisi suscipit massa, eu congue ipsum massa nec justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\"},{\"insert\":\"nnPellentesque fermentum arcu et nisl hendrerit, eget interdum tellus mollis. Nam fermentum, orci a lobortis elementum, tortor sem mollis lorem, in tristique ipsum mauris at diam. Sed varius, enim ac tristique auctor, mi metus tempus quam, vitae auctor lacus velit vitae enim. Aliquam porta tellus eu mauris cursus, at dapibus ante posuere. Integer porttitor risus eget volutpat imperdiet. Nunc porta et dolor eget laoreet. Mauris nibh lectus, porttitor a turpis vel, ultrices vulputate arcu. Duis ut felis et elit bibendum efficitur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur euismod, nisi vel ornare dictum, arcu odio consectetur libero, in viverra ex urna vestibulum orci. Maecenas vitae semper magna. Vivamus vulputate tincidunt faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quam purus, ornare quis dignissim vel, hendrerit sit amet ante.n\"}]}', 2, 0, '[189]', '[]'),
(10, '2020-10-10', 24, NULL, 'Testeur API Rest', 1, 'Nice, France', 'CDD', '[\"PHP\", \"SQL\"]', '0€', '(Alexis)', 'No full ad', 0, 0, '[\"\"]', '[\"\"]'),
(11, '2020-10-10', 24, NULL, 'Testeur API Rest', 1, 'Nice, France', 'CDD', '[\"PHP\", \"SQL\"]', '0€', '(Alexis)', 'No full ad', 0, 0, '[\"\"]', '[\"\"]'),
(12, '2020-10-10', 24, NULL, 'Testeur API Rest', 1, 'Nice, France', 'CDD', '[\"PHP\", \"SQL\"]', '0€', '(Alexis)', 'No full ad', 0, 0, '[\"\"]', '[\"\"]'),
(13, '2020-10-10', 24, NULL, 'Testeur API Rest', 1, 'Nice, France', 'CDD', '[\"PHP\", \"SQL\"]', '0€', '(Alexis)', 'No full ad', 0, 0, '[\"\"]', '[\"\"]'),
(14, '2020-10-10', 24, NULL, 'Testeur API Rest', 1, 'Nice, France', 'CDD', '[\"PHP\", \"SQL\"]', '0€', '(Alexis)', 'No full ad', 0, 0, '[\"\"]', '[\"\"]'),
(15, '2020-10-10', 24, NULL, 'Testeur API Rest', 1, 'Nice, France', 'CDD', '[\"PHP\", \"SQL\"]', '0€', '(Alexis)', 'No full ad', 2, 0, '[]', '[]'),
(16, '2020-10-10', 24, NULL, 'Testeur API Rest', 1, 'Nice, France', 'CDD', '[\"PHP\", \"SQL\"]', '0€', '(Alexis)', 'No full ad', 0, 0, '[\"\"]', '[\"\"]'),
(17, '2020-10-10', 284, NULL, 'Développeur Front-End Angular', 0, 'Nice, France', 'Alternance', '[\"Angular\", \"Bootstrap\"]', '25k€ - 30k€', 'PREVIEW', 'FULL', 0, 0, '[\"\"]', '[\"\"]'),
(18, '2020-10-10', 284, NULL, 'Développeur Front-End Angular', 0, 'Nice, France', 'Alternance', '[\"Angular\", \"Bootstrap\"]', '25k€ - 30k€', 'PREVIEW', 'FULL', 0, 0, '[\"\"]', '[\"\"]'),
(19, '2020-10-10', 284, NULL, 'Développeur Front-End Angular', 0, 'Nice, France', 'Alternance', '[\"Angular\", \"Bootstrap\"]', '25k€ - 30k€', 'PREVIEW', 'FULL', 1, 0, '[]', '[]'),
(20, '2020-10-10', 284, NULL, 'Développeur Front-End Angular', 0, 'Nice, France', 'Alternance', '[\"Angular\", \"Bootstrap\"]', '25k€ - 30k€', 'PREVIEW', 'FULL', 16, 0, '[]', '[]'),
(21, '2020-10-10', 284, NULL, 'Développeur Front-End Angular', 0, 'Nice, France', 'Alternance', '[\"Angular\", \"Bootstrap\"]', '25k€ - 30k€', 'PREVIEW', 'FULL', 0, 0, '[\"\"]', '[\"\"]'),
(22, '2020-10-10', 284, NULL, 'Développeur Front-End Angular', 0, 'Nice, France', 'Alternance', '[\"Angular\", \"Bootstrap\"]', '25k€ - 30k€', 'PREVIEW', 'FULL', 0, 0, '[\"\"]', '[\"\"]'),
(23, '2020-10-10', 284, NULL, 'Développeur Front-End Angular', 0, 'Nice, France', 'Alternance', '[\"Angular\", \"Bootstrap\"]', '25k€ - 30k€', 'PREVIEW', 'FULL', 0, 0, '[\"\"]', '[\"\"]'),
(24, '2020-10-10', 284, NULL, 'Développeur Front-End Angular', 0, 'Nice, France', 'Alternance', '[\"Angular\", \"Bootstrap\"]', '25k€ - 30k€', 'PREVIEW', 'FULL', 0, 0, '[\"\"]', '[\"\"]'),
(25, '2020-10-10', 284, NULL, 'Développeur Front-End Angular', 0, 'Nice, France', 'Alternance', '[\"Angular\", \"Bootstrap\"]', '25k€ - 30k€', 'PREVIEW', 'FULL', 0, 0, '[\"\"]', '[\"\"]'),
(26, '2020-10-10', 284, NULL, 'Développeur Front-End Angular', 0, 'Nice, France', 'Alternance', '[\"Angular\", \"Bootstrap\"]', '25k€ - 30k€', 'PREVIEW', 'FULL', 0, 0, '[\"\"]', '[\"\"]');

-- --------------------------------------------------------

--
-- Structure de la table `USERS`
--

CREATE TABLE `USERS` (
  `ID` int(11) NOT NULL,
  `LEVEL` smallint(1) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `SURNAME` varchar(100) NOT NULL,
  `MAIL` varchar(100) NOT NULL,
  `PASSWORD` varchar(1000) NOT NULL,
  `INTRO` varchar(300) NOT NULL,
  `NOTIFS` json NOT NULL,
  `CONVS` json NOT NULL,
  `ADS` json NOT NULL,
  `COMPANY` int(11) DEFAULT NULL,
  `FILES` json NOT NULL,
  `VERIFIED` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `USERS`
--

INSERT INTO `USERS` (`ID`, `LEVEL`, `NAME`, `SURNAME`, `MAIL`, `PASSWORD`, `INTRO`, `NOTIFS`, `CONVS`, `ADS`, `COMPANY`, `FILES`, `VERIFIED`) VALUES
(1, 3, 'Nuiro', 'Emmanuel', 'nuiro.emmanuel@orange.fr', 'EN051100', '', '[]', '[]', '[]', NULL, '[]', 0),
(2, 3, 'Nuiro', 'Emmanuel', 'nuiro.emmanuel@orange.fr', 'EN051100', '', '[]', '[]', '[]', NULL, '[]', 123456),
(3, 0, 'becu', 'charles', 'charles.becu@epitech.eu', 'cBecu@adm1n', 'No Intro', '[]', '[]', '[]', 25, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 94243),
(4, 0, 'becu', 'charles', 'charles.becu@epitech.eu', 'cBecu@adm1n', '', '[]', '[]', '[]', 25, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 411367),
(5, 0, 'becu', 'charles', 'charles.becu@epitech.eu', 'cBecu@adm1n', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 331689),
(6, 0, 'becu', 'charles', 'charles.becu@epitech.eu', 'cBecu@adm1n', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 411447),
(7, 0, 'becu', 'charles', 'emmanuel.nuiro@epitech.eu', 'cBecu@adm1n', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 744889),
(8, 0, 'Becu', 'Charles', 'emmanuel.nuiro@epitech.eu', 'cBecu@adm1n', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 701611),
(9, 0, 'Becu', 'Charles', 'emmanuel.nuiro@epitech.eu', 'cBecu@adm1n', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 326040),
(10, 0, 'Becu', 'Charles', 'emmanuel.nuiro@epitech.eu', 'cBecu@adm1n', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 0),
(11, 0, 'Nuiro', 'Emmanuel', 'nuiro.emmanuel@orange.fr', 'En0511@00', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 0),
(12, 0, 'Nu', 'Em', 'emmanuel@nuiro.me', 'En0511@00', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 617898),
(13, 0, 'Nu', 'Jhv', 'nuiro.emmanuel@orange.fr', 'En0511@00', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 648172),
(14, 0, 'LL', 'Nu', 'emmanuel@nuiro.me', 'En0511@00', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 464282),
(15, 0, 'Lol', 'Oh', 'nuiro.emmanuel@orange.fr', 'En0511@00', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 168131),
(16, 0, 'Lol', 'Oihi', 'nuiro.emmanuel@orange.fr', 'En0511@00', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 829799),
(17, 0, 'Jh', 'Jb', 'emmanuel.nuiro@epitech.eu', 'En0511@00', '', '[]', '[]', '[]', NULL, '{\"profil\": \"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png\"}', 784364);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `COMPANY`
--
ALTER TABLE `COMPANY`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `JOBAD`
--
ALTER TABLE `JOBAD`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `COMPANY`
--
ALTER TABLE `COMPANY`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `JOBAD`
--
ALTER TABLE `JOBAD`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
