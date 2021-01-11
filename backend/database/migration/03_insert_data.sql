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
-- 16.12.2020 läuft                                                       --
----------------------------------------------------------------------------


-- Es soll immmer die Datenbank "Hotelreservationssystem" verwendet werden

USE Hotelreservationsystem;

----------------------------------------------------------------------------
-- Beispiel Daten in Datenbank einfügen                                   --
----------------------------------------------------------------------------

-- Beispieldaten in Tabelle Anrede einfügen

INSERT INTO title (id, designation) VALUES
(1, 'Frau'),
(2, 'Mann'),
(3, 'nicht definiert');

-- Beispieldaten in Tabelle Preisklasse einfügen

INSERT INTO pricerange (id, designation ) VALUES
(1, 'Luxus'),
(2, 'Einfach'),
(3, 'Mittel'),
(4, 'Gruppe');

-- Beispieldaten in Tabelle Zahlungsart einfügen

INSERT INTO payment (id, designation) VALUES
(1, 'Twint'),
(2, 'Kreditkarte'),
(3, 'Rechnung'),
(4, 'Bar'),
(5, 'PayPal');

-- Beispieldaten in Tabelle Zimmerausstattung einfügen

INSERT INTO roomequipment (id, designation) VALUES
(1, 'King-Size-Bett'),
(2, 'Doppel-Bett'),
(3, 'Balkon'),
(4, 'Wasserkocher'),
(5, 'Minibar'),
(6, 'Schrank'),
(7, 'Safe'),
(8, 'Heizung'),
(9, 'Sofa'),
(10, 'Schreibtisch'),
(11, 'Kamin'),
(12, 'TV'),
(13, 'Telefon'),
(14, 'Radio'),
(15, 'Weckservice'),
(16, 'Handtücher'),
(17, 'Hausschuhe'),
(18, 'Haartrockner'),
(19, 'WC'),
(20, 'Bademantel'),
(21, 'Badewanne oder Dusche'),
(22, 'Kostenlose Pflegeprodukte'),
(23, 'Bergblick');

--Beispieldaten in Tabelle Hotelausstattung einfügen

INSERT INTO hotelequipment VALUES 
(1, 'WLAN inklusive'),
(2, 'all inclusiv'),
(3, 'Frühstück'),
(4, 'Schliessfächer'),
(5, 'Parkplatz'),
(6, 'Sauna'),
(7, 'Fitness'),
(8, 'Deutsch'),
(9, 'Englisch'),
(10, 'Französisch'),
(11, 'Spanisch'),
(12, 'Italienisch'),
(13, 'Portugiesisch'),
(14, 'Skiaufbewahrung'),
(15, 'Terrasse'),
(16, 'Waschsalon/Wäscheservice'),
(17, 'Aufzug'),
(18, 'Shuttleservice'),
(19, 'Familienzimmer'),
(20, 'Beistellbetten'),
(21, 'Nichtraucherzimmer'),
(22, 'Bar'),
(23, 'Restaurant'),
(24, 'Spa & Wellnesscenter'),
(25, 'Haustiere erlaubt');

-- Beispieldaten in Tabelle Länder einfügen

INSERT INTO country (isocode, countryname) VALUES
('EGY','Ägypten'),
('AUS','Australien'),
('BAH','Bahamas'),
('BEL','Belgien'),
('BRA','Brasilien'),
('BUL','Bulgarien'),
('BIH','Bosnien'),
('CHI','Chile'),
('CHN','China'),
('CRC','Costa Rica'),
('DEN','Dänemark'),
('GER','Deutschland'),
('DOM','Dominikanische Republik'),
('FRA','Frankreich'),
('FIN','Finnland'),
('GRE','Griechenland'),
('HKG','Hongkong'),
('IND','Indien'),
('IRL','Irland'),
('ISL','Island'),
('ITA','Italien'),
('INA','Indonesien'),
('JAM','Jamaika'),
('JPN','Japan'),
('CAN','Kanada'),
('QAT','Katar'),
('CAM','Kambodscha'),
('COL','Kolumbien'),
('PRK','Nordkorea'),
('KOR','Südkorea'),
('KOS','Kosovo'),
('CRO','Kroatien'),
('CUB','Kuba'),
('LAT','Lettland'),
('LIE','Liechtenstein'),
('LTU','Litauen'),
('LUX','Luxemburg'),
('MAD','Madagaskar'),
('MDV','Malediven'),
('MLT','Malta'),
('MAR','Marokko'),
('MRI','Mauritius'),
('MEX','Mexiko'),
('MON','Monaco'),
('MNE','Montenegro'),
('MGL','Mongolei'),
('NEP','Nepal'),
('NZL','Neuseeland'),
('NED','Niederlande'),
('NOR','Norwegen'),
('AUT','Österreich'),
('PAN','Panama'),
('PAR','Paraguay'),
('PER','Peru'),
('PHI','Philippinen'),
('POL','Polen'),
('POR','Portugal'),
('PUR','Puerto Rico'),
('ROU','Rumänien'),
('RUS','Russland'),
('SWE','Schweden'),
('SUI','Schweiz'),
('SRB','Serbien'),
('SEY','Seychellen'),
('ZIM','Simbabwe'),
('SGP','Singapur'),
('SVK','Slovakei'),
('SLO','Slowenien'),
('ESP','Spanien'),
('SRI','Sri Lanka'),
('RSA','Südafrika'),
('THA','Thailand'),
('CZE','Tschechien'),
('TUN','Tunesien'),
('TUR','Türkei'),
('UKR','Ukraine'),
('HUN','Ungarn'),
('URU','Uruguay'),
('VEN','Venezuela'),
('UAE','Vereinigte Arabische Emirate'),
('USA','Vereinigte Staaten'),
('GBR','Vereinigtes Königreich'),
('VIE','Vietnam'),
('CYP','Zypern');

-- Beispieldaten für Städte

INSERT INTO city (isocode, postcode, cityname) VALUES
('SUI',8000, 'Zürich'),
('SUI',7000, 'Chur');

-- Beispieldaten für Adressen

INSERT INTO street (streetname, city_id) VALUES
('Bahnhofstrasse', 1),
('Dorfstrasse', 2);

INSERT INTO address (street_id, housenumber) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2);


-- Beispieldaten für Benutzer
INSERT INTO user (title_id, contact_address_id, billing_address_id, lastname, firstname, email, password, reg_date)
VALUES
    (1, 1, 1, 'Mentner', 'Jennifer', 'jennifer.mentner@student.ibz.ch', PASSWORD('password123'), NOW()),
    (2, 3, 3, 'Glatzl', 'André', 'andre.glatzl@student.ibz.ch', PASSWORD('password123'), NOW()),
    (2, 1, 1, 'Gehring', 'Sven', 'sven.gehring@student.ibz.ch', PASSWORD('password123'), NOW()),
    (2, 1, 1, 'Ahmeti', 'Dardan', 'dardan.ahmeti@student.ibz.ch', PASSWORD('password123'), NOW())
;