-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-01-2024 a las 00:50:17
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
) ENGINE=MyISAM AUTO_INCREMENT=103 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `applications`
--

INSERT INTO `applications` (`id_application`, `id_post`, `id_user`, `status`) VALUES
(98, 38, 103, 'reviewed'),
(102, 22, 103, 'pending'),
(96, 45, 103, 'rejected');

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
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

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
  PRIMARY KEY (`id_game`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`id_game`, `name`, `img`) VALUES
(1, 'Fortnite', 'games/Fortnite.jpg'),
(2, 'CSGO', 'games/CSGO.jpg'),
(3, 'MultiVersus', 'games/MultiVersus.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modes`
--

DROP TABLE IF EXISTS `modes`;
CREATE TABLE IF NOT EXISTS `modes` (
  `id_mode` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_mode`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `modes`
--

INSERT INTO `modes` (`id_mode`, `name`) VALUES
(1, 'casual'),
(2, 'competitivo'),
(3, 'cazador de trofeos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id_notification` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `message` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'unread',
  `updatedAt` timestamp NOT NULL,
  `createdAt` timestamp NOT NULL,
  `deleted` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_notification`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `notifications`
--

INSERT INTO `notifications` (`id_notification`, `id_user`, `message`, `status`, `updatedAt`, `createdAt`, `deleted`) VALUES
(7, 103, 'test', 'unread', '2024-01-21 00:47:27', '2024-01-02 20:54:48', 0),
(8, 103, 'test update 2', 'unread', '2024-01-21 00:47:27', '2024-01-08 17:08:04', 0),
(10, 103, 'Recibiste una solicitud para jugar.', 'unread', '2024-01-21 00:47:27', '2024-01-08 19:02:58', 0),
(11, 103, 'Recibiste una solicitud para jugar en test', 'unread', '2024-01-21 00:47:27', '2024-01-08 19:04:19', 0),
(12, 103, 'Su solicitud para test ha sido aceptada', 'unread', '2024-01-21 00:47:27', '2024-01-08 19:29:09', 0),
(13, 103, 'Su solicitud para test ha sido rechazada', 'unread', '2024-01-21 00:47:27', '2024-01-08 19:29:32', 0),
(14, 93, 'Recibiste una solicitud para jugar en awwafwa', 'unread', '2024-01-21 00:41:13', '2024-01-15 15:06:12', 0),
(15, 103, 'Recibiste una solicitud para jugar en Teste m', 'unread', '2024-01-21 00:47:27', '2024-01-15 15:10:06', 0),
(16, 103, 'Su solicitud para Teste mobile ha sido acepta', 'unread', '2024-01-21 00:47:27', '2024-01-15 15:24:16', 0),
(17, 103, 'Su solicitud para Teste mobile ha sido rechaz', 'unread', '2024-01-21 00:47:27', '2024-01-15 15:25:02', 0),
(18, 103, 'Su solicitud para Teste mobile ha sido rechaz', 'unread', '2024-01-21 00:47:27', '2024-01-15 15:26:09', 0),
(19, 103, 'Han cancelado una solicitud en awwafwaffw', 'unread', '2024-01-21 00:47:27', '2024-01-15 15:41:20', 0),
(20, 93, 'Recibiste una solicitud para jugar en awwafwa', 'unread', '2024-01-21 00:41:13', '2024-01-15 15:52:44', 0),
(21, 103, 'Han cancelado una solicitud en awwafwaffw', 'unread', '2024-01-21 00:47:27', '2024-01-15 15:53:07', 0),
(22, 93, 'Recibiste una solicitud para jugar en awwafwa', 'unread', '2024-01-21 00:41:13', '2024-01-15 15:55:09', 0),
(23, 93, 'Recibiste una solicitud para jugar en awwafwa', 'unread', '2024-01-21 00:41:13', '2024-01-15 15:57:55', 0),
(24, 93, 'Recibiste una solicitud para jugar en awwafwa', 'unread', '2024-01-21 00:41:13', '2024-01-15 16:01:37', 0),
(25, 103, 'Su solicitud para Teste mobile ha sido acepta', 'unread', '2024-01-21 00:47:27', '2024-01-15 16:03:23', 0),
(26, 103, 'Su solicitud para Teste mobile ha sido rechaz', 'unread', '2024-01-21 00:47:27', '2024-01-15 16:15:06', 0);

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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `platforms`
--

INSERT INTO `platforms` (`id_platform`, `name`, `img`) VALUES
(1, 'Switch', ''),
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
  `deleted` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_post`)
) ENGINE=MyISAM AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id_post`, `id_user`, `id_game`, `id_platform`, `id_mode`, `requiredUsers`, `actualUsers`, `title`, `description`, `date`, `deleted`) VALUES
(22, 93, 1, 1, 2, 1, 0, 'awwafwaffw', '', '2023-01-10 17:58:21', 0),
(24, 235, 2, 2, 1, 1, 0, 'ttttttttttttttt', '', '2023-01-10 18:12:28', 0),
(18, 182, 1, 4, 2, 3, 0, 'test mode id', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2023-01-07 14:25:58', 0),
(45, 103, 0, 0, 0, 0, 0, 'test', 't', '2024-01-04 18:04:59', 0),
(38, 103, 2, 1, 1, 99, 1, 'Teste mobile', '', '2023-11-10 16:13:08', 0),
(42, 103, 1, 1, 1, 1, 0, 'Guvuvv', '', '2023-11-10 17:43:43', 0),
(43, 103, 2, 1, 1, 1, 0, 'Test mobile 54', '', '2023-11-10 17:52:12', 0),
(44, 103, 1, 1, 1, 1, 0, 'Test refresh', '', '2023-11-10 19:08:18', 0),
(46, 103, 1, 1, 1, 1, 0, 'test 2024', '', '2024-01-15 16:15:38', 0);

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
) ENGINE=MyISAM AUTO_INCREMENT=141 DEFAULT CHARSET=latin1;

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
(97, 103, 103, 34, 50, 50, 'ttttttt'),
(111, 103, 103, 38, 70, 23, ''),
(112, 103, 103, 38, 50, 50, ''),
(113, 103, 103, 38, 50, 50, 'Test mobile 2'),
(114, 103, 103, 38, 50, 50, 'Bdbbdjds'),
(115, 103, 103, 38, 50, 50, ''),
(116, 103, 103, 38, 50, 50, ''),
(117, 103, 103, 38, 50, 50, 'Aaaaasaaaaaaq'),
(118, 103, 103, 38, 50, 50, 'Aaaaasaaaaaaq'),
(119, 103, 103, 38, 50, 50, 'Uudjdhdhdh'),
(120, 103, 103, 38, 50, 50, 'Bdbdbdbdj'),
(121, 103, 103, 38, 50, 50, 'Bdbdbdbdj'),
(122, 103, 103, 38, 50, 50, 'Hdvvdvd'),
(123, 103, 103, 38, 50, 50, ''),
(124, 103, 103, 38, 50, 50, ''),
(125, 103, 103, 38, 50, 50, ''),
(126, 103, 103, 38, 50, 50, ''),
(127, 103, 103, 38, 50, 50, ''),
(128, 103, 103, 38, 50, 50, ''),
(129, 103, 103, 38, 50, 50, ''),
(130, 103, 103, 38, 50, 50, ''),
(131, 103, 103, 38, 50, 50, ''),
(132, 103, 103, 38, 50, 50, ''),
(133, 103, 103, 38, 50, 50, ''),
(134, 103, 103, 38, 50, 50, 'Bdbddbdh'),
(135, 103, 103, 38, 70, 23, ''),
(136, 103, 103, 38, 50, 50, ''),
(137, 103, 0, 45, 0, 0, 'test'),
(138, 103, 103, 38, 70, 23, 'test api'),
(139, 103, 103, 38, 50, 50, 'est'),
(140, 103, 103, 38, 50, 50, 'test');

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
(107, 2),
(112, 1),
(92, 1),
(136, 1),
(137, 1),
(75, 1),
(139, 2),
(140, 2);

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
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_role` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(11) NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_role`, `name`) VALUES
(1, 'ADMIN'),
(2, 'USER');

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
  `role` bigint NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=239 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name`, `email`, `password`, `description`, `img`, `role`) VALUES
