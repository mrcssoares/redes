-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Tempo de geração: 04/05/2017 às 15:56
-- Versão do servidor: 5.7.18-0ubuntu0.16.04.1
-- Versão do PHP: 7.0.18-1+deb.sury.org~xenial+1

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
(2, 'Rock');

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
(1, 'teste de musica', 420, 1, 1, 0),
(2, 'uma musica topperson', 500, 2, 2, 0),
(3, 'teste', 400, 1, 2, 0),
(4, 'tegfd', 1, 1, 1, 0),
(5, 'Save me from my self', 365, 2, 1, 0),
(8, 'Hino Nacional', 420, 2, 4, 0),
(9, 'Hino do amazonas', 420, 2, 4, 0),
(10, 'Hino de manacapuru', 420, 2, 4, 0),
(11, 'Hino de manacapuru', 420, 2, 4, 0),
(12, 'Hino de manacapuru', 420, 2, 4, 0),
(13, 'Um menino nasceu', 437, 2, 4, 0),
(14, 'outro teste de musica', 437, 2, 4, 0);

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
(3, ''),
(4, 'Duivilly Brito');

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
(3, 0, 0, 1, 1, '21-04-2017'),
(4, 0, 0, 2, 1, '21-04-2017'),
(5, 0, 0, 2, 1, '30/04/2017'),
(6, 0, 0, 2, 1, '30/04/2017');

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
(1, 'Marcos Soares', 'zitosmarcos@gmail.com', 'http://www.coisadeprogramador.com.br/assets/images/avatar.png', 1),
(2, 'Dara Lira', 'gsl@icomp.ufam.edu.br', 'http://www.coisadeprogramador.com.br/assets/images/avatar.png', 1),
(3, 'Duivilly', 'db@icomp.ufam.edu.br', 'http://www.coisadeprogramador.com.br/assets/images/avatar.png', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de tabela `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT de tabela `singer`
--
ALTER TABLE `singer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de tabela `solicitation`
--
ALTER TABLE `solicitation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
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
