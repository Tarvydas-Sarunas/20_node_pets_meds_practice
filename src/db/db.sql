-- 1. Susikuriame keturias lenteles duomenų bazėje:
-- pets (id, name, dob, client_email, isArchived);
CREATE TABLE `pets` (
  `pet_id` int(11) UNSIGNED  NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `client_email` varchar(255) NOT NULL,
  `isArchived` boolean NOT NULL DEFAULT '0',
  PRIMARY KEY (`pet_id`)
) ENGINE=InnoDB;

-- logs (id, pet_id, description, status);
CREATE TABLE `logs` (
  `log_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `pet_id` int(11) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB;

-- medications (id, name, description);
CREATE TABLE `medications` (
  `medication_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`medication_id`)
) ENGINE=InnoDB;

-- prescriptions (id, medication_id, pet_id, comment, timestamp).
CREATE TABLE `prescriptions` (
  `prescription_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `medication_id` int(11) UNSIGNED NOT NULL,
  `pet_id` int(11) UNSIGNED NOT NULL,
  `comment` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`prescription_id`)
) ENGINE=InnoDB;

-- 2. Užpildome lenteles pradiniais duomenimis (creative and funnes names):
-- pets
INSERT INTO `pets` (pet_id, name, dob, client_email, isArchived) VALUES
(1, 'Rex', '2018-01-01', 'rexowner@gmail.com', 0),
(2, 'Garfield', '2016-05-01', 'garfieldwner@gmail.com', 0),
(3, 'Scooby', '2017-04-20', 'Scooby@gmail.com', 0),
(4, 'Snoopy', '2015-12-12', 'snoopy@gmail.com', 0),
(5, 'Lassie', '2019-08-13', 'lassie@gmail.com', 0);

-- medications
INSERT INTO `medications` (name, description) VALUES
('Vitamin C', 'Vitamin C is an essential nutrient involved in the repair of tissue and the enzymatic production of certain neurotransmitters.'),
('Vitamin D', 'Vitamin D is a group of fat-soluble secosteroids responsible for increasing intestinal absorption of calcium, magnesium, and phosphate, and multiple other biological effects.'),
('Vitamin E', 'Vitamin E is a group of eight fat soluble compounds that include four tocopherols and four tocotrienols.'),
('Vitamin K', 'Vitamin K is a group of structurally similar, fat-soluble vitamins that the human body requires for complete synthesis of certain proteins that are prerequisites for blood coagulation (K from Koagulation, German for "coagulation") and which the body also needs for controlling binding of calcium in bones and other tissues.'),
("Xanax", "Helps you relax and be calm");

-- logs
INSERT INTO `logs` (pet_id, description, status) VALUES 
(1, 'has high temperature', 'sick')
(2, 'has a broken leg', 'sick'),
(1, 'temparature normal', 'healthy'),
(2, 'leg healed', 'healthy'),
(4, 'bacteria found', 'sick'),
(5, 'has a broken leg', 'sick');