(93, 'luke', 'luke@gmail.com', '$2a$10$wOCtMtYGPg4/n6Np1YCSTutqTyttsrNWzQoM2y89L58gkRKltu3bO', NULL, 'profiles/file-1704817454676.png', 2),
(103, 'david2', 'david@gmail.com', '$2a$10$UQYtnf8uldFUnDGneacMiOBP9m6TT5jyoLwfAoW9xRHGcltUIDoiy', 'test', 'profiles/default.png', 2),
(182, 'leoDV', 'leoDV@gmail.com', '$2a$10$L4u.jbWS/ZGjxYQq0lvsTeXMJHoBMV/4WerH5ax.eTiCAPShyikYa', NULL, 'profiles/file-1679960143954.png', 2),
(235, 'test', 'test@gmail.com', '$2a$10$8BljRKtBokHVp.lrq28w5uJ4SN.iK6UQY5aZfJb3xP690LoYFQGea', '', 'profiles/default.png', 2),
(238, 'tar', 'testAuthroutes@gmail.com', '$2a$10$fSX4uk1wv7Ld/bs1Gsp0aujt95.2SKBLZJDwznV1rKP6Eu5YY9cnW', '', 'profiles/default.png', 2),
(236, 'user', 'user@gmail.com', '$2a$10$mGbCieoL6GSmfvElAg6gBeE7B/IKUV6peBwBM5zmsHSAcP70f.Zge', '', 'profiles/default.png', 2),
(237, 'admin', 'admin@gmail.com', '$2a$10$ypTfBSbd9O84yymLoBePiexm/pTdYyRJc6WnFEA2WPL84zEW722Ee', '', 'profiles/default.png', 1);

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
(182, 1, 'leo'),
(238, 1, 'test'),
(235, 1, 'test'),
(93, 4, 'test'),
(93, 3, ''),
(93, 2, ''),
(93, 1, ''),
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
(103, 1, 3),
(103, 2, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;