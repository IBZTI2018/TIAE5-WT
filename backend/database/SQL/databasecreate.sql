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

<<<<<<< Updated upstream
USE Hotelreservationssystem;
=======
USE hotelreservationsystem;
>>>>>>> Stashed changes

----------------------------------------------------------------------------
-- Tabellen erstellen                                                     --
----------------------------------------------------------------------------

-- Tabelle Anrede erstellen mit ID und einem Text 

<<<<<<< Updated upstream
CREATE TABLE anrede (
    id INT PRIMARY KEY IDENTITY(1,1),
    bezeichnung VARCHAR(20) NULL
=======
CREATE TABLE title (
    id INT PRIMARY KEY IDENTITY(1,1),
    designation VARCHAR(20) NULL
>>>>>>> Stashed changes
);


-- Tabelle Land erstellen mit Isocode als PK und Name

<<<<<<< Updated upstream
CREATE TABLE land (
    isocode VARCHAR(4) PRIMARY KEY,
    bezeichnung VARCHAR(255) NOT NULL
=======
CREATE TABLE country (
    isocode VARCHAR(4) PRIMARY KEY,
    designation VARCHAR(255) NOT NULL
>>>>>>> Stashed changes
);


-- Tabelle ort erstellen 

<<<<<<< Updated upstream
CREATE TABLE ort (
    id INT PRIMARY KEY IDENTITY(1,1),
    isocode VARCHAR(4) FOREIGN KEY REFERENCES land(ioscode) NOT NULL,
    plz INT NOT NULL,
    ortname VARCHAR(255) NOT NULL
=======
CREATE TABLE city (
    id INT PRIMARY KEY IDENTITY(1,1),
    isocode VARCHAR(4) FOREIGN KEY REFERENCES country(ioscode) NOT NULL,
    postcode INT NOT NULL,
    cityname VARCHAR(255) NOT NULL
>>>>>>> Stashed changes
);

--Tabelle strasse erstellen

<<<<<<< Updated upstream
CREATE TABLE strasse (
    id INT PRIMARY KEY IDENTITY(1,1),
    ort_id INT FOREIGN KEY REFERENCES ort(id) NOT NULL,
    strassenname VARCHAR(255) NOT NULL
=======
CREATE TABLE street (
    id INT PRIMARY KEY IDENTITY(1,1),
    city_id INT FOREIGN KEY REFERENCES city(id) NOT NULL,
    streetname VARCHAR(255) NOT NULL
>>>>>>> Stashed changes
);

--Tabelle adresse erstellen

<<<<<<< Updated upstream
CREATE TABLE adresse (
    id INT PRIMARY KEY IDENTITY(1,1),
    strasse_id INT FOREIGN KEY REFERENCES strasse(id) NOT NULL,
    hausnummer INT NOT NULL,
    geloeschte BIT DEFAULT 0
=======
CREATE TABLE address (
    id INT PRIMARY KEY IDENTITY(1,1),
    street_id INT FOREIGN KEY REFERENCES street(id) NOT NULL,
    housenumber INT NOT NULL,
    deleted BIT DEFAULT 0
>>>>>>> Stashed changes
);

-- Tabelle benutzer erstellen

<<<<<<< Updated upstream
CREATE TABLE benutzer (
    id INT PRIMARY KEY IDENTITY(1,1),
    anrede_id INT FOREIGN KEY REFERENCES anrede(id) NOT NULL,
    adresse_id INT FOREIGN KEY REFERENCES adresse(id) NOT NULL,
    Rechnungs_adresse_id INT FOREIGN KEY REFERENCES adresse(id) NULL,
    nachname VARCHAR(255) NOT NULL,
    vorname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwort VARCHAR(255) NOT NULL,

    CONSTRAINT u_benutzer_email UNIQUE(email)
=======
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
>>>>>>> Stashed changes
);

-- Tabelle zahlungsart erstellen

<<<<<<< Updated upstream
CREATE TABLE zahlungsart (
    id INT PRIMARY KEY IDENTITY(1,1),
    bezeichnung VARCHAR(255) NOT NULL
=======
CREATE TABLE payment (
    id INT PRIMARY KEY IDENTITY(1,1),
    designation VARCHAR(255) NOT NULL
>>>>>>> Stashed changes
);

-- Tabelle ausstattung erstellen

<<<<<<< Updated upstream
CREATE TABLE ausstattung (
    id INT PRIMARY KEY IDENTITY(1,1),
    bezeichnung VARCHAR(255)
=======
CREATE TABLE equipment (
    id INT PRIMARY KEY IDENTITY(1,1),
    designation VARCHAR(255)
>>>>>>> Stashed changes
);

--Tabelle preisklasse erstellen

<<<<<<< Updated upstream
CREATE TABLE preisklasse (
    id INT PRIMARY KEY IDENTITY(1,1),
    bezeichnung VARCHAR(255)
=======
CREATE TABLE pricerange (
    id INT PRIMARY KEY IDENTITY(1,1),
    designation VARCHAR(255)
>>>>>>> Stashed changes
);

-- Tabelle zimmertyp erstellen

<<<<<<< Updated upstream
CREATE TABLE zimmertyp (
    id INT PRIMARY KEY IDENTITY(1,1),
    ausstattung_id INT FOREIGN KEY REFERENCES ausstattung(id) NOT NULL,
    preisklasse_id INT FOREIGN KEY REFERENCES preisklasse(id) NOT NULL,
    anzahl_zimmer INT NULL
=======
CREATE TABLE room (
    id INT PRIMARY KEY IDENTITY(1,1),
    equipment_id INT FOREIGN KEY REFERENCES equipment(id) NOT NULL,
    pricerange_id INT FOREIGN KEY REFERENCES pricerange(id) NOT NULL,
    roomnumbers INT NULL
>>>>>>> Stashed changes
);

--Tabelle hotel erstellen

CREATE TABLE hotel (
    id INT PRIMARY KEY IDENTITY(1,1),
<<<<<<< Updated upstream
    adresse_id INT FOREIGN KEY REFERENCES adresse(id) NOT NULL,
    zimmertyp_id INT FOREIGN KEY REFERENCES zimmertyp(id) NOT NULL,
    bezeichnung VARCHAR(255) NOT NULL,
    stern INT NULL
=======
    address_id INT FOREIGN KEY REFERENCES address(id) NOT NULL,
    room_id INT FOREIGN KEY REFERENCES room(id) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    star INT NULL
>>>>>>> Stashed changes
);

--Tabelle angebot erstellen

<<<<<<< Updated upstream
CREATE TABLE angebot (
    id INT PRIMARY KEY IDENTITY(1,1),
    zimmertyp_id INT FOREIGN KEY REFERENCES zimmertyp(id) NOT NULL,
    hotel_id INT FOREIGN KEY REFERENCES hotel(id) NOT NULL,
    anreisedatum DATE NOT NULL,
    abreisedatum DATE NOT NULL,
    preis FLOAT NOT NULL
=======
CREATE TABLE offer (
    id INT PRIMARY KEY IDENTITY(1,1),
    room_id INT FOREIGN KEY REFERENCES room(id) NOT NULL,
    hotel_id INT FOREIGN KEY REFERENCES hotel(id) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    price FLOAT NOT NULL
>>>>>>> Stashed changes

);

-- Tabelle hotelkunde erstellen

<<<<<<< Updated upstream
CREATE TABLE hotelkunde (
    id INT PRIMARY KEY IDENTITY(1,1),
    benutzer_id INT FOREIGN KEY REFERENCES benutzer(id) NOT NULL,
    zahlungsart_id INT FOREIGN KEY REFERENCES zahlungsart(id) NOT NULL
=======
CREATE TABLE hotelcustomer (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT FOREIGN KEY REFERENCES user(id) NOT NULL,
    payment_id INT FOREIGN KEY REFERENCES payment(id) NOT NULL
>>>>>>> Stashed changes
);

-- Tabelle buchung erstellen

<<<<<<< Updated upstream
CREATE TABLE buchung (
    id INT PRIMARY KEY IDENTITY(1,1),
    angebot_id INT FOREIGN KEY REFERENCES angebot(id) NOT NULL,
    adresse_id INT FOREIGN KEY REFERENCES adresse(id) NOT NULL,
    hotelkunde_id INT FOREIGN KEY REFERENCES hotelkunde(id) NOT NULL,
    buchung_nr INT NOT NULL,
    anreisedatum DATE NOT NULL,
    abreisedatum DATE NOT NULL
=======
CREATE TABLE reservation (
    id INT PRIMARY KEY IDENTITY(1,1),
    offer_id INT FOREIGN KEY REFERENCES offer(id) NOT NULL,
    address_id INT FOREIGN KEY REFERENCES address(id) NOT NULL,
    hotelcustomer_id INT FOREIGN KEY REFERENCES hotelcustomer(id) NOT NULL,
    reservation_nr INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL
>>>>>>> Stashed changes
);

--Tabelle bewertung erstellen

<<<<<<< Updated upstream
CREATE TABLE bewertung (
    id INT PRIMARY KEY IDENTITY(1,1),
    buchung_id INT FOREIGN KEY REFERENCES buchung(id) NOT NULL,
    bezeichnung VARCHAR(255) NOT NULL,
    score INT NULL,
    publizieren BIT DEFAULT 0
);

-- Tabelle medien erstellen
 CREATE TABLE medien (
     id INT PRIMARY KEY IDENTITY(1,1),
     buchung_id INT FOREIGN KEY REFERENCES buchung(id) NULL,
     angebot_id INT FOREIGN KEY REFERENCES angebot(id) NULL,
     bezeichnung VARCHAR(255) NULL
=======
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
>>>>>>> Stashed changes
 );



