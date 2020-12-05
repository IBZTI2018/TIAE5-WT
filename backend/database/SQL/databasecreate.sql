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

USE Hotelreservationssystem;

----------------------------------------------------------------------------
-- Tabellen erstellen                                                     --
----------------------------------------------------------------------------

-- Tabelle Anrede erstellen mit ID und einem Text 

CREATE TABLE anrede (
    id INT PRIMARY KEY IDENTITY(1,1),
    bezeichnung VARCHAR(20) NULL
);


-- Tabelle Land erstellen mit Isocode als PK und Name

CREATE TABLE land (
    isocode VARCHAR(4) PRIMARY KEY,
    bezeichnung VARCHAR(255) NOT NULL
);


-- Tabelle ort erstellen 

CREATE TABLE ort (
    id INT PRIMARY KEY IDENTITY(1,1),
    isocode VARCHAR(4) FOREIGN KEY REFERENCES land(ioscode) NOT NULL,
    plz INT NOT NULL,
    ortname VARCHAR(255) NOT NULL
);

--Tabelle strasse erstellen

CREATE TABLE strasse (
    id INT PRIMARY KEY IDENTITY(1,1),
    ort_id INT FOREIGN KEY REFERENCES ort(id) NOT NULL,
    strassenname VARCHAR(255) NOT NULL
);

--Tabelle adresse erstellen

CREATE TABLE adresse (
    id INT PRIMARY KEY IDENTITY(1,1),
    strasse_id INT FOREIGN KEY REFERENCES strasse(id) NOT NULL,
    hausnummer INT NOT NULL,
    geloeschte BIT DEFAULT 0
);

-- Tabelle benutzer erstellen

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
);

-- Tabelle zahlungsart erstellen

CREATE TABLE zahlungsart (
    id INT PRIMARY KEY IDENTITY(1,1),
    bezeichnung VARCHAR(255) NOT NULL
);

-- Tabelle ausstattung erstellen

CREATE TABLE ausstattung (
    id INT PRIMARY KEY IDENTITY(1,1),
    bezeichnung VARCHAR(255)
);

--Tabelle preisklasse erstellen

CREATE TABLE preisklasse (
    id INT PRIMARY KEY IDENTITY(1,1),
    bezeichnung VARCHAR(255)
);

-- Tabelle zimmertyp erstellen

CREATE TABLE zimmertyp (
    id INT PRIMARY KEY IDENTITY(1,1),
    ausstattung_id INT FOREIGN KEY REFERENCES ausstattung(id) NOT NULL,
    preisklasse_id INT FOREIGN KEY REFERENCES preisklasse(id) NOT NULL,
    anzahl_zimmer INT NULL
);

--Tabelle hotel erstellen

CREATE TABLE hotel (
    id INT PRIMARY KEY IDENTITY(1,1),
    adresse_id INT FOREIGN KEY REFERENCES adresse(id) NOT NULL,
    zimmertyp_id INT FOREIGN KEY REFERENCES zimmertyp(id) NOT NULL,
    bezeichnung VARCHAR(255) NOT NULL,
    stern INT NULL
);

--Tabelle angebot erstellen

CREATE TABLE angebot (
    id INT PRIMARY KEY IDENTITY(1,1),
    zimmertyp_id INT FOREIGN KEY REFERENCES zimmertyp(id) NOT NULL,
    hotel_id INT FOREIGN KEY REFERENCES hotel(id) NOT NULL,
    anreisedatum DATE NOT NULL,
    abreisedatum DATE NOT NULL,
    preis FLOAT NOT NULL

);

-- Tabelle hotelkunde erstellen

CREATE TABLE hotelkunde (
    id INT PRIMARY KEY IDENTITY(1,1),
    benutzer_id INT FOREIGN KEY REFERENCES benutzer(id) NOT NULL,
    zahlungsart_id INT FOREIGN KEY REFERENCES zahlungsart(id) NOT NULL
);

-- Tabelle buchung erstellen

CREATE TABLE buchung (
    id INT PRIMARY KEY IDENTITY(1,1),
    angebot_id INT FOREIGN KEY REFERENCES angebot(id) NOT NULL,
    adresse_id INT FOREIGN KEY REFERENCES adresse(id) NOT NULL,
    hotelkunde_id INT FOREIGN KEY REFERENCES hotelkunde(id) NOT NULL,
    buchung_nr INT NOT NULL,
    anreisedatum DATE NOT NULL,
    abreisedatum DATE NOT NULL
);

--Tabelle bewertung erstellen

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
 );



