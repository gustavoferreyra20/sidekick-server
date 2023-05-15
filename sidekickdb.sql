-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 15-05-2023 a las 18:55:02
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
) ENGINE=MyISAM AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `applications`
--

INSERT INTO `applications` (`id_application`, `id_post`, `id_user`, `status`) VALUES
(8, 20, 93, 'pending'),
(42, 22, 93, 'pending'),
(83, 21, 103, 'accepted'),
(82, 18, 103, 'pending');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact_inf`
--

DROP TABLE IF EXISTS `contact_inf`;
CREATE TABLE IF NOT EXISTS `contact_inf` (
  `id_contact_inf` int(11) NOT NULL AUTO_INCREMENT,
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
(1, 'Fortnite', 'games/Fortnite.jpg', '2023-03-18 17:54:52', '0000-00-00 00:00:00'),
(2, 'CSGO', 'games/CSGO.jpg', '2023-03-18 17:54:53', '0000-00-00 00:00:00'),
(3, 'MultiVersus', 'games/MultiVersus.jpg', '2023-03-18 17:54:55', '0000-00-00 00:00:00');

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
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id_post`, `id_user`, `id_game`, `id_platform`, `id_mode`, `requiredUsers`, `actualUsers`, `title`, `description`, `date`) VALUES
(22, 93, 1, 1, 1, 1, 0, 'awwafwaffw', '', '2023-01-10 17:58:21'),
(23, 93, 2, 4, 4, 2, 0, 'test', 'seagfwaegawgwgg', '2023-01-10 17:58:56'),
(24, 93, 1, 1, 1, 1, 0, 'ttttttttttttttt', '', '2023-01-10 18:12:28'),
(21, 103, 3, 1, 2, 2, 1, 'test review stats', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2023-01-08 18:54:00'),
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
  `abilityScore` int(11) NOT NULL DEFAULT 50,
  `karmaScore` int(11) NOT NULL DEFAULT 50,
  `comment` varchar(280) DEFAULT NULL,
  PRIMARY KEY (`id_review`)
) ENGINE=MyISAM AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;

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
(63, 103, 32, 21, 50, 50, NULL),
(64, 103, 32, 21, 50, 50, NULL),
(65, 103, 32, 21, 50, 50, NULL),
(66, 103, 32, 21, 50, 50, NULL),
(67, 103, 32, 21, 50, 50, NULL),
(68, 103, 32, 21, 50, 50, NULL),
(69, 103, 103, 21, 50, 50, NULL),
(70, 103, 103, 21, 50, 50, NULL),
(71, 103, 103, 21, 50, 50, NULL),
(72, 103, 75, 21, 76, 79, 'WDADWADWAD'),
(73, 103, 32, 21, 75, 13, 'awdwfaawfa'),
(74, 103, 93, 20, 74, 50, NULL),
(75, 103, 93, 21, 50, 50, 'testing pop up'),
(76, 103, 40, 21, 50, 50, '4wsegsgseg'),
(77, 103, 103, 21, 41, 81, NULL),
(78, 103, 32, 21, 32, 59, 'fsafasf'),
(79, 103, 93, 21, 50, 50, NULL),
(80, 103, 40, 21, 50, 50, 'aaaaaa'),
(81, 103, 93, 20, 50, 50, NULL),
(82, 103, 32, 21, 50, 50, NULL),
(83, 103, 93, 21, 50, 50, NULL),
(84, 103, 40, 21, 50, 50, NULL),
(85, 103, 75, 21, 50, 50, NULL),
(86, 103, 40, 21, 50, 50, 'hi tito');

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
(81, 3);

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
(1, 'gold', 'Medalla de oro', '600.0000', 'rewards/gold.png'),
(2, 'silver', 'Medalla de plata', '400.0000', 'rewards/silver.png'),
(3, 'bronze', 'Medalla de bronce', '200.0000', 'rewards/bronze.png'),
(4, 'sports', 'Medalla', '100.0000', 'rewards/sports.png'),
(5, 'military', 'Medalla de honor', '300.0000', 'rewards/military.png'),
(6, 'trophy', 'Copa', '1000.0000', 'rewards/trophy.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE IF NOT EXISTS `tokens` (
  `id_token` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `token` varchar(300) NOT NULL,
  `creation_date` date NOT NULL DEFAULT current_timestamp(),
  `expiration_date` date NOT NULL,
  `platform` varchar(45) NOT NULL,
  PRIMARY KEY (`id_token`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

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
) ENGINE=MyISAM AUTO_INCREMENT=205 DEFAULT CHARSET=latin1;

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
  `id_user` int(45) NOT NULL,
  `id_contact_inf` int(45) NOT NULL,
  `nickname` varchar(45) NOT NULL
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
(204, 1, '0000000000');

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
