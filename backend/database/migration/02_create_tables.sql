----------------------------------------------------------------------------
-- IBZ TIAE5-ZH Webtechnologie 3 Case-Study                               --
----------------------------------------------------------------------------
-- Autoren:                                                               -- 
-- Jennifer Mentner                                                       --
-- André Glaztl                                                           --
-- Sven Gehring                                                           --
-- Dardan Ahmeti                                                          --
----------------------------------------------------------------------------
-- SQL Skript zur Erstellen der Datenbank für das Hotelreservationssystem
----------------------------------------------------------------------------
--                                                                        --
--                                                                        --
-- 05.12.2020 läuft                                                       --
----------------------------------------------------------------------------


-- Es soll immmer die Datenbank "Hotelreservationssystem" verwendet werden

USE Hotelreservationsystem;

----------------------------------------------------------------------------
-- Tabellen erstellen                                                     --
----------------------------------------------------------------------------

-- Tabelle Anrede erstellen mit ID und einem Text 

CREATE TABLE title (
    id INT AUTO_INCREMENT,
    designation VARCHAR(20) NULL,
    PRIMARY KEY (id)
);


-- Tabelle Land erstellen mit Isocode als PK und Name

CREATE TABLE country (
    isocode VARCHAR(4),
    designation VARCHAR(255) NOT NULL,
    PRIMARY KEY (isocode)
);

-- Tabelle ort erstellen 

CREATE TABLE city (
    id INT AUTO_INCREMENT,
    isocode VARCHAR(4),
    postcode INT NOT NULL,
    cityname VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (isocode) REFERENCES country(isocode)
);

-- Tabelle strasse erstellen

CREATE TABLE street (
    id INT AUTO_INCREMENT,
    city_id INT NOT NULL,
    streetname VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (city_id) REFERENCES city(id)
);

-- Tabelle adresse erstellen

CREATE TABLE address (
    id INT AUTO_INCREMENT,
    street_id INT NOT NULL,
    housenumber INT NOT NULL,
    deleted BIT DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (street_id) REFERENCES street(id)
);

-- Tabelle benutzer erstellen

CREATE TABLE user (
    id INT AUTO_INCREMENT,
    title_id INT NOT NULL,
    contact_address_id INT NOT NULL,
    billing_address_id INT  NULL,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (title_id) REFERENCES title(id),
	FOREIGN KEY (contact_address_id) REFERENCES address(id),
    FOREIGN KEY (billing_address_id) REFERENCES address(id),

    CONSTRAINT u_user_email UNIQUE(email)
);

-- Tabelle zahlungsart erstellen

CREATE TABLE payment (
    id INT AUTO_INCREMENT,
    designation VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabelle ausstattung erstellen

CREATE TABLE equipment (
    id INT AUTO_INCREMENT,
    designation VARCHAR(255),
    PRIMARY KEY (id)
);

-- Tabelle preisklasse erstellen

CREATE TABLE pricerange (
    id INT AUTO_INCREMENT,
    designation VARCHAR(255),
    PRIMARY KEY (id)
);

-- Tabelle zimmertyp erstellen

CREATE TABLE room (
    id INT AUTO_INCREMENT,
    equipment_id INT NOT NULL,
    pricerange_id INT NOT NULL,
    roomnumbers INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (equipment_id) REFERENCES equipment(id),
    FOREIGN KEY (pricerange_id) REFERENCES pricerange(id)
);

-- Tabelle hotel erstellen

CREATE TABLE hotel (
    id INT AUTO_INCREMENT,
    address_id INT NOT NULL,
    room_id INT NOT NULL,
    designation VARCHAR(255) NOT NULL,
    star INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (address_id) REFERENCES address(id),
    FOREIGN KEY (room_id) REFERENCES room(id)
);

-- Tabelle angebot erstellen

CREATE TABLE offer (
    id INT AUTO_INCREMENT,
    room_id INT NOT NULL,
    hotel_id INT NOT NULL,
    validitystart DATE NOT NULL,
    validityend DATE NOT NULL,
    price FLOAT NOT NULL,
    PRIMARY KEY (id),
	FOREIGN KEY (room_id) REFERENCES room(id),
    FOREIGN KEY (hotel_id) REFERENCES hotel(id)
);

-- Tabelle hotelkunde erstellen

CREATE TABLE hotelcustomer (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    payment_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (payment_id) REFERENCES payment(id)
);

-- Tabelle buchung erstellen

CREATE TABLE reservation (
    id INT AUTO_INCREMENT,
    offer_id INT  NOT NULL,
    address_id INT NOT NULL,
    hotelcustomer_id INT  NOT NULL,
    reservation_nr INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (offer_id) REFERENCES offer(id),
    FOREIGN KEY (address_id) REFERENCES address(id),
    FOREIGN KEY (hotelcustomer_id) REFERENCES hotelcustomer(id)
);

-- Tabelle bewertung erstellen

CREATE TABLE rating (
    id INT AUTO_INCREMENT,
    reservation_id INT  NOT NULL,
    designation VARCHAR(255) NOT NULL,
    score INT NULL,
    publish BIT DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (reservation_id) REFERENCES reservation(id)
);

-- Tabelle medien erstellen

 CREATE TABLE media (
     id INT AUTO_INCREMENT,
     reservation_id INT  NULL,
     offer_id INT  NULL,
     designation VARCHAR(255) NULL,
     PRIMARY KEY (id),
	 FOREIGN KEY (reservation_id) REFERENCES reservation(id),
     FOREIGN KEY  (offer_id) REFERENCES offer(id)
 );

