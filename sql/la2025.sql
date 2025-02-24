-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-02-2025 a las 00:55:35
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `la2025`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avisos`
--

CREATE TABLE `avisos` (
  `id` int(50) NOT NULL,
  `idcliente` int(50) NOT NULL,
  `chasis` varchar(20) NOT NULL,
  `averia` text DEFAULT NULL,
  `productor` int(5) NOT NULL,
  `finalizado` int(1) NOT NULL DEFAULT 0,
  `fechainicio` date NOT NULL,
  `fechafin` date DEFAULT NULL,
  `resolucion` text DEFAULT NULL,
  `presupuesto` int(1) NOT NULL DEFAULT 0,
  `aceptado` int(2) DEFAULT NULL,
  `prioridad` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `avisos`
--

INSERT INTO `avisos` (`id`, `idcliente`, `chasis`, `averia`, `productor`, `finalizado`, `fechainicio`, `fechafin`, `resolucion`, `presupuesto`, `aceptado`, `prioridad`) VALUES
(1, 1, 'H2X386K03456', 'Fallo de motor', 900, 1, '2023-01-01', '2025-02-23', '', 1, 0, 2),
(2, 2, 'H21252E06789', 'Problema eléctrico', 901, 1, '2023-02-10', '2023-02-15', 'Reparado', 0, 0, 1),
(3, 3, 'W41173H09876', 'Cambio de filtro', 903, 0, '2023-03-05', '0000-00-00', '', 1, 0, 3),
(4, 4, 'H2X392F03456', 'Fugas de aceite', 904, 1, '2023-04-20', '2023-04-25', 'Reparado', 0, 0, 2),
(5, 5, 'W41152G07890', 'Ajuste de frenos', 905, 0, '2023-05-15', '0000-00-00', '', 1, 0, 1),
(6, 1, 'H2X386A01234', 'Revisión general', 906, 1, '2023-06-01', '2023-06-10', 'Revisado', 0, 0, 2),
(7, 2, 'H21252E06789', 'Actualización de software', 907, 0, '2023-07-20', '0000-00-00', '', 1, 0, 3),
(8, 3, 'W4X131B07890', 'Reemplazo de batería', 0, 1, '2023-08-15', '2023-08-20', 'Reemplazado', 0, 0, 1),
(9, 4, 'W41173C09876', 'Inspección de seguridad', 900, 1, '2023-09-05', '2025-02-23', '', 1, 0, 2),
(10, 5, 'H21202D05678', 'Limpieza de sistema', 901, 1, '2023-10-10', '2023-10-12', 'Limpieza realizada', 0, 0, 3),
(11, 6, 'H2X392K00123', 'Revisión de frenos', 906, 0, '2023-11-01', '0000-00-00', '', 1, 0, 1),
(12, 7, 'H2X392M00901', 'Reemplazo de filtro de aire', 903, 1, '2023-11-10', '2023-11-12', 'Reemplazado', 0, 0, 2),
(13, 8, 'H2X392L00456', 'Problema en el sistema de escape', 904, 0, '2023-12-05', '0000-00-00', '', 1, 0, 3),
(14, 9, 'H21202N01234', 'Ajuste de embrague', 905, 1, '2023-12-20', '2023-12-22', 'Ajustado', 0, 0, 2),
(15, 10, 'H2X392M00789', 'Cambio de aceite', 906, 0, '2024-01-15', '0000-00-00', '', 1, 0, 1),
(16, 6, 'H2X392K00123', 'Revisión de suspensión', 907, 1, '2024-01-25', '2024-01-27', 'Revisado', 0, 0, 3),
(17, 7, 'H2X392M00901', 'Problema en el sistema de dirección', 900, 1, '2024-02-10', '2025-02-23', '', 1, 0, 2),
(18, 8, 'H2X392L00456', 'Reemplazo de bujías', 901, 1, '2024-02-25', '2024-02-28', 'Reemplazado', 0, 0, 1),
(19, 9, 'H21202N01234', 'Revisión de la transmisión', 903, 0, '2024-03-10', '0000-00-00', '', 1, 0, 2),
(20, 10, 'H2X392M00789', 'Problema en el sistema eléctrico', 904, 1, '2024-03-20', '2024-03-22', 'Reparado', 0, 0, 3),
(21, 1, 'H2X386K03456', 'Fallo en el sistema hidráulico', 901, 0, '2024-03-25', '0000-00-00', '', 1, 0, 4),
(22, 2, 'H21252E06789', 'Avería en el alternador', 903, 1, '2024-04-10', '2024-04-15', 'Reparado', 0, 0, 3),
(23, 3, 'W41173H09876', 'Desgaste de neumáticos', 904, 0, '2024-04-25', '0000-00-00', '', 1, 0, 2),
(24, 4, 'H2X392F03456', 'Problema con el sistema de frenos', 905, 1, '2024-05-05', '2024-05-10', 'Reparado', 0, 0, 5),
(25, 5, 'W41152G07890', 'Fallo en la transmisión', 906, 0, '2024-05-20', '0000-00-00', '', 1, 0, 1),
(26, 6, 'H2X392K00123', 'Revisión del sistema de refrigeración', 907, 1, '2024-06-01', '2024-06-05', 'Revisado', 0, 0, 4),
(27, 7, 'H2X392M00901', 'Ajuste de la correa de distribución', 900, 0, '2024-06-15', '0000-00-00', '', 1, 0, 3),
(28, 8, 'H2X392L00456', 'Revisión del sistema de escape', 901, 1, '2024-07-01', '2024-07-05', 'Revisado', 0, 0, 2),
(29, 9, 'H21202N01234', 'Cambio de aceite y filtros', 903, 0, '2024-07-15', '0000-00-00', '', 1, 0, 1),
(30, 10, 'H2X392M00789', 'Inspección general de seguridad', 904, 1, '2024-08-01', '2024-08-05', 'Inspeccionado', 0, 0, 5),
(31, 11, 'H21202O01567', 'Fallo en el sistema de iluminación', 901, 0, '2024-08-10', '0000-00-00', '', 1, 0, 3),
(32, 12, 'H21202N01012', 'Problema en el sistema de inyección', 903, 1, '2024-08-20', '2024-08-25', 'Reparado', 0, 0, 4),
(34, 14, 'H21202O01345', 'Fallo en el sistema de dirección asistida', 905, 1, '2024-09-10', '2024-09-15', 'Reparado', 0, 0, 2),
(36, 16, 'H2X392P01678', 'Revisión del sistema de frenos', 907, 1, '2024-10-01', '2024-10-05', 'Revisado', 0, 0, 3),
(37, 17, 'H21202T02890', 'Ajuste de válvulas', 900, 0, '2024-10-15', '0000-00-00', '', 1, 0, 3),
(38, 18, 'H2X392Q01901', 'Problema en el sistema de escape', 901, 1, '2024-11-01', '2024-11-05', 'Reparado', 0, 0, 5),
(39, 19, 'H2X392S02567', 'Fallo en el sistema de suspensión', 903, 0, '2024-11-10', '0000-00-00', '', 1, 0, 2),
(40, 20, 'H21202R02234', 'Inspección de motor', 904, 1, '2024-12-01', '2024-12-05', 'Inspeccionado', 0, 0, 5),
(41, 1, 'H2X386K03456', 'Fallo en el sistema de suspensión', 901, 0, '2024-08-10', '0000-00-00', '', 1, 0, 4),
(42, 2, 'H21252E06789', 'Problema en el sistema de inyección', 903, 1, '2024-08-20', '2024-08-25', 'Reparado', 0, 0, 5),
(43, 3, 'W41173H09876', 'Desgaste en los frenos', 904, 0, '2024-09-01', '0000-00-00', '', 1, 0, 2),
(44, 4, 'H2X392F03456', 'Fallo en el sistema de dirección asistida', 905, 1, '2024-09-10', '2024-09-15', 'Reparado', 0, 0, 3),
(45, 5, 'W41152G07890', 'Avería en el sistema de climatización', 906, 0, '2024-09-20', '0000-00-00', '', 1, 0, 1),
(46, 6, 'H2X392K00123', 'Revisión del sistema de frenos', 907, 1, '2024-10-01', '2024-10-05', 'Revisado', 0, 0, 2),
(47, 7, 'H2X392M00901', 'Ajuste de válvulas', 900, 0, '2024-10-15', '0000-00-00', '', 1, 0, 3),
(48, 8, 'H2X392L00456', 'Problema en el sistema de escape', 901, 1, '2024-11-01', '2024-11-05', 'Reparado', 0, 0, 5),
(49, 9, 'H21202N01234', 'Fallo en el sistema de suspensión', 903, 0, '2024-11-10', '0000-00-00', '', 1, 0, 2),
(50, 10, 'H2X392M00789', 'Inspección de motor', 904, 1, '2024-12-01', '2024-12-05', 'Inspeccionado', 0, 0, 5),
(51, 1, 'H2X386K03456', 'Fallo en el sistema de iluminación', 900, 0, '2024-09-10', '0000-00-00', '', 1, 0, 4),
(52, 2, 'H21252E06789', 'Problema en el sistema de inyección', 901, 1, '2024-09-20', '2024-09-25', 'Reparado', 0, 0, 3),
(53, 3, 'W41173H09876', 'Desgaste en los frenos', 903, 0, '2024-10-01', '0000-00-00', '', 1, 0, 2),
(54, 4, 'H2X392F03456', 'Fallo en el sistema de dirección asistida', 904, 1, '2024-10-10', '2024-10-15', 'Reparado', 0, 0, 5),
(55, 5, 'W41152G07890', 'Avería en el sistema de climatización', 905, 0, '2024-10-20', '0000-00-00', '', 1, 0, 1),
(56, 16, 'H2X392P01678', 'Revisión del sistema de frenos', 905, 1, '2025-09-01', '2025-09-05', 'Revisado', 0, 0, 2),
(57, 17, 'H21202T02890', 'Problema en el sistema hidráulico', 906, 0, '2023-09-10', '0000-00-00', '', 1, 0, 3),
(58, 18, 'H2X392Q01901', 'Revisión del sistema eléctrico', 907, 1, '2025-09-20', '2025-09-25', 'Revisado', 0, 0, 4),
(59, 19, 'H2X392S02567', 'Inspección del sistema de dirección', 907, 0, '2023-10-01', '0000-00-00', '', 1, 0, 5),
(60, 20, 'H21202R02234', 'Fallo en el sistema de climatización', 900, 1, '2025-10-10', '2025-10-15', 'Reparado', 0, 0, 1),
(61, 11, 'H21202O01567', 'Revisión del sistema de escape', 901, 0, '2024-09-10', '0000-00-00', '', 1, 0, 2),
(62, 12, 'H21202N01012', 'Fallo en la transmisión', 900, 1, '2024-09-20', '2024-09-25', 'Reparado', 0, 0, 4),
(64, 14, 'H21202O01345', 'Problema en el sistema hidráulico', 903, 1, '2024-10-10', '2024-10-15', 'Reparado', 0, 0, 5),
(66, 16, 'H2X392P01678', 'Fallo en el sistema de dirección', 905, 1, '2024-11-01', '2024-11-05', 'Reparado', 0, 0, 2),
(67, 17, 'H21202T02890', 'Problema en el sistema eléctrico', 906, 0, '2024-11-15', '0000-00-00', '', 1, 0, 4),
(68, 18, 'H2X392Q01901', 'Desgaste en los neumáticos', 907, 1, '2024-12-01', '2024-12-05', 'Reparado', 0, 0, 5),
(69, 19, 'H2X392S02567', 'Revisión del sistema de frenos', 900, 0, '2024-12-10', '0000-00-00', '', 1, 0, 3),
(70, 20, 'H21202R02234', 'Ajuste de válvulas', 900, 1, '2024-12-20', '2024-12-25', 'Revisado', 0, 0, 2),
(72, 22, 'H2X392A04567', 'Fallo en el sistema de dirección asistida', 903, 1, '2025-01-20', '2025-01-25', 'Reparado', 0, 0, 3),
(76, 11, 'H21202O01567', 'Problema en el sistema de transmisión', 907, 1, '2025-03-01', '2025-03-05', 'Reparado', 0, 0, 4),
(77, 12, 'H21202N01012', 'Desgaste en los frenos', 900, 0, '2025-02-10', '0000-00-00', '', 1, 0, 5),
(79, 14, 'H21202O01345', 'Fallo en el sistema hidráulico', 901, 0, '2024-04-01', '0000-00-00', '', 1, 0, 2),
(81, 16, 'H2X392P01678', 'Problema en el sistema de frenos', 906, 0, '2023-04-01', '0000-00-00', '', 1, 0, 2),
(82, 17, 'H21202T02890', 'Avería en el sistema de dirección', 907, 1, '2025-04-10', '2025-04-15', 'Reparado', 0, 0, 3),
(83, 18, 'H2X392Q01901', 'Fallo en el sistema de suspensión', 905, 0, '2024-04-20', '0000-00-00', '', 1, 0, 4),
(84, 19, 'H2X392S02567', 'Revisión del sistema de iluminación', 900, 1, '2025-05-01', '2025-05-05', 'Revisado', 0, 0, 5),
(85, 20, 'H21202R02234', 'Inspección del sistema de escape', 901, 1, '2022-05-10', '2025-02-23', '', 1, 0, 1),
(87, 22, 'H2X392A04567', 'Fallo en el sistema de climatización', 907, 0, '2022-06-01', '0000-00-00', '', 1, 0, 3),
(91, 11, 'H21202O01567', 'Inspección del sistema de dirección', 906, 0, '2022-07-10', '0000-00-00', '', 1, 0, 2),
(92, 12, 'H21202N01012', 'Fallo en el sistema hidráulico', 900, 1, '2025-07-20', '2025-07-25', 'Reparado', 0, 0, 3),
(94, 14, 'H21202O01345', 'Problema en el sistema de iluminación', 903, 1, '2025-08-10', '2025-08-15', 'Reparado', 0, 0, 5),
(96, 16, 'H2X392P01678', 'Revisión del sistema de frenos', 905, 1, '2025-09-01', '2025-09-05', 'Revisado', 0, 0, 2),
(97, 17, 'H21202T02890', 'Problema en el sistema hidráulico', 906, 0, '2022-09-10', '0000-00-00', '', 1, 0, 3),
(98, 18, 'H2X392Q01901', 'Revisión del sistema eléctrico', 907, 1, '2025-09-20', '2025-09-25', 'Revisado', 0, 0, 4),
(99, 19, 'H2X392S02567', 'Inspección del sistema de dirección', 900, 1, '2023-10-01', '2025-02-23', '', 1, 0, 5),
(100, 20, 'H21202R02234', 'Fallo en el sistema de climatización', 900, 1, '2025-10-10', '2025-10-15', 'Reparado', 0, 0, 1),
(102, 22, 'H2X392A04567', 'Inspección de frenos', 906, 0, '2022-05-15', '0000-00-00', '', 1, 0, 3),
(106, 11, 'H21202O01567', 'Inspección del sistema de escape', 901, 0, '2022-06-20', '0000-00-00', '', 1, 0, 2),
(107, 12, 'H21202N01012', 'Problema en el sistema de iluminación', 903, 1, '2025-07-01', '2025-07-05', 'Revisado', 0, 0, 3),
(109, 14, 'H21202O01345', 'Revisión del sistema de transmisión', 905, 1, '2025-07-20', '2025-07-25', 'Revisado', 0, 0, 5),
(111, 16, 'H2X392P01678', 'Revisión del sistema eléctrico', 907, 1, '2025-08-10', '2025-08-15', 'Revisado', 0, 0, 2),
(112, 17, 'H21202T02890', 'Problema en el sistema hidráulico', 901, 0, '2022-08-20', '0000-00-00', '', 1, 0, 3),
(113, 18, 'H2X392Q01901', 'Inspección del sistema de dirección', 900, 1, '2025-09-01', '2025-09-05', 'Revisado', 0, 0, 4),
(114, 19, 'H2X392S02567', 'Fallo en el sistema de climatización', 901, 0, '2022-09-10', '0000-00-00', '', 1, 0, 5),
(115, 20, 'H21202R02234', 'Desgaste en los frenos', 903, 1, '2025-09-20', '2025-09-25', 'Reparado', 0, 0, 1),
(117, 22, 'H2X392A04567', 'Problema en el sistema de escape', 905, 1, '2025-10-10', '2025-10-15', 'Reparado', 0, 0, 3),
(121, 16, 'H2X392P01678', 'Problema en el sistema de frenos', 900, 1, '2023-11-20', '2025-02-23', '', 1, 0, 4),
(122, 17, 'H21202T02890', 'Fallo en el sistema de suspensión', 901, 1, '2025-12-01', '2025-12-05', 'Reparado', 0, 0, 3),
(123, 18, 'H2X392Q01901', 'Revisión del sistema de iluminación', 903, 0, '2023-12-10', '0000-00-00', '', 1, 0, 2),
(124, 19, 'H2X392S02567', 'Inspección del sistema de escape', 904, 1, '2025-12-20', '2025-12-25', 'Revisado', 0, 0, 5),
(125, 20, 'H21202R02234', 'Revisión del sistema de dirección', 905, 0, '2025-01-05', '0000-00-00', '', 1, 0, 1),
(127, 22, 'H2X392A04567', 'Fallo en el sistema de climatización', 907, 0, '2023-02-01', '0000-00-00', '', 1, 0, 4),
(131, 7, 'H2X392M00901', 'Revisión del sistema de escape', 905, 1, '2026-03-10', '2026-03-15', 'Revisado', 0, 0, 2),
(132, 14, 'H21202O01345', 'Problema en el sistema de dirección', 906, 0, '2023-03-20', '0000-00-00', '', 1, 0, 4),
(133, 3, 'W41173H09876', 'Fallo en el sistema de climatización', 907, 1, '2026-04-01', '2026-04-05', 'Reparado', 0, 0, 3),
(134, 9, 'H21202N01234', 'Inspección del sistema de frenos', 900, 1, '2023-04-10', '2025-02-23', '', 1, 0, 5),
(135, 18, 'H2X392Q01901', 'Problema en el sistema de suspensión', 901, 1, '2026-04-20', '2026-04-25', 'Reparado', 0, 0, 1),
(136, 6, 'H2X392K00123', 'Revisión del sistema de transmisión', 903, 0, '2023-05-01', '0000-00-00', '', 1, 0, 2),
(138, 11, 'H21202O01567', 'Desgaste en los neumáticos', 905, 0, '2023-05-20', '0000-00-00', '', 1, 0, 3),
(139, 22, 'H2X392A04567', 'Inspección del sistema de dirección', 906, 1, '2026-06-01', '2026-06-05', 'Revisado', 0, 0, 5),
(140, 19, 'H2X392S02567', 'Problema en el sistema de iluminación', 907, 0, '2024-06-10', '0000-00-00', '', 1, 0, 1),
(141, 2, 'H21252E06789', 'Problema en el sistema eléctrico', 900, 0, '2024-06-20', '0000-00-00', '', 1, 0, 5),
(142, 5, 'W41152G07890', 'Ajuste de embrague', 901, 1, '2026-06-30', '2026-07-05', 'Reparado', 0, 0, 2),
(143, 8, 'H2X392L00456', 'Revisión del sistema de frenos', 903, 0, '2024-07-10', '0000-00-00', '', 1, 0, 4),
(144, 11, 'H21202O01567', 'Desgaste en los neumáticos', 904, 1, '2026-07-20', '2026-07-25', 'Reemplazado', 0, 0, 3),
(145, 14, 'H21202O01345', 'Fallo en el sistema de dirección', 905, 0, '2024-08-01', '0000-00-00', '', 1, 0, 1),
(146, 17, 'H21202T02890', 'Inspección de motor', 906, 1, '2026-08-10', '2026-08-15', 'Revisado', 0, 0, 4),
(147, 20, 'H21202R02234', 'Problema en el sistema de iluminación', 907, 0, '2024-08-20', '0000-00-00', '', 1, 0, 2),
(150, 1, 'H2X386K03456', 'Inspección del sistema de climatización', 901, 1, '2026-09-20', '2026-09-25', 'Revisado', 0, 0, 2),
(151, 4, 'H2X392F03456', 'Ajuste de frenos', 900, 0, '2024-10-01', '0000-00-00', '', 1, 0, 4),
(152, 10, 'H2X392M00789', 'Cambio de aceite', 906, 1, '2026-10-15', '2026-10-20', 'Reemplazado', 0, 0, 3),
(153, 6, 'H2X392K00123', 'Revisión del sistema de dirección', 907, 0, '2024-11-01', '0000-00-00', '', 1, 0, 2),
(154, 8, 'H2X392L00456', 'Inspección del sistema de escape', 900, 0, '2024-12-01', '0000-00-00', '', 1, 1, 1),
(156, 20, 'H21202R02234', 'Fallo en el sistema eléctrico', 903, 0, '2024-01-01', '0000-00-00', '', 0, 0, 3),
(157, 12, 'H21202N01012', 'Problema en el sistema de frenos', 904, 1, '2027-01-10', '2027-01-15', 'Reparado', 0, 0, 2),
(158, 18, 'H2X392Q01901', 'Inspección del sistema de dirección', 905, 0, '2024-02-01', '0000-00-00', '', 0, 0, 5),
(160, 16, 'H2X392P01678', 'Problema en el sistema hidráulico', 907, 0, '2024-03-01', '0000-00-00', '', 0, 0, 4),
(161, 3, 'W41173H09876', 'Inspección del sistema de frenado', 900, 1, '2024-02-20', '2025-02-23', '', 0, 0, 2),
(162, 5, 'W41152G07890', 'Problema en el sistema eléctrico', 901, 1, '2027-03-01', '2027-03-05', 'Reparado', 0, 0, 4),
(163, 9, 'H21202N01234', 'Ajuste de frenos', 903, 0, '2024-03-10', '0000-00-00', '', 0, 0, 3),
(164, 12, 'H21202N01012', 'Cambio de aceite', 904, 1, '2027-03-20', '2027-03-25', 'Reemplazado', 0, 0, 5),
(165, 14, 'H21202O01345', 'Inspección del sistema de suspensión', 905, 0, '2024-04-01', '0000-00-00', '', 0, 0, 1),
(166, 18, 'H2X392Q01901', 'Problema en el sistema hidráulico', 906, 1, '2027-04-10', '2027-04-15', 'Reparado', 0, 0, 2),
(169, 8, 'H2X392L00456', 'Reemplazo de batería', 900, 0, '2024-05-10', '0000-00-00', '', 1, 0, 5),
(170, 11, 'H21202O01567', 'Problema en el sistema de climatización', 901, 1, '2027-05-20', '2027-05-25', 'Reparado', 0, 0, 1),
(171, 2, 'H21252E06789', 'Problema en el sistema de dirección', 903, 1, '2027-06-01', '2027-06-05', 'Reparado', 0, 0, 3),
(172, 7, 'H2X392M00901', 'Inspección del sistema de frenos', 904, 0, '2024-06-10', '0000-00-00', '', 1, 0, 4),
(174, 19, 'H2X392S02567', 'Problema en el sistema de suspensión', 906, 0, '2024-07-01', '0000-00-00', '', 1, 0, 1),
(176, 9, 'H21202N01234', 'Problema en el sistema hidráulico', 904, 0, '2024-07-20', '0000-00-00', '', 1, 0, 3),
(178, 18, 'H2X392Q01901', 'Revisión del sistema de climatización', 901, 0, '2024-08-10', '0000-00-00', '', 1, 0, 2),
(179, 22, 'H2X392A04567', 'Problema en el sistema eléctrico', 903, 1, '2027-08-20', '2027-08-25', 'Reparado', 0, 0, 5),
(181, 1, 'H2X386K03456', 'Inspección del sistema hidráulico', 905, 0, '2024-09-10', '0000-00-00', '', 1, 0, 4),
(182, 8, 'H2X392L00456', 'Problema en el sistema de climatización', 906, 1, '2027-09-20', '2027-09-25', 'Reparado', 0, 0, 3),
(183, 17, 'H21202T02890', 'Reemplazo de batería', 907, 0, '2024-10-01', '0000-00-00', '', 1, 0, 2),
(186, 4, 'H2X392F03456', 'Inspección del sistema de iluminación', 901, 1, '2027-11-01', '2027-11-05', 'Revisado', 0, 0, 2),
(187, 12, 'H21202N01012', 'Problema en el sistema de escape', 903, 0, '2024-11-10', '0000-00-00', '', 1, 0, 3),
(188, 22, 'H2X392A04567', 'Ajuste de válvulas', 904, 1, '2027-11-20', '2027-11-25', 'Ajustado', 0, 0, 4),
(189, 6, 'H2X392K00123', 'Revisión del sistema de transmisión', 905, 0, '2024-12-01', '0000-00-00', '', 1, 0, 1),
(190, 19, 'H2X392S02567', 'Problema en el sistema de frenos', 906, 1, '2027-12-10', '2027-12-15', 'Reparado', 0, 0, 5),
(191, 3, 'W41173H09876', 'Inspección del sistema de frenado', 900, 0, '2025-01-01', '0000-00-00', '', 1, 0, 2),
(192, 5, 'W41152G07890', 'Problema en el sistema eléctrico', 901, 1, '2028-01-10', '2028-01-15', 'Reparado', 0, 0, 4),
(193, 9, 'H21202N01234', 'Ajuste de frenos', 903, 0, '2025-01-20', '0000-00-00', '', 1, 0, 3),
(194, 12, 'H21202N01012', 'Cambio de aceite', 904, 1, '2028-02-01', '2028-02-05', 'Reemplazado', 0, 0, 5),
(195, 14, 'H21202O01345', 'Inspección del sistema de suspensión', 905, 0, '2024-02-10', '0000-00-00', '', 1, 0, 1),
(196, 18, 'H2X392Q01901', 'Problema en el sistema hidráulico', 906, 1, '2028-02-20', '2028-02-25', 'Reparado', 0, 0, 2),
(199, 8, 'H2X392L00456', 'Reemplazo de batería', 900, 0, '2024-03-20', '0000-00-00', '', 1, 0, 5),
(200, 11, 'H21202O01567', 'Problema en el sistema de climatización', 901, 1, '2028-04-01', '2028-04-05', 'Reparado', 0, 0, 1),
(202, 22, 'H2X392A04567', 'Desgaste de neumáticos', 900, 0, '2024-03-20', '0000-00-00', '', 0, 0, 2),
(203, 19, 'H2X392S02567', 'Inspección del sistema de frenos', 901, 1, '2027-04-01', '2027-04-05', 'Revisado', 0, 0, 5),
(206, 11, 'H21202O01567', 'Ajuste de embrague', 905, 0, '2024-05-01', '0000-00-00', '', 0, 0, 3),
(207, 14, 'H21202O01345', 'Fallo en el sistema de dirección', 906, 1, '2027-05-10', '2027-05-15', 'Reparado', 0, 0, 2),
(208, 17, 'H21202T02890', 'Revisión del sistema de transmisión', 907, 0, '2024-05-20', '0000-00-00', '', 1, 0, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `poblacion` varchar(100) DEFAULT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  `contacto` varchar(100) DEFAULT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `fechacreacion` date NOT NULL DEFAULT current_timestamp(),
  `bajacliente` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `direccion`, `poblacion`, `provincia`, `contacto`, `telefono`, `email`, `fechacreacion`, `bajacliente`) VALUES
(1, 'Bodega Real', 'Calle Vino, 12', 'Ciudad Real', 'Ciudad Real', 'Carlos Mendoza', '666123456', 'bodega.real@correo.com', '2022-05-01', 0),
(2, 'Agrícola La Mancha', 'Avenida Campo, 45', 'Puertollano', 'Ciudad Real', 'Ana Torres', '666654321', 'agricola.macha@correo.com', '2023-01-15', 0),
(3, 'Frutas del Valle', 'Paseo Frutal, 67', 'Tomelloso', 'Ciudad Real', 'Lucía García', '666987654', 'frutas.valle@correo.com', '2021-03-08', 0),
(4, 'Ganadería Manchega', 'Calle Ganado, 23', 'Alcázar de San Juan', 'Ciudad Real', 'Miguel Pérez', '666321098', 'ganaderia.manchega@correo.com', '2020-07-14', 0),
(5, 'Quesos Manchegos', 'Calle Queso, 9', 'Valdepeñas', 'Ciudad Real', 'María Fernández', '666213456', 'quesos.manchegos@correo.com', '2019-11-21', 0),
(6, 'Viñedos Cuenca', 'Avenida Viñas, 34', 'Cuenca', 'Cuenca', 'Pedro Rodríguez', '666432109', 'vinedos.cuenca@correo.com', '2022-06-18', 0),
(7, 'Hortalizas CR', 'Calle Huerta, 56', 'Tarancón', 'Cuenca', 'Laura Sánchez', '666654789', 'hortalizas.cr@correo.com', '2021-12-02', 0),
(8, 'Aceites Manchegos', 'Paseo Olivo, 13', 'San Clemente', 'Cuenca', 'Francisco Ruiz', '666789123', 'aceites.manchegos@correo.com', '2020-02-20', 0),
(9, 'Panadería Artesanal', 'Calle Pan, 78', 'Las Pedroñeras', 'Cuenca', 'Beatriz López', '666345678', 'panaderia.artesanal@correo.com', '2023-03-30', 0),
(10, 'Cerámica Real', 'Avenida Arte, 22', 'Quintanar del Rey', 'Cuenca', 'Juan Martínez', '666098765', 'ceramica.real@correo.com', '2019-05-11', 0),
(11, 'Jardinería Cuenca', 'Calle Verde, 89', 'Cuenca', 'Cuenca', 'Sofía Gómez', '666567890', 'jardineria.cuenca@correo.com', '2021-04-25', 0),
(12, 'Energía Puertollano', 'Avenida Energía, 56', 'Puertollano', 'Ciudad Real', 'Roberto Jiménez', '666876543', 'energia.puertollano@correo.com', '2022-08-05', 0),
(13, 'Charcutería Delicia', 'Calle Embutido, 56', 'Tomelloso', 'Ciudad Real', 'Carmen Ramírez', '666234567', 'charcuteria.delicia@correo.com', '2023-01-13', 0),
(14, 'Fabricación de Tuberías', 'Avenida Tubería, 78', 'Alcázar de San Juan', 'Ciudad Real', 'Raúl Díaz', '666456789', 'fabricacion.tuberias@correo.com', '2020-09-23', 0),
(15, 'Bodegas Valdepeñas', 'Calle Vino, 34', 'Valdepeñas', 'Ciudad Real', 'Adriana Moreno', '666678901', 'bodegas.valdepenas@correo.com', '2021-06-19', 0),
(16, 'Ferretería Central', 'Avenida Herramienta, 33', 'Tarancón', 'Cuenca', 'Héctor Navarro', '666890123', 'ferreteria.central@correo.com', '2022-11-10', 0),
(17, 'Papelería Escolar', 'Calle Papel, 45', 'San Clemente', 'Cuenca', 'Valeria Vega', '666123987', 'papeleria.escolar@correo.com', '2019-02-15', 0),
(18, 'Juguetería Infantil', 'Avenida Juego, 67', 'Las Pedroñeras', 'Cuenca', 'Daniela Reyes', '666345210', 'jugueteria.infantil@correo.com', '2021-10-28', 0),
(19, 'Tienda de Ropa', 'Calle Moda, 90', 'Quintanar del Rey', 'Cuenca', 'Luis Romero', '666567432', 'tienda.ropa@correo.com', '2023-04-07', 0),
(20, 'Transformación del Ajo', 'Paseo Ajo, 11', 'Las Pedroñeras', 'Cuenca', 'Elena Ortiz', '666789654', 'transformacion.ajo@correo.com', '2022-09-30', 0),
(21, 'Procesado de Ajos', 'Avenida Ajo, 22', 'Las Pedroñeras', 'Cuenca', 'María Gutiérrez', '666987123', 'procesado.ajos@correo.com', '2021-08-12', 0),
(22, 'Industria Láctea Alcázar', 'Paseo Lácteo, 34', 'Alcázar de San Juan', 'Ciudad Real', 'Javier González', '666112233', 'industria.lactea@correo.com', '2020-05-17', 0),
(23, 'Tuberías Alcázar', 'Calle Tubería, 45', 'Alcázar de San Juan', 'Ciudad Real', 'Isabel Morales', '666445566', 'tuberias.alcazar@correo.com', '2021-09-23', 0),
(24, 'Vinos de Valdepeñas', 'Avenida Viñas, 12', 'Valdepeñas', 'Ciudad Real', 'Luis Martín', '666998877', 'vinos.valdepenas@correo.com', '2022-02-14', 0),
(25, 'Agricultura Tomelloso', 'Calle Campo, 67', 'Tomelloso', 'Ciudad Real', 'Rosa Navarro', '666223344', 'agricultura.tomelloso@correo.com', '2021-04-21', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maquinas`
--

