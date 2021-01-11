----------------------------------------------------------------------------
-- IBZ TIAE5 - ZH Webtechnologie 3 Case - Study                           --
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
-- View erstellen für einfachere Bedienung                                --
----------------------------------------------------------------------------


-- View erstellung für die Übersicht einer Reservation

Create View reservation_overview AS
    SELECT 
        title.designation AS title,
        user.firstname,
        user.lastname,
        reservation.reservation_nr,
        reservation.check_in_date,
        reservation.check_out_date,
        offer.price,
        hotel.hotelname,
        room.id AS room_id
    FROM user
        INNER JOIN title
            ON title.id = user.title_id
        INNER JOIN reservation
            ON reservation.id = reservation.offer_id
        INNER JOIN offer
            ON offer.id = offer.price
        INNER JOIN hotel
            ON hotel.id = hotel.hotelname
        INNER JOIN room
            ON room.id = offer.room_id;


-- View erstellung für die Übersicht der Hotelkunden

 CREATE VIEW hotelcustomer_overview AS
    SELECT
        hotelcustomer.id,
        title.designation as title,
        user.firstname,
        user.lastname,
        street.streetname,
        city.postcode,
        city.cityname,
        country.isocode,
        address.housenumber
    FROM user
        INNER JOIN hotelcustomer
            ON hotelcustomer.user_id
        INNER JOIN title
            ON title.id = user.title_id
        INNER JOIN street
            ON street.id = street.streetname
        INNER JOIN city
            ON city.id = city.postcode
                       = city.cityname
        INNER JOIN country
            ON country.isocode 
        INNER JOIN address
            ON address.id = address.housenumber;

-- View erstellung für die Übersicht der Hotelmiitarbeiter

 CREATE VIEW staff_overview AS
    SELECT
        title.designation AS title,
        staff.id,
        staff.designation,
        user.firstname,
        user.lastname,
        hotel.hotelname,
        street.streetname,
        city.postcode,
        city.cityname,
        country.isocode,
        address.housenumber
    FROM user
        INNER JOIN title
            ON title.id = user.title_id
        INNER JOIN staff
            ON staff.id = staff.id
                        = staff.designation
        INNER JOIN hotel
            ON hotel.id = hotel.hotelname
        INNER JOIN street
            ON street.id = street.streetname
        INNER JOIN city
            ON city.id = city.postcode
                       = city.cityname
        INNER JOIN country
            ON country.isocode 
        INNER JOIN address
            ON address.id = address.housenumber;

--- View erstellen für die Üebrsicht der Ausstattung

CREATE VIEW equipment_overview AS
    SELECT
        hotel.hotelname,
        hotelequipment.designation AS hotelequipment,
        roomequipment.designation AS roomequipment
    FROM hotel
        INNER JOIN roomequipment
            ON roomequipment.designation
        INNER JOIN hotelequipment
            ON hotelequipment.designation;
