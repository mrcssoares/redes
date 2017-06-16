-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Tempo de geração: 16/06/2017 às 17:00
-- Versão do servidor: 5.7.18-0ubuntu0.16.04.1
-- Versão do PHP: 7.0.19-1+deb.sury.org~xenial+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `redes`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Pop'),
(2, 'Rock'),
(3, 'Soul'),
(4, 'Funk'),
(6, 'Sertanejo'),
(7, 'Pagode'),
(8, 'MPB');

-- --------------------------------------------------------

--
-- Estrutura para tabela `music`
--

CREATE TABLE `music` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `duration` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `id_singer` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `music`
--

INSERT INTO `music` (`id`, `name`, `duration`, `id_category`, `id_singer`, `status`) VALUES
(32, 'In the end', 3000, 2, 2, 1),
(33, 'Esse cara sou eu', 3000, 1, 1, 1),
(34, 'Amei Te Ver', 0, 2, 8, 1),
(35, 'Numb', 3000, 2, 2, 1),
(36, 'Evidências', 3000, 6, 9, 1),
(37, 'Depois do Prazer', 3000, 3, 10, 1),
(38, 'A Lenda', 3000, 1, 11, 1),
(39, 'Sweet Dreams', 3000, 1, 12, 1),
(40, 'Dormi Na Praça', 3000, 6, 13, 1),
(41, 'Mineirinho', 3000, 6, 10, 1),
(42, 'Que Se Chama Amor', 3000, 6, 10, 1),
(43, 'Eu Me Apaixonei Pela Pessoa Errada', 3000, 7, 14, 1),
(44, 'Mulher de Fases', 3000, 2, 15, 1),
(45, 'A Dor Desse Amor', 3000, 1, 16, 1),
(46, 'Shimbalae', 3000, 8, 17, 1),
(47, 'Nego Drama', 3000, 7, 1, 1),
(48, 'Despacito', 0, 2, 8, 1),
(49, 'so vai', 3000, 8, 18, 1),
(50, 'Musica da arara', 0, 8, 15, 1),
(51, 'Musica do boi bumba', 0, 4, 8, 0),
(52, 'lasjfukajyhdgfbs', 0, 2, 8, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `singer`
--

CREATE TABLE `singer` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `singer`
--

INSERT INTO `singer` (`id`, `name`) VALUES
(1, 'Roberto Carlos'),
(2, 'Link Park'),
(8, 'Duivilly Brito'),
(9, 'Chitãozinho e Xororó'),
(10, 'Só Pra Contrariar'),
(11, 'Sandy & Júnior'),
(12, 'Eurythmics'),
(13, 'Bruno e Marrone'),
(14, 'Exaltasamba'),
(15, 'Raimundos'),
(16, 'KLB'),
(17, 'Maria Gadú'),
(18, 'josé');

-- --------------------------------------------------------

--
-- Estrutura para tabela `solicitation`
--

CREATE TABLE `solicitation` (
  `id` int(11) NOT NULL,
  `likes` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `id_music` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `created_at` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `solicitation`
--

INSERT INTO `solicitation` (`id`, `likes`, `status`, `id_music`, `id_user`, `created_at`) VALUES
(18, 0, 3, 32, 9, '24/05/2017'),
(19, 0, 3, 32, 8, '24/05/2017'),
(20, 0, 2, 46, 8, '24/05/2017'),
(21, 0, 2, 32, 8, '24/05/2017'),
(22, 0, 2, 32, 8, '24/05/2017'),
(23, 0, 2, 33, 8, '27/05/2017'),
(24, 0, 2, 32, 8, '30/05/2017'),
(25, 0, 2, 36, 8, '31/05/2017'),
(26, 0, 2, 40, 10, '31/05/2017'),
(27, 0, 1, 36, 10, '31/05/2017'),
(28, 0, 0, 32, 8, '13/06/2017'),
(29, 0, 0, 33, 8, '13/06/2017'),
(30, 0, 0, 37, 8, '13/06/2017'),
(31, 0, 0, 32, 8, '13/06/2017'),
(32, 0, 0, 34, 10, '13/06/2017');

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `photo` text NOT NULL,
  `type` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `photo`, `type`) VALUES
(7, 'Marcos Soares', 'mss3@icomp.ufam.edu.br', 'https://graph.facebook.com/1198317190280878/picture', 2),
(8, 'Jonas Broder', 'zitosmarcos@gmail.com', 'https://lh6.googleusercontent.com/-RI3n8ma914o/AAAAAAAAAAI/AAAAAAAAUSE/83wp5nB_5Uo/s500-c/photo.jpg', 1),
(9, 'Barry', 'teewa.web@gmail.com', 'https://lh5.googleusercontent.com/-1xFRCVPbXK4/AAAAAAAAAAI/AAAAAAAAAAA/AAyYBF56E2Wrbj7zviSwzcLjK0eh0M4W-A/s500-c/photo.jpg', 1),
(10, 'DUIVILLY BRITO', 'db@icomp.ufam.edu.br', 'https://lh3.googleusercontent.com/-VlQk5j4mj4U/AAAAAAAAAAI/AAAAAAAAAAA/AAyYBF7pyot3-HGWFpNXEuyyKP26N7fCDw/s500-c/photo.jpg', 1),
(11, 'GERCIDARA SILVA LIRA', 'gsl@icomp.ufam.edu.br', 'https://lh5.googleusercontent.com/-87ulS8tLFoA/AAAAAAAAAAI/AAAAAAAAAL4/y6h641N85K0/s500-c/photo.jpg', 2);

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_catagory` (`id_category`,`id_singer`),
  ADD KEY `fk_id_singer` (`id_singer`);

--
-- Índices de tabela `singer`
--
ALTER TABLE `singer`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `solicitation`
--
ALTER TABLE `solicitation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_music` (`id_music`,`id_user`),
  ADD KEY `fk_id_user` (`id_user`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de tabela `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT de tabela `singer`
--
ALTER TABLE `singer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT de tabela `solicitation`
--
ALTER TABLE `solicitation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `fk_id_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_singer` FOREIGN KEY (`id_singer`) REFERENCES `singer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `solicitation`
--
ALTER TABLE `solicitation`
  ADD CONSTRAINT `fk_id_music` FOREIGN KEY (`id_music`) REFERENCES `music` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
