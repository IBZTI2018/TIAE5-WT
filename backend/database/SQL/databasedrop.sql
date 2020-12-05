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
-- Löschen der Tabellen                                                   --
----------------------------------------------------------------------------

DROP TABLE medien;
DROP TABLE bewertung;
DROP TABLE buchung;
DROP TABLE hotelkunde;
DROp TABLE angebot;
DROP TABLE hotel;
DROP TABLE zimmertyp;
DROP TABLE preisklasse;
DROP TABLE ausstattung;
DROP TABLE benutzer;
DROP TABLE zahlungsart;
DROP TABLE adresse;
DROP TABLE strasse;
DROP TABLE ort;
DROP TABLE land;
DROP TABLE anrede;
