-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 19, 2021 at 03:02 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groupomania-forum`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `postId` int(10) UNSIGNED NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `postId`, `date`, `content`) VALUES
(3, 26, 24, '2021-04-20 16:26:21', 'Youko !'),
(7, 29, 21, '2021-04-23 13:49:06', 'Super la vidéo'),
(8, 26, 24, '2021-04-25 11:44:57', 'Photo !'),
(13, 29, 24, '2021-04-26 11:57:28', 'Belle image !');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `title` varchar(250) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `title`, `date`, `content`) VALUES
(20, 26, 'Salut mes potes', '2021-04-16 16:27:06', '<p>Youhou ! Comment &ccedil;a va ? </p>'),
(21, 26, 'Coucou', '2021-04-19 10:52:40', '<p>Y a une nouvelle video !</p>\n<p><a href=\"https://www.youtube.com/watch?v=NyZ_p8eOIbw\">https://www.youtube.com/watch?v=NyZ_p8eOIbw</a></p>'),
(22, 29, 'Salutation', '2021-04-19 11:34:02', '<p>Bonjour &agrave; tous !</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>'),
(24, 20, 'Hello tous le monde', '2021-04-20 16:00:47', '<p>kfkgopskhgpoetjs</p>\n<p><img src=\"https://img-19.ccm2.net/8vUCl8TXZfwTt7zAOkBkuDRHiT8=/1240x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg\" width=\"417\" height=\"278\" /></p>'),
(27, 26, 'Salut à Tous !', '2021-04-23 13:10:40', '<p>Nouveaut&eacute; sur le forum</p>'),
(29, 29, 'Test0000', '2021-04-26 11:58:29', '<p>Test5664date...</p>'),
(34, 26, 'Vacances !', '2021-06-14 12:21:24', 'Vacances !');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `roleAdmin` varchar(255) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nom`, `prenom`, `password`, `email`, `roleAdmin`) VALUES
(20, 'Admin', 'admintest', '$2b$10$2yb/V9tot1Mh8J1nP3G9J.Scyz0BJRP7bs7RWcbA07Cv0ByVKZqbe', 'admin@groupomania.com', '1'),
(25, 'Mael', 'Test', '$2b$10$lqsVf8XYhNKqCTKqq6ilteU2Nva9kyuUE58vFdxugEWur7UvAnGHG', 'maetest@test.com', '0'),
(26, 'Decroix', 'Blandine', '$2b$10$KRX4L576KU9sd0ZkPeaFIeT0BUGMo4eelBzkeKAk3JIgRZ7gNuEBq', 'blandine@test.com', '0'),
(29, 'Liddel', 'Alice', '$2b$10$tsUcUitGWn5AVWNrGxcqcOKq5K3u4wd1rhlqS9Xu4eX0QiEyEEDii', 'aliceliddel@test.com', '0'),
(33, 'Astronomia', 'Alex', '$2b$10$6/K6OMgs9o54CqGchx.M4upQ5.4/Ao5GYLpWoobvZU/xjtKBtPtdu', 'alexastronomia@test.com', '0'),
(38, 'Test', 'Test', '$2b$10$56eVugBxj2/ZfwtWacpVx.MZxLGoUH1Z8l6YGYr6U8BJpNONY.Daq', 'test@test.com', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userId_comments` (`userId`),
  ADD KEY `fk_postId_comments` (`postId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userId_posts` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_postId_comments` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_userId_comments` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_userId_posts` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
