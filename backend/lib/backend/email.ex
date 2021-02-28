defmodule Backend.Email do
  import Bamboo.Email

  def welcome_email(target) do
    new_email(
      to: target,
      from: "cbrxde@gmail.com",
      subject: "Welcome to the BookYourStayToday",
      html_body:
        html_email("We are realy happy you joined us.<br />Let's start your first trip", true),
      text_body: "We are realy happy you joined us. Let's start your first trip"
    )
  end

  def promo_email(target, _promo) do
    # TODO: Actually include promo PDF once we launch

    new_email(
      to: target,
      from: "cbrxde@gmail.com",
      subject: "Promotional message from BookYourStayToday",
      html_body:
        html_email(
          "A hotel that you have recently booked through BookYourStayToday has some new, awesome promo for you.<br />(This is currently just a placeholder, there is no actual information attached)",
          true
        ),
      text_body:
        "A hotel that you have recently booked through BookYourStayToday has some new, awesome promo for you. (This is currently just a placeholder, there is no actual information attached)"
    )
  end

  def booking_confirmation_email(target) do
    new_email(
      to: target,
      from: "cbrxde@gmail.com",
      subject: "Booking confirmation from BookYourStayToday",
      html_body:
        html_email(
          "Thank your for booking a stay via BookYourStayToday. Attached, you find your booking confirmation, as well as additional information provided by your hotel.<br />(This is currently just a placeholder, there is no actual information attached)",
          false
        ),
      text_body:
        "Thank your for booking a stay via BookYourStayToday. Attached, you find your booking confirmation, as well as additional information provided by your hotel. (This is currently just a placeholder, there is no actual information attached)"
    )
  end

  def bad_rating_email(target, hotel_id) do
    new_email(
      to: target,
      from: "cbrxde@gmail.com",
      subject: "Your hotel got a bad rating on BookYourStayToday",
      html_body:
        html_email(
          "One of your hotels got a bad rating on BookYourStayToday.<br />Check out its reviews <a href=\"https://tiae5.cybrox.eu/hotels/#{
            hotel_id
          }\">here</a>",
          false
        ),
      text_body:
        "One of your hotels got a bad rating on BookYourStayToday.<br />Check out its reviews at https://tiae5.cybrox.eu/hotels/#{
          hotel_id
        }"
    )
  end

  defp html_email(text, show_hotels) do
    hotelreel =
      if show_hotels do
        """

          <table>
          <thead>
            <tr>
              <th><img src="https://placedog.net/640/480?id=1" /></th>
              <th><img src="https://placedog.net/640/480?id=2" /></th>
              <th><img src="https://placedog.net/640/480?id=3" /></th>
              <th><img src="https://placedog.net/640/480?id=4" /></th>
            </tr>
          </thead>
        </table>
        """
      else
        ""
      end

    """
    <!doctype html>

    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <style>
        body{margin:0;padding:0}*{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif}hr{margin:20px 0}header{padding:20px}.container{padding:20px}img{max-width:50%;height:auto;vertical-align:middle;border-style:none;border-radius:.25rem!important}
      </style>
    </head>
      <body>
        <header style="background-color: #343a40; padding-top: 3rem; padding-bottom: 3rem;">
          <h1 style="color: white;">BookYourStayToday</h1>
        </header>
          <div class="container">
            <h3>
              Welcome
            </h3>
            <hr />
            <p style="font-size: large;">
              #{text}
            </p>
            <p></p>
            #{hotelreel}
            <hr />
            <a href="https://tiae5.cybrox.eu/" style="color: blueviolet; font-size: larger; ">BookYourStayToday</a>
            <hr />

          </div>

        <footer style="background-color: cornflowerblue; height: 50px; margin-top: 10px"></footer>
      </body>
    </html>
    """
  end
end
