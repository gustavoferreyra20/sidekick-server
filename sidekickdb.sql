-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 30-10-2023 a las 00:06:16
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `id_application` int NOT NULL AUTO_INCREMENT,
  `id_post` int NOT NULL,
  `id_user` int NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id_application`),
  KEY `fk_user` (`id_user`),
  KEY `fk_post` (`id_post`)
) ENGINE=MyISAM AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `applications`
--

INSERT INTO `applications` (`id_application`, `id_post`, `id_user`, `status`) VALUES
(8, 23, 93, 'pending'),
(42, 22, 93, 'pending'),
(82, 18, 103, 'pending'),
(84, 23, 2, 'pending'),
(87, 34, 103, 'reviewed'),
(86, 21, 103, 'rejected');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact_inf`
--

DROP TABLE IF EXISTS `contact_inf`;
CREATE TABLE IF NOT EXISTS `contact_inf` (
  `id_contact_inf` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_contact_inf`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contact_inf`
--

INSERT INTO `contact_inf` (`id_contact_inf`, `name`, `img`) VALUES
(1, 'Discord', 'contact_inf/discord.png'),
(2, 'PSN', 'contact_inf/playstation.png'),
(3, 'Steam', 'contact_inf/steam.png'),
(4, 'Xbox', 'contact_inf/xbox.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `id_game` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `img` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_game`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`id_game`, `name`, `img`, `createdAt`, `updatedAt`) VALUES
(1, 'Fortnite', 'games/Fortnite.jpg', '2023-03-18 17:54:52', '0000-00-00 00:00:00'),
(2, 'CSGO', 'games/CSGO.jpg', '2023-03-18 17:54:53', '0000-00-00 00:00:00'),
(3, 'MultiVersus', 'games/MultiVersus.jpg', '2023-03-18 17:54:55', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modes`
--

DROP TABLE IF EXISTS `modes`;
CREATE TABLE IF NOT EXISTS `modes` (
  `id_mode` int NOT NULL AUTO_INCREMENT,
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
  `id_platform` int NOT NULL AUTO_INCREMENT,
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
  `id_game` int NOT NULL,
  `id_platform` int NOT NULL,
  KEY `fk_platform` (`id_platform`),
  KEY `fk_game` (`id_game`)
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
  `id_post` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_game` int NOT NULL,
  `id_platform` int NOT NULL,
  `id_mode` int NOT NULL,
  `requiredUsers` int NOT NULL,
  `actualUsers` int NOT NULL DEFAULT '1',
  `title` varchar(45) NOT NULL,
  `description` varchar(280) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_post`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id_post`, `id_user`, `id_game`, `id_platform`, `id_mode`, `requiredUsers`, `actualUsers`, `title`, `description`, `date`) VALUES
(22, 93, 1, 1, 1, 1, 0, 'awwafwaffw', '', '2023-01-10 17:58:21'),
(24, 93, 1, 1, 1, 1, 0, 'ttttttttttttttt', '', '2023-01-10 18:12:28'),
(18, 119, 2, 4, 2, 3, 0, 'test mode id', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2023-01-07 14:25:58'),
(34, 103, 1, 1, 1, 1, 1, 'test 2', '', '2023-10-21 20:39:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id_review` int NOT NULL AUTO_INCREMENT,
  `id_writerUser` int NOT NULL,
  `id_user` int NOT NULL,
  `id_post` int NOT NULL,
  `abilityScore` int NOT NULL DEFAULT '50',
  `karmaScore` int NOT NULL DEFAULT '50',
  `comment` varchar(280) DEFAULT NULL,
  PRIMARY KEY (`id_review`)
) ENGINE=MyISAM AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reviews`
--

INSERT INTO `reviews` (`id_review`, `id_writerUser`, `id_user`, `id_post`, `abilityScore`, `karmaScore`, `comment`) VALUES
(75, 103, 93, 21, 50, 50, 'testing pop up'),
(89, 93, 93, 10, 0, 0, 'aaaaaaaa'),
(90, 93, 93, 10, 0, 0, 'aaaaaaaa'),
(91, 93, 93, 10, 0, 0, 'aaaaaaaa'),
(92, 93, 103, 10, 0, 0, 'aaaaaaaa'),
(95, 103, 103, 34, 50, 50, 'addReward'),
(96, 103, 103, 34, 50, 50, 'addreward 2'),
(97, 103, 103, 34, 50, 50, 'ttttttt');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews_rewards`
--

DROP TABLE IF EXISTS `reviews_rewards`;
CREATE TABLE IF NOT EXISTS `reviews_rewards` (
  `id_review` int NOT NULL,
  `id_reward` int NOT NULL,
  KEY `fk_review` (`id_review`),
  KEY `fk_reward` (`id_reward`)
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
(63, 2),
(64, 1),
(65, 1),
(66, 1),
(67, 1),
(68, 1),
(69, 2),
(72, 3),
(73, 3),
(75, 3),
(76, 3),
(81, 3),
(94, 1),
(94, 2),
(107, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rewards`
--

DROP TABLE IF EXISTS `rewards`;
CREATE TABLE IF NOT EXISTS `rewards` (
  `id_reward` int NOT NULL AUTO_INCREMENT,
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
(1, 'gold', 'Medalla de oro', '600.0000', 'rewards/gold.png'),
(2, 'silver', 'Medalla de plata', '400.0000', 'rewards/silver.png'),
(3, 'bronze', 'Medalla de bronce', '200.0000', 'rewards/bronze.png'),
(4, 'sports', 'Medalla', '100.0000', 'rewards/sports.png'),
(5, 'military', 'Medalla de honor', '300.0000', 'rewards/military.png'),
(6, 'trophy', 'Copa', '1000.0000', 'rewards/trophy.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `description` varchar(280) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=209 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name`, `email`, `password`, `description`, `img`) VALUES
(93, 'luke', 'luke@gmail.com', '$2a$10$wOCtMtYGPg4/n6Np1YCSTutqTyttsrNWzQoM2y89L58gkRKltu3bO', NULL, 'profiles/default.png'),
(103, 'david', 'david@gmail.com', '$2a$10$tGBBfdEVwA947WjVWDDhCejs1eBilRQhBZI7L15MCBCptfu3OVlL6', 'description', 'profiles/file-1679331073218.png'),
(182, 'leoDV', 'leoDV@gmail.com', '$2a$10$L4u.jbWS/ZGjxYQq0lvsTeXMJHoBMV/4WerH5ax.eTiCAPShyikYa', NULL, 'profiles/file-1682195643474.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_contact_inf`
--

DROP TABLE IF EXISTS `users_contact_inf`;
CREATE TABLE IF NOT EXISTS `users_contact_inf` (
  `id_user` int NOT NULL,
  `id_contact_inf` int NOT NULL,
  `nickname` varchar(45) NOT NULL,
  KEY `fk_user` (`id_user`),
  KEY `fk_contact_inf` (`id_contact_inf`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users_contact_inf`
--

INSERT INTO `users_contact_inf` (`id_user`, `id_contact_inf`, `nickname`) VALUES
(175, 3, 'awgwagawgawg'),
(175, 1, 'awfwrr'),
(176, 1, 'awfwafwaf'),
(176, 3, 'awfawwaf'),
(177, 2, 'awfwafafawf'),
(177, 3, 'qqqqqqqqqqqqqqq'),
(178, 1, 'sonicD'),
(178, 2, 'sonicPSN'),
(179, 1, 'default@gmail.com'),
(180, 1, 'default2@gmail.com'),
(181, 1, 'default3@gmail.com'),
(182, 1, 'leo'),
(189, 1, 'Bbjjk'),
(189, 3, 'Gvjkkkk'),
(190, 1, 'Bbjjk'),
(190, 3, 'Gvjkkkk'),
(191, 1, 'Aaaaaaaa'),
(191, 2, 'Bbbbbb'),
(192, 1, 'Vvbbb'),
(193, 1, 'Gghjj'),
(194, 1, 'Ghhjj'),
(195, 1, 'Fffff'),
(196, 1, 'Hjjjkj'),
(197, 1, 'Gggf'),
(198, 1, 'awfwafwaf'),
(199, 1, 'awfwafwaf'),
(200, 1, 'drhrdhrdhrdh'),
(201, 1, 'Bfbbdbd'),
(202, 1, 'Uuuuuuuuuuu'),
(203, 1, 'Gggggggg'),
(204, 1, '0000000000'),
(103, 1, 'test'),
(103, 3, 'aaaaaaaaaaaaaa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_rewards`
--

DROP TABLE IF EXISTS `users_rewards`;
CREATE TABLE IF NOT EXISTS `users_rewards` (
  `id_user` int NOT NULL,
  `id_reward` int NOT NULL,
  `amount` int DEFAULT NULL,
  KEY `fk_user` (`id_user`),
  KEY `fk_reward` (`id_reward`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users_rewards`
--

INSERT INTO `users_rewards` (`id_user`, `id_reward`, `amount`) VALUES
(103, 1, 2),
(103, 2, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
