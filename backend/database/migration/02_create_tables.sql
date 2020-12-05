----------------------------------------------------------------------------
-- IBZ TIAE5-ZH Webtechnologie 3 Case-Study                               --
----------------------------------------------------------------------------
--Autoren:                                                                -- 
--Jennifer Mentner                                                        --
--André Glaztl                                                            --
--Sven Gehring                                                            --
--Dardan Ahmeti                                                           --
----------------------------------------------------------------------------
-- SQL Skript zur Erstellen der Datenbank für das Hotelreservationssystem
----------------------------------------------------------------------------
--                                                                        --
--                                                                        --
--                                                                        --
----------------------------------------------------------------------------


--Es soll immmer die Datenbank "Hotelreservationssystem" verwendet werden

USE Hotelreservationsystem;

----------------------------------------------------------------------------
-- Tabellen erstellen                                                     --
----------------------------------------------------------------------------

-- Tabelle Anrede erstellen mit ID und einem Text 

CREATE TABLE title (
    id INT PRIMARY KEY IDENTITY(1,1),
    designation VARCHAR(20) NULL
);


-- Tabelle Land erstellen mit Isocode als PK und Name

CREATE TABLE country (
    isocode VARCHAR(4) PRIMARY KEY,
    designation VARCHAR(255) NOT NULL
);


-- Tabelle ort erstellen 

CREATE TABLE city (
    id INT PRIMARY KEY IDENTITY(1,1),
    isocode VARCHAR(4) FOREIGN KEY REFERENCES country(ioscode) NOT NULL,
    postcode INT NOT NULL,
    cityname VARCHAR(255) NOT NULL
);

--Tabelle strasse erstellen

CREATE TABLE street (
    id INT PRIMARY KEY IDENTITY(1,1),
    city_id INT FOREIGN KEY REFERENCES city(id) NOT NULL,
    streetname VARCHAR(255) NOT NULL
);

--Tabelle adresse erstellen

CREATE TABLE address (
    id INT PRIMARY KEY IDENTITY(1,1),
    street_id INT FOREIGN KEY REFERENCES street(id) NOT NULL,
    housenumber INT NOT NULL,
    deleted BIT DEFAULT 0
);

-- Tabelle benutzer erstellen

CREATE TABLE user (
    id INT PRIMARY KEY IDENTITY(1,1),
    title_id INT FOREIGN KEY REFERENCES title(id) NOT NULL,
    address_id INT FOREIGN KEY REFERENCES address(id) NOT NULL,
    billing_address_id INT FOREIGN KEY REFERENCES address(id) NULL,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

    CONSTRAINT u_user_email UNIQUE(email)
);

-- Tabelle zahlungsart erstellen

CREATE TABLE payment (
    id INT PRIMARY KEY IDENTITY(1,1),
    designation VARCHAR(255) NOT NULL
);

-- Tabelle ausstattung erstellen

CREATE TABLE equipment (
    id INT PRIMARY KEY IDENTITY(1,1),
    designation VARCHAR(255)
);

--Tabelle preisklasse erstellen

CREATE TABLE pricerange (
    id INT PRIMARY KEY IDENTITY(1,1),
    designation VARCHAR(255)
);

-- Tabelle zimmertyp erstellen

CREATE TABLE room (
    id INT PRIMARY KEY IDENTITY(1,1),
    equipment_id INT FOREIGN KEY REFERENCES equipment(id) NOT NULL,
    pricerange_id INT FOREIGN KEY REFERENCES pricerange(id) NOT NULL,
    roomnumbers INT NULL
);

--Tabelle hotel erstellen

CREATE TABLE hotel (
    id INT PRIMARY KEY IDENTITY(1,1),
    address_id INT FOREIGN KEY REFERENCES address(id) NOT NULL,
    room_id INT FOREIGN KEY REFERENCES room(id) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    star INT NULL
);

--Tabelle angebot erstellen

CREATE TABLE offer (
    id INT PRIMARY KEY IDENTITY(1,1),
    room_id INT FOREIGN KEY REFERENCES room(id) NOT NULL,
    hotel_id INT FOREIGN KEY REFERENCES hotel(id) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    price FLOAT NOT NULL

);

-- Tabelle hotelkunde erstellen

CREATE TABLE hotelcustomer (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT FOREIGN KEY REFERENCES user(id) NOT NULL,
    payment_id INT FOREIGN KEY REFERENCES payment(id) NOT NULL
);

-- Tabelle buchung erstellen

CREATE TABLE reservation (
    id INT PRIMARY KEY IDENTITY(1,1),
    offer_id INT FOREIGN KEY REFERENCES offer(id) NOT NULL,
    address_id INT FOREIGN KEY REFERENCES address(id) NOT NULL,
    hotelcustomer_id INT FOREIGN KEY REFERENCES hotelcustomer(id) NOT NULL,
    reservation_nr INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL
);

--Tabelle bewertung erstellen

CREATE TABLE rating (
    id INT PRIMARY KEY IDENTITY(1,1),
    reservation_id INT FOREIGN KEY REFERENCES reservation(id) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    score INT NULL,
    publish BIT DEFAULT 0
);

-- Tabelle medien erstellen
 CREATE TABLE media (
     id INT PRIMARY KEY IDENTITY(1,1),
     reservation_id INT FOREIGN KEY REFERENCES reservation(id) NULL,
     offer_id INT FOREIGN KEY REFERENCES offer(id) NULL,
     designation VARCHAR(255) NULL
 );



