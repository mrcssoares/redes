-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Tempo de geração: 16/06/2017 às 17:08
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
-- Estrutura para tabela `fcm`
--

CREATE TABLE `fcm` (
  `fcm_id` text NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `fcm`
--

INSERT INTO `fcm` (`fcm_id`, `id_user`) VALUES
('dccLt1zbEgo:APA91bGfO3YHhfPI_S8L1pheXlby1gTsQjgeElKmnydCRRg1mto0t9rSQRsYY7M7QN2ikG_0mRmSHGer3DXnWzbJ_DmKQCVBoQESdXoZeXsuqxNnwmLELHItelGuHV9AmU2fdL10_edQ', 7),
('f4XiXoeIhnI:APA91bHK_7JJpfYxg6kM34x5gKDYgTDUxXO36squIpDk6u4JaQkPP9gXngIfrKPr5Zlun56tnlUHywl-neeOtYIJ3g0H1fTcxaiZy2k-DHo1oVMFaTJXX2q4T7zCzW81QYlHFqCuhxj0', 8),
('dQkOT1-xPqA:APA91bG_0FQOLTdtWwd_F7dFVWC4Ai31gI1NrBQCmLDmvbSMsnGQHnbkEUKK1b4GJnUr84ULdR2AlmvbKZPL60vGOdGWNzMW8TTy13ZWVhshtJcMuz6a9kRtcsHbQjroKlKLlpSw9BEv', 10);

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `fcm`
--
ALTER TABLE `fcm`
  ADD UNIQUE KEY `id_user` (`id_user`);

--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `fcm`
--
ALTER TABLE `fcm`
  ADD CONSTRAINT `fk_id_user_fcm` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
