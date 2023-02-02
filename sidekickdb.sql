-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 02-02-2023 a las 03:04:04
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sidekickdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `applications`
--

DROP TABLE IF EXISTS `applications`;
CREATE TABLE IF NOT EXISTS `applications` (
  `id_application` int(11) NOT NULL AUTO_INCREMENT,
  `id_post` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id_application`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `applications`
--

INSERT INTO `applications` (`id_application`, `id_post`, `id_user`, `status`) VALUES
(4, 21, 32, 'accepted'),
(9, 21, 93, 'accepted'),
(8, 20, 93, 'accepted'),
(40, 21, 103, 'accepted'),
(42, 22, 64, 'accepted');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `id_game` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `img` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_game`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`id_game`, `name`, `img`, `createdAt`, `updatedAt`) VALUES
(1, 'Fortnite', '../img/games/Fortnite.jpg', '2022-09-18 01:49:18', '0000-00-00 00:00:00'),
(2, 'CSGO', '../img/games/CSGO.jpg', '2022-09-18 01:49:18', '0000-00-00 00:00:00'),
(3, 'MultiVersus', '../img/games/MultiVersus.jpg', '2022-09-18 01:49:18', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genres`
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE IF NOT EXISTS `genres` (
  `id_genre` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_genre`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genres_games`
--

DROP TABLE IF EXISTS `genres_games`;
CREATE TABLE IF NOT EXISTS `genres_games` (
  `id_game` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genres_posts`
--

DROP TABLE IF EXISTS `genres_posts`;
CREATE TABLE IF NOT EXISTS `genres_posts` (
  `id_post` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modes`
--

DROP TABLE IF EXISTS `modes`;
CREATE TABLE IF NOT EXISTS `modes` (
  `id_mode` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_mode`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `modes`
--

INSERT INTO `modes` (`id_mode`, `name`) VALUES
(1, 'casual'),
(2, 'competitivo'),
(4, 'cazador de trofeos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platforms`
--

DROP TABLE IF EXISTS `platforms`;
CREATE TABLE IF NOT EXISTS `platforms` (
  `id_platform` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_platform`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `platforms`
--

INSERT INTO `platforms` (`id_platform`, `name`, `img`) VALUES
(1, 'PlayStation 4', ''),
(2, 'PlayStation 5', ''),
(3, 'XBOX', ''),
(4, 'PC', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platforms_games`
--

DROP TABLE IF EXISTS `platforms_games`;
CREATE TABLE IF NOT EXISTS `platforms_games` (
  `id_game` int(11) NOT NULL,
  `id_platform` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `platforms_games`
--

INSERT INTO `platforms_games` (`id_game`, `id_platform`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id_post` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_game` int(11) NOT NULL,
  `id_platform` int(11) NOT NULL,
  `id_mode` int(11) NOT NULL,
  `requiredUsers` int(11) NOT NULL,
  `actualUsers` int(11) NOT NULL DEFAULT 1,
  `title` varchar(45) NOT NULL,
  `description` varchar(280) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_post`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id_post`, `id_user`, `id_game`, `id_platform`, `id_mode`, `requiredUsers`, `actualUsers`, `title`, `description`, `date`) VALUES
(22, 93, 1, 1, 1, 1, 0, 'awwafwaffw', '', '2023-01-10 17:58:21'),
(23, 93, 2, 4, 4, 2, 0, 'test', 'seagfwaegawgwgg', '2023-01-10 17:58:56'),
(24, 93, 1, 1, 1, 1, 0, 'ttttttttttttttt', '', '2023-01-10 18:12:28'),
(21, 103, 3, 1, 2, 2, 0, 'test review stats', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2023-01-08 18:54:00'),
(20, 103, 2, 4, 1, 2, 0, 'test', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2023-01-07 18:48:08'),
(18, 119, 2, 4, 2, 3, 0, 'test mode id', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2023-01-07 14:25:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id_review` int(11) NOT NULL AUTO_INCREMENT,
  `id_writerUser` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_post` int(11) NOT NULL,
  `abilityScore` int(11) NOT NULL,
  `karmaScore` int(11) NOT NULL,
  `comment` varchar(280) DEFAULT NULL,
  PRIMARY KEY (`id_review`)
) ENGINE=MyISAM AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reviews`
--

INSERT INTO `reviews` (`id_review`, `id_writerUser`, `id_user`, `id_post`, `abilityScore`, `karmaScore`, `comment`) VALUES
(27, 103, 103, 21, 50, 50, NULL),
(26, 103, 103, 21, 74, 73, NULL),
(25, 103, 32, 21, 85, 25, NULL),
(24, 103, 93, 21, 50, 84, NULL),
(23, 103, 103, 21, 50, 50, NULL),
(22, 103, 32, 21, 50, 50, NULL),
(21, 103, 93, 21, 50, 50, NULL),
(20, 103, 103, 21, 50, 50, NULL),
(19, 103, 32, 21, 50, 50, NULL),
(18, 103, 93, 21, 50, 50, NULL),
(17, 103, 103, 21, 50, 50, NULL),
(16, 103, 103, 21, 50, 50, NULL),
(15, 103, 103, 21, 50, 50, NULL),
(28, 103, 32, 21, 50, 50, NULL),
(29, 103, 93, 20, 50, 50, NULL),
(30, 103, 32, 21, 50, 78, NULL),
(31, 103, 32, 21, 50, 19, NULL),
(32, 103, 32, 21, 50, 50, NULL),
(33, 103, 32, 21, 50, 50, NULL),
(34, 103, 32, 21, 50, 50, NULL),
(35, 103, 32, 21, 50, 50, NULL),
(36, 103, 32, 21, 50, 50, NULL),
(37, 103, 32, 21, 50, 50, NULL),
(38, 103, 32, 21, 50, 50, NULL),
(39, 103, 32, 21, 50, 50, NULL),
(40, 103, 32, 21, 50, 50, NULL),
(41, 103, 32, 21, 50, 50, NULL),
(42, 103, 32, 21, 76, 50, NULL),
(43, 103, 32, 21, 50, 50, NULL),
(44, 103, 32, 21, 50, 50, NULL),
(45, 103, 32, 21, 50, 50, NULL),
(46, 103, 93, 21, 50, 50, NULL),
(47, 103, 93, 21, 50, 50, NULL),
(48, 103, 32, 21, 50, 50, NULL),
(49, 103, 32, 21, 50, 50, NULL),
(50, 103, 32, 21, 50, 50, NULL),
(51, 103, 32, 21, 50, 50, NULL),
(52, 103, 32, 21, 50, 50, NULL),
(53, 103, 32, 21, 50, 50, NULL),
(54, 103, 32, 21, 50, 50, NULL),
(55, 103, 32, 21, 50, 50, NULL),
(56, 103, 32, 21, 50, 50, NULL),
(57, 103, 32, 21, 50, 50, NULL),
(58, 103, 32, 21, 50, 50, NULL),
(59, 103, 32, 21, 50, 50, NULL),
(60, 103, 32, 21, 50, 50, NULL),
(61, 103, 32, 21, 50, 50, NULL),
(62, 103, 32, 21, 50, 50, NULL),
(63, 103, 32, 21, 50, 50, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews_rewards`
--

DROP TABLE IF EXISTS `reviews_rewards`;
CREATE TABLE IF NOT EXISTS `reviews_rewards` (
  `id_review` int(11) NOT NULL,
  `id_reward` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reviews_rewards`
--

INSERT INTO `reviews_rewards` (`id_review`, `id_reward`) VALUES
(53, 1),
(54, 1),
(55, 1),
(56, 1),
(61, 2),
(62, 2),
(63, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rewards`
--

DROP TABLE IF EXISTS `rewards`;
CREATE TABLE IF NOT EXISTS `rewards` (
  `id_reward` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(280) NOT NULL,
  `price` decimal(19,4) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_reward`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rewards`
--

INSERT INTO `rewards` (`id_reward`, `name`, `description`, `price`, `img`) VALUES
(1, 'gold', 'Medalla de oro', '600.0000', '../img/rewards/gold.png'),
(2, 'silver', 'Medalla de plata', '400.0000', '../img/rewards/silver.png'),
(3, 'bronze', 'Medalla de bronce', '200.0000', '../img/rewards/bronze.png'),
(4, 'sports', 'Medalla', '100.0000', '../img/rewards/sports.png'),
(5, 'military', 'Medalla de honor', '300.0000', '../img/rewards/military.png'),
(6, 'trophy', 'Copa', '1000.0000', '../img/rewards/trophy.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE IF NOT EXISTS `tokens` (
  `session` varchar(300) NOT NULL,
  `token` varchar(300) NOT NULL,
  `expire` date NOT NULL,
  PRIMARY KEY (`session`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tokens`
--

INSERT INTO `tokens` (`session`, `token`, `expire`) VALUES
('1817d3bbe280a5b5b2185f3f1f2aae28a0faf4d4', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAzLCJpYXQiOjE2NzQ0ODk0NjF9.fxux1OPfVMS-0wR9CsGwiEBvae4oAWNmjvaHg8HbgXE', '2023-04-23'),
('a621895d63fd5588e4338a7f7a7b383251ecff47', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAzLCJpYXQiOjE2NzM0NTQ3NTV9.1CswVnuf9NOec9uKbzgToUo4DOHqrk7RuyirCWSMtS4', '2023-04-11'),
('0ca123177a1d350ed7f26501951862f11ac12983', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAzLCJpYXQiOjE2NzMzNzQ2NjN9.lup2tmP6Pd_Oq82YMsE2XzwZiprUuBMMiaeQKx6lHh0', '2023-04-10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `description` varchar(280) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=MyISAM AUTO_INCREMENT=125 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name`, `email`, `password`, `description`, `img`) VALUES
(3, 'awrwarwar', 'awrawrwar', 'awrawrwarwar', NULL, NULL),
(5, 'xd', '', 'awdwadwadwad', 'ciruja', 'new xd'),
(74, 'mariano', 'mariano@gmail.com', '$2a$10$rHI2bW0GyFZZf1K8MepjuOttVaQOkHAVuJiXCE2cox5VQ5WY2ZK9u', NULL, NULL),
(53, 'goofy', 'goofy@gmail.com', '$2a$10$z7I.x8HUcfmznZJtJcoQbez7qpvwqA8NVTCcmIVKcM7NrzwTuz7rW', NULL, NULL),
(54, 'joe', 'joe@gmail.com', '$2a$10$zpz0k2n1kMoWzt06tt8Xt.cL7pLW/brgDjdqajAduBnsOKRfD.CyW', NULL, NULL),
(52, 'obione', 'obione@gmail.com', '$2a$10$/kF6cwowJqR8Zbs7yFVqFO4t2EdVKwZVxeavZpss6zAvsS.kYeX66', NULL, NULL),
(50, 'star', 'star@gmail.com', '$2a$10$tzysy0M.FebJDhtl0UuG3eYeQGsSKnJfwmaizL5CNXISTc2eQHptC', NULL, NULL),
(51, 'quigon', 'quigon@gmail.com', '$2a$10$7LSngXMkjBuGm5xHwpAUlu3SUyzVFe5iXfQ.ngAxEYIfEQ10Ypvba', NULL, NULL),
(40, 'tito', 'tito@gmail.com', '$2a$10$zGUPS3m3ngQPKQiFw0STqunBuLtdsgWFP8Sl6CBrcKfsHQN.t4jCi', NULL, NULL),
(39, 'miguel', 'miguel@gmail.com', '$2a$10$Q1Wysruj8RQ2TJE23EJb8OVk4NJSfPOqfTup4b6L7gxsKtvBOFTQK', NULL, NULL),
(38, 'pedro', 'pedro@gmail.com', '$2a$10$Yld1b6RXLS3Yq.fmikfDzu95hIgy33gACBT2yJJILV/Aa9.OcPs/e', NULL, NULL),
(37, 'tim', 'tim@gmail.com', '$2a$10$QdbEsNJQF9AUiGuo9zO7DusD7FfiizKvt/v.ofPK49WGB361uTwoG', NULL, NULL),
(36, 'anon', 'anon@gmail.com', '$2a$10$lp.5kpOIGM5Ulo4rJmnLdezCUISD4.YDXj5VHKUr1c7Y.oYlhQYkG', NULL, NULL),
(35, 'anon', 'anon@gmail.com', '$2a$10$R339dLzdIRwPwDVl3kC1Te7sEAFjTIcfeniXH1lsFBVfFSIPRvJKe', NULL, NULL),
(34, 'juan', 'juan@gmail.com', '$2a$10$cg98uRU.PcEBCUoWPvAlFOLEtefM6eDjXtPOFPyJFlGaQzGZF2yUq', NULL, NULL),
(33, 'juan', 'juan@gmail.com', '$2a$10$8pVtOOx9oH04Td/bpGcal.FS/04EQPiRPcL8c.1niWEcBa/s1stMy', NULL, NULL),
(32, 'user4', 'user4@gmail.com', '$2b$10$nAtLEoennz72.vA9ABu6pezupWJyqFZEOqsdTYm.olaUI3MiXirXW', NULL, NULL),
(49, 'beto', 'beto@gmail.com', '$2a$10$TqtCxxvpI55OnJF4sKX/QeTX4eeAUMmfVGI5tDHqT8QcJNIF9jXv2', NULL, NULL),
(69, 'ryan', 'ryan@gmail.com', '$2a$10$b1lEqv8OzYRe2v5avV3CMO42HOZUKQYW0JcrD/mjzbZYEXtBbsIKa', NULL, NULL),
(68, 'andy', 'andy@waddwawd', '$2a$10$HOrhWWEuy2DPyidiWCSDquFq2sgRNX0.7I5UqvXwwXOw5bMmMGoG6', NULL, NULL),
(67, 'buzz', 'buzz@waddwawd', '$2a$10$mm.8BHQeTOqguxfFb5MBu.mY2JTnfnctQb1wUb14WQxJkNnsLi8cu', NULL, NULL),
(66, 'jijiji', 'juxd2@gmail.com', '$2a$10$uyXYtn0qRCv8TQACdT3nr.2DXGiMIuZ3TqnXe/iAAhBCFveU0pPle', NULL, NULL),
(59, 'ju6', 'ju@gmail.com', '$2a$10$0.Yh4NyxEaVp7PrPBPpYNexTQfBZO3mJoYEp6GHQMNu1SZlKBrExe', NULL, NULL),
(64, 'indio', 'indio@gmail.com', '$2a$10$/E5iLey0hv.NWIxAtBGsv.CsZ4T6eokN7/WARfsWlq5AkwtF7bPHK', NULL, NULL),
(65, 'adadawd', 'awdawd@waddwawd', '$2a$10$VB7MR8s1cge.P6APyDl1W.q9Iido8TqaDDRMHjWc8TzLshKMeQMY.', NULL, NULL),
(62, 'esfsefesf', 'jru@gmail.com', '$2a$10$3PoBfsepKlFRun77ViCXse7iVWuRnnGE4Y9WSgzrcXf.Zgcsrr5my', NULL, NULL),
(63, 'finally', 'juxd@gmail.com', '$2a$10$yvtBnAzFSKJF//BSOkaQd.FfZKnbUaOX4BGvc3z/93ynyv2VD0oq.', NULL, NULL),
(70, 'ryan2', 'ryan2@gmail.com', '$2a$10$I7hSQ/HlJ2.MgaPN7Ccx.eAqQzXRkFYhyCTigO.p5xnRSC9oNcziy', NULL, NULL),
(71, 'harry', 'harry@gmail.com', '$2a$10$N7m/36dQ0xP4SPTuOJct..dO9EirrEQvlyA8MbJr10WDhMa9jIK1a', NULL, NULL),
(72, 'walter', 'walter@gmail.com', '$2a$10$SrK/o2SqhSCNCfu7VeD45O4pWfgCBiyjqHL1QiVh7gzw6aox9aCmm', NULL, NULL),
(73, 'topa', 'topa@gmail.com', '$2a$10$Y7uNjZt.Waohle8zph6YJumrdAtoVwT8ARdgMQN.2ccoC5NoNsAZe', NULL, NULL),
(75, 'brad', 'brad@gmail.com', '$2a$10$/1HYP0a/1iOSQ3MeReA4J.Lrfs6XPbYLzbkvK6Etyll4kCy6py2A2', NULL, NULL),
(88, 'iiiiii', 'ae', '$2a$10$TNhq5harAb7Bsaiq45iGD.q3THjH5q9ODhXrkMhqY8HGRoY2MXx7W', 'iiiiii', 'ee'),
(90, 'undefined', 'joel@gmail.com', '$2a$10$o3xWibl.I6BO/f64M6P4ketSDPb.PI5rUxVt16DR7a9UvPlyxzSRm', NULL, NULL),
(91, 'undefined', 'guillo@gmail.com', '$2a$10$L2LPW5vzq/yZ5iXBFYu/jeMWAUVtImgJwS/hJGP3cVWMJVM9ADD4e', NULL, NULL),
(92, 'helado', 'helado@gmail.com', '$2a$10$HBshxrqOGucneuj1N/sK0eKRlG2Od4hBO94q7bI8Fzi0IjHCK5ivS', NULL, NULL),
(93, 'luke', 'luke@gmail.com', '$2a$10$wOCtMtYGPg4/n6Np1YCSTutqTyttsrNWzQoM2y89L58gkRKltu3bO', NULL, NULL),
(96, 'afwafwafawf', 'luke@gmail.com', '$2a$10$/VKBBGGpdkjIA3p2EVrGs.zyUKYjnmV8apXGY2keKlHK8jQZlOWka', NULL, NULL),
(95, 'luke2', 'luke2@gmail.com', '$2a$10$Kx4CrcQFvlsawOQxtvhW/enUZGXozEcTklI5Egpa16qGdpSkDqMy6', NULL, NULL),
(97, 'awfawfwafawf', 'luke@gmail.com', '$2a$10$jo6afh.s1E7nGUsjjcEzd.uWfjzc9JXP3VDDFex6x/dgRulBY96eq', NULL, NULL),
(98, 'luke3', 'luke3@gmail.com', '$2a$10$NZlkM7uTW2PQyVdnG/4r/eLjH8CSY5.V.OOfbKL9e0lcBSZwZYIUS', NULL, NULL),
(99, 'messi', 'messi@gmail.com', '$2a$10$/Er55uTq5P8b8AJY4m/TV.KePJS2e0xy2HgREDHrZVXoEOOu0DkEK', NULL, NULL),
(100, 'leo', 'leo@gmail.com', '$2a$10$.j0zNpfPfbtQpjn0DAyM3utYRkYkZ7zZDtLgPnImqL9DVx8CaenRq', NULL, NULL),
(104, 'morrisey', 'morrisey@gmail.com', '$2a$10$FgfBwj7tXQqOFxl.ih0oBe.yxrrkmdZzH.X5clJmbFaZhzdV.eAsK', NULL, NULL),
(102, 'goofy2', 'goofy@gmail.com', '$2a$10$6HY72BtVZiyNGQZaXlLtI.OwHaH3NNtG9zYuZLyFGn5Zb78F7aHO2', NULL, NULL),
(103, 'david', 'david@gmail.com', '$2a$10$tGBBfdEVwA947WjVWDDhCejs1eBilRQhBZI7L15MCBCptfu3OVlL6', 'description', NULL),
(107, 'text area', 'text@gmail.com', '$2a$10$AiQj8V7lyE2tOQxrZliMgupsIgardAr74MW/Pt08vCT6FClPEo4b2', 'testing text area', NULL),
(124, 'axi', 'axi@gmail.com', '$2a$10$FZinRDJOOTtFbhnzVqFj3.UvfzsmyPuZoisC92a8DHVF6L0rYPe1e', '', NULL),
(118, 'artyiom', 'artyiom@gmail.com', '$2a$10$gg0sNl0wPrABRU5SAgNcSecL75edLtzrHHp5M0ESxq9q0MxbPLYF.', '', 'uploads\\file-1665959320637.png'),
(119, 'test images2', 'images2@gmail.com', '$2a$10$d8oit8vIm3LjPrIp8savGu6dCYx/95kPZb9EZ8cCF09GTDxRhueo6', '', 'uploads\\file-1668613614142.png'),
(115, 'awfawf', 'awawf@waffw', '$2a$10$JCATRniA4xjPDLwY6HX4AOE.XcZYaEmHaB68fYJfaHHOEgFKfE7GW', '', '\\uploads\\file-1665795770383.png'),
(116, 'awfawff', 'fafwa@fafw', '$2a$10$SS3bht4mDKntJObdc4Al1uy1JtJuclAz.gZvZV2YEI8vewwKJ3gvK', 'afkjjhawf', '\\uploads\\file-1665795813643.png'),
(117, 'testing multer', 'multer@gmail.com', '$2a$10$fWlfboAnbNrRLkxB4kL2Y.viRf5jIqM7gvUWepnAjB9qb2n8yvqTm', '', 'uploads\\file-1665797001578.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_platforms`
--

DROP TABLE IF EXISTS `users_platforms`;
CREATE TABLE IF NOT EXISTS `users_platforms` (
  `id_user` int(11) NOT NULL,
  `id_platform` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_rewards`
--

DROP TABLE IF EXISTS `users_rewards`;
CREATE TABLE IF NOT EXISTS `users_rewards` (
  `id_user` int(11) NOT NULL,
  `id_reward` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users_rewards`
--

INSERT INTO `users_rewards` (`id_user`, `id_reward`, `amount`) VALUES
(103, 2, 0),
(103, 1, 5),
(103, 3, 5);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
