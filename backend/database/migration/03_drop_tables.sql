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
-- Löschen der Tabellen                                                   --
----------------------------------------------------------------------------

DROP TABLE media;
DROP TABLE rating;
DROP TABLE reservation;
DROP TABLE hotelcustomer;
DROp TABLE offer;
DROP TABLE hotel;
DROP TABLE room;
DROP TABLE pricerange;
DROP TABLE equipment;
DROP TABLE user;
DROP TABLE payment;
DROP TABLE address;
DROP TABLE street;
DROP TABLE city;
DROP TABLE country;
DROP TABLE title;
