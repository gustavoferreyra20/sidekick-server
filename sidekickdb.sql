-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-09-2022 a las 23:40:10
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
-- Estructura de tabla para la tabla `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `id_game` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_game`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`id_game`, `name`, `img`) VALUES
(1, 'Fortnite', '../img/games/Fortnite.jpg'),
(2, 'CSGO', '../img/games/CSGO.jpg'),
(3, 'MultiVersus', '../img/games/MultiVersus.jpg');

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
-- Estructura de tabla para la tabla `medals`
--

DROP TABLE IF EXISTS `medals`;
CREATE TABLE IF NOT EXISTS `medals` (
  `id_medal` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(280) NOT NULL,
  `price` decimal(19,4) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_medal`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
(4, 'Steam', ''),
(5, 'Epic', '');

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
  `id_originalPoster` int(11) NOT NULL,
  `id_game` int(11) NOT NULL,
  `id_platform` int(11) NOT NULL,
  `requiredUsers` int(11) NOT NULL,
  `actualUsers` int(11) NOT NULL DEFAULT 1,
  `title` varchar(45) NOT NULL,
  `desciption` varchar(280) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_post`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id_post`, `id_originalPoster`, `id_game`, `id_platform`, `requiredUsers`, `actualUsers`, `title`, `desciption`, `date`) VALUES
(1, 66, 2, 4, 2, 1, 'example', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2022-08-11 03:00:00'),
(9, 75, 2, 4, 1, 1, 'testing get user', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2022-09-04 02:52:37'),
(8, 75, 1, 4, 1, 1, 'testing popup', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2022-08-27 23:15:44'),
(6, 66, 1, 1, 1, 1, 'testing get user', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2022-08-27 22:46:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id_review` int(11) NOT NULL AUTO_INCREMENT,
  `id_writerUser` int(11) NOT NULL,
  `id_reviewedUser` int(11) NOT NULL,
  `id_post` int(11) NOT NULL,
  `abilityScore` int(11) NOT NULL,
  `karmaScore` int(11) NOT NULL,
  `comment` varchar(280) NOT NULL,
  PRIMARY KEY (`id_review`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews_medals`
--

DROP TABLE IF EXISTS `reviews_medals`;
CREATE TABLE IF NOT EXISTS `reviews_medals` (
  `id_review` int(11) NOT NULL,
  `id_medal` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE IF NOT EXISTS `tokens` (
  `session` varchar(300) NOT NULL,
  `token` varchar(300) NOT NULL,
  `user` varchar(300) NOT NULL,
  `expire` date NOT NULL,
  PRIMARY KEY (`session`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tokens`
--

INSERT INTO `tokens` (`session`, `token`, `user`, `expire`) VALUES
('baf262b5b445d33a8bb1c97198495cb71f1fe476', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzUsImlhdCI6MTY2MTY0MjQ3NH0.rwoc5TDsHvtcaSScvcdTTcokzT9woMPIogquqqBxCKQ', 'c29873cd736dd5e02cb949b3fd478a6cd4aafc54', '2022-11-25');

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
) ENGINE=MyISAM AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name`, `email`, `password`, `description`, `img`) VALUES
(3, 'awrwarwar', 'awrawrwar', 'awrawrwarwar', NULL, NULL),
(5, 'xd', '', 'awdwadwadwad', 'ciruja', 'xd'),
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
(75, 'brad', 'brad@gmail.com', '$2a$10$/1HYP0a/1iOSQ3MeReA4J.Lrfs6XPbYLzbkvK6Etyll4kCy6py2A2', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_platforms`
--

DROP TABLE IF EXISTS `users_platforms`;
CREATE TABLE IF NOT EXISTS `users_platforms` (
  `id_user` int(11) NOT NULL,
  `id_platform` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