CREATE TABLE `maquinas` (
  `id` int(10) NOT NULL,
  `modelo` varchar(10) NOT NULL,
  `chasis` varchar(20) NOT NULL,
  `cliente` int(10) NOT NULL,
  `fechacreacion` date NOT NULL DEFAULT current_timestamp(),
  `alquiler` int(1) NOT NULL DEFAULT 0,
  `contrato` int(1) NOT NULL DEFAULT 0,
  `reaco` int(1) NOT NULL DEFAULT 0,
  `baja` int(1) NOT NULL DEFAULT 0,
  `notas` text DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `maquinas`
--

INSERT INTO `maquinas` (`id`, `modelo`, `chasis`, `cliente`, `fechacreacion`, `alquiler`, `contrato`, `reaco`, `baja`, `notas`, `numero`) VALUES
(1, 'E14', 'H2X386A01234', 1, '2022-05-15', 1, 0, 0, 0, '', 'M001'),
(2, 'H20D', 'H2X392A04567', 22, '2023-02-10', 0, 1, 0, 0, 'NOTAS SOBRE LA MÁQUINA 2', '0'),
(3, 'T18', 'W4X131B07890', 3, '2021-06-20', 0, 1, 1, 1, 'Notas sobre la máquina 3', 'M003'),
(4, 'L20', 'W41173C09876', 4, '2020-08-25', 0, 1, 0, 1, '', '0'),
(5, 'H50D', 'H21202D05678', 5, '2019-12-30', 1, 0, 0, 0, 'Notas sobre la máquina 5', 'M005'),
(6, 'E18', 'H21252E06789', 2, '2023-03-15', 1, 0, 0, 0, 'Notas sobre la máquina 6', 'M006'),
(7, 'H30D', 'H2X392F03456', 4, '2021-10-10', 0, 1, 0, 1, '', 'M007'),
(8, 'T16', 'W41152G07890', 5, '2022-05-14', 0, 1, 1, 0, 'Notas sobre la máquina 8', 'M008'),
(9, 'L14', 'W41173H09876', 3, '2020-03-22', 0, 1, 0, 0, '', 'M009'),
(10, 'R20', 'W4X131J05678', 3, '2019-07-30', 1, 0, 0, 0, 'Notas sobre la máquina 10', '0'),
(11, 'E14', 'H2X386K03456', 1, '2022-08-01', 1, 0, 0, 0, 'Notas sobre la máquina 11', '0'),
(12, 'E16', 'H2X386L06789', 3, '2023-01-22', 0, 1, 0, 0, '', 'M012'),
(13, 'E18', 'H2X386M04567', 2, '2021-05-10', 1, 0, 0, 0, 'Notas sobre la máquina 13', 'M013'),
(14, 'E20', 'H2X386N07890', 4, '2020-07-30', 0, 1, 1, 0, 'Notas sobre la máquina 14', '0'),
(15, 'E14', 'H21252O09876', 5, '2019-03-15', 1, 0, 0, 0, '', 'M015'),
(16, 'E16', 'H2X386P05678', 1, '2023-02-18', 0, 1, 0, 0, 'Notas sobre la máquina 16', 'M016'),
(17, 'E18', 'H21252Q01234', 3, '2022-06-25', 1, 0, 0, 0, '', '0'),
(18, 'E20', 'H2X386R03456', 2, '2021-11-11', 0, 1, 1, 0, 'Notas sobre la máquina 18', 'M018'),
(19, 'E14', 'H21252S04567', 5, '2020-04-05', 1, 0, 0, 0, '', '0'),
(20, 'E16', 'H2X386T06789', 4, '2019-09-20', 0, 1, 0, 0, 'Notas sobre la máquina 20', 'M020'),
(21, 'H20D', 'H2X392K00123', 6, '2022-09-01', 1, 0, 0, 0, 'Notas sobre la máquina 21', 'M021'),
(22, 'H25D', 'H2X392L00456', 8, '2023-04-15', 0, 1, 0, 1, '', 'M022'),
(23, 'H30D', 'H2X392M00789', 10, '2021-06-20', 0, 1, 1, 0, 'Notas sobre la máquina 23', 'M023'),
(24, 'H35D', 'H21202N01012', 12, '2020-03-14', 1, 0, 0, 0, '', 'M024'),
(25, 'H40D', 'H21202O01345', 14, '2019-11-29', 0, 1, 0, 0, 'Notas sobre la máquina 25', '0'),
(26, 'H50D', 'H2X392P01678', 16, '2022-01-10', 1, 0, 0, 0, 'Notas sobre la máquina 26', 'M026'),
(27, 'H20D', 'H2X392Q01901', 18, '2023-07-22', 0, 1, 0, 1, '', '0'),
(28, 'H25D', 'H21202R02234', 20, '2021-12-18', 0, 1, 1, 0, 'Notas sobre la máquina 28', 'M028'),
(29, 'H30D', 'H2X392S02567', 19, '2020-05-25', 1, 0, 0, 0, '', 'M029'),
(30, 'H35D', 'H21202T02890', 17, '2019-08-31', 0, 1, 0, 0, 'Notas sobre la máquina 30', '0'),
(31, 'H20D', 'H2X392K00345', 3, '2022-10-01', 1, 0, 0, 0, 'Notas sobre la máquina 31', 'M031'),
(32, 'H25D', 'H2X392L00678', 5, '2023-05-25', 0, 1, 0, 1, '', 'M032'),
(33, 'H30D', 'H2X392M00901', 7, '2021-07-15', 0, 1, 1, 0, 'Notas sobre la máquina 33', 'M033'),
(34, 'H35D', 'H21202N01234', 9, '2020-04-20', 1, 0, 0, 0, '', 'M034'),
(35, 'H40D', 'H21202O01567', 11, '2019-12-11', 0, 1, 0, 0, 'Notas sobre la máquina 35', '0'),
(36, 'H50D', 'H2X392P01890', 4, '2022-02-02', 1, 0, 0, 0, 'Notas sobre la máquina 36', 'M036'),
(37, 'H20D', 'H2X392Q02123', 6, '2023-08-08', 0, 1, 0, 1, '', '0'),
(38, 'H25D', 'H21202R02456', 8, '2021-10-31', 0, 1, 1, 0, 'Notas sobre la máquina 38', 'M038'),
(39, 'H30D', 'H2X392S02789', 10, '2020-06-16', 1, 0, 0, 0, '', 'M039'),
(40, 'H35D', 'H21202T03102', 12, '2019-09-19', 0, 1, 0, 0, 'Notas sobre la máquina 40', '0'),
(41, 'T14', 'W4X131K01234', 3, '2022-11-05', 1, 0, 0, 0, 'Notas sobre la máquina 41', 'M041'),
(42, 'T16', 'W41152L03456', 5, '2023-06-10', 0, 1, 0, 1, '', 'M042'),
(43, 'T18', 'W4X131M05678', 7, '2021-08-20', 0, 1, 1, 0, 'Notas sobre la máquina 43', 'M043'),
(44, 'T20', 'W41152N07890', 9, '2020-05-30', 1, 0, 0, 0, '', 'M044'),
(45, 'L14', 'W41173O01234', 11, '2019-12-12', 0, 1, 0, 0, 'Notas sobre la máquina 45', 'M045'),
(46, 'L16', 'W41173P03456', 4, '2022-03-05', 1, 0, 0, 0, 'Notas sobre la máquina 46', 'M046'),
(47, 'L18', 'W41173Q05678', 6, '2023-09-15', 0, 1, 0, 1, '', 'M047'),
(48, 'L20', 'W41173R07890', 8, '2021-10-20', 0, 1, 1, 0, 'Notas sobre la máquina 48', 'M048'),
(49, 'T14', 'W4X131S01234', 10, '2020-06-25', 1, 0, 0, 0, '', 'M049'),
(50, 'L16', 'W41173T03456', 12, '2019-09-30', 0, 1, 0, 0, 'Notas sobre la máquina 50', '0'),
(51, 'R14', 'H21120A01234', 1, '2022-12-01', 1, 0, 0, 0, 'Notas sobre la máquina 51', 'M051'),
(52, 'R16', 'G1X116B03456', 2, '2023-07-14', 0, 1, 0, 0, '', 'M052'),
(53, 'R18', 'H21120C05678', 3, '2021-09-21', 0, 1, 1, 1, 'Notas sobre la máquina 53', 'M053'),
(54, 'R20', 'G1X116D07890', 4, '2020-11-30', 1, 0, 0, 0, '', 'M054'),
(55, 'R14', 'H21120E01234', 5, '2019-05-11', 0, 1, 0, 0, 'Notas sobre la máquina 55', 'M055'),
(56, 'R16', 'G1X116F03456', 6, '2022-06-18', 1, 0, 0, 0, 'Notas sobre la máquina 56', 'M056'),
(57, 'R18', 'H21120G05678', 7, '2023-03-25', 0, 1, 0, 1, '', 'M057'),
(58, 'R20', 'G1X116H07890', 8, '2021-08-30', 0, 1, 1, 0, 'Notas sobre la máquina 58', 'M058'),
(59, 'R14', 'H21120I01234', 9, '2020-10-10', 1, 0, 0, 0, '', 'M059'),
(60, 'R16', 'G1X116J03456', 10, '2019-12-22', 0, 1, 0, 0, 'Notas sobre la máquina 60', 'M060');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productores`
--

CREATE TABLE `productores` (
  `id` int(4) NOT NULL,
  `nombre` varchar(11) NOT NULL,
  `baja` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productores`
--

INSERT INTO `productores` (`id`, `nombre`, `baja`) VALUES
(0, 'Sin asignar', 0),
(77, 'Antiguo', 1),
(900, 'Antonio', 0),
(901, 'Fernando', 0),
(903, 'Javi', 0),
(904, 'Bernabé', 0),
(905, 'Israel', 0),
(906, 'Victor', 0),
(907, 'Eduardo', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `rol` varchar(10) NOT NULL,
  `baja` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `pass`, `rol`, `baja`) VALUES
(4, 'profesor', 'aabb211b66e86d825aaec57dd03bd285590da669', 'admin', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `avisos`
--
ALTER TABLE `avisos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cliente` (`idcliente`),
  ADD KEY `fk_productor` (`productor`),
  ADD KEY `chasis` (`chasis`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `maquinas`
--
ALTER TABLE `maquinas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `chasis` (`chasis`),
  ADD KEY `cliente` (`cliente`);

--
-- Indices de la tabla `productores`
--
ALTER TABLE `productores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `avisos`
--
ALTER TABLE `avisos`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `maquinas`
--
ALTER TABLE `maquinas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `avisos`
--
ALTER TABLE `avisos`
  ADD CONSTRAINT `avisos_ibfk_1` FOREIGN KEY (`idcliente`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `avisos_ibfk_2` FOREIGN KEY (`chasis`) REFERENCES `maquinas` (`chasis`),
  ADD CONSTRAINT `avisos_ibfk_3` FOREIGN KEY (`productor`) REFERENCES `productores` (`id`);

--
-- Filtros para la tabla `maquinas`
--
ALTER TABLE `maquinas`
  ADD CONSTRAINT `maquinas_ibfk_1` FOREIGN KEY (`cliente`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
