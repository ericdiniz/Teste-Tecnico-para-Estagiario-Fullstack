-- MySQL dump 10.19-11.3.2-MySQL, for osx10.19 (arm64)
--
-- Host: localhost    Database: gerenciadorTarefas
-- ------------------------------------------------------
-- Server version	11.3.2-MySQL

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `finalizada` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES
(1,'2 tarefa','2 descrição',1,0),
(4,'tarefa numero 2','descrição patch',3,1),
(5,'tarefa editada','eu amo o felipe, é meu melhor amigo!',3,0),
(6,'titulo','teste de cadastrar tarefa',NULL,0),
(7,'jwt teste','editar com jwt',3,0),
(8,'refresh page','refresh desc',3,0),
(9,'nova tarefa','atualizando a tarefa',8,0),
(10,'title','description',8,0),
(11,'nova tarefa','descrição da tarefa',9,0),
(12,'tarefa1','desc 1',9,1);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'user1@example.com','1234'),
(2,'login','1234'),
(3,'barril','$2b$10$C3XMmQnG2HjZU57vHJBLNe0qvlqbsTywAYh/Jv7MSMXQh3A22pF4m'),
(4,'usuario 4','$2b$10$41klTuDnSrkZ1JLw9v0SyODqNmc6YjT8rkN8NW1uZ1u50V4bG1MQW'),
(5,'novo','$2b$10$/s2AfhrD3p2xecNIk88NeeV.kOL682KZ8eRKJns9DgBfHC3HtB0la'),
(7,'testevalidacao','$2b$10$vOnldykKsnGeVhP140gnaOSpDLppcoxcMRYoSS1uhoeqMz0/7nSvS'),
(8,'emaila@gmail.com','$2b$10$V/Vox.7J6WvnhnOOKDhot.qbYOHdUCGHSDwYTbfZI1ekK5wxDkihy'),
(9,'admin@gmail.com','$2b$10$AFjzzffJXNYmLsAe1huULucaJImSkWaJgNB.DlV4M7m2ZbZ6UEu56');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-06 20:56:40
