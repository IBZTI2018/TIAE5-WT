defmodule Backend.Scheduled.Mailer do
  require Logger
  require Ecto.Query

  alias Backend.Database
  alias Backend.Schema.Media

  @mails_for_hotel """
    SELECT DISTINCT u.email FROM reservations r
      INNER JOIN offers o ON r.offer_id = o.id
      INNER JOIN hotelrooms h ON o.hotelroom_id = h.id
      INNER JOIN users u ON r.user_id = u.id
        WHERE h.hotel_id = $1;
  """

  def send_unsent_media do
    _ = Logger.info("Scanning promo media table for unsent entries")

    unsent =
      Database.generic_list(Media, %JSONAPI.Config{}, fn query ->
        query |> Ecto.Query.where(sent: ^false)
      end)

    _ = Logger.info("Found #{Enum.count(unsent)} unsent promo entries")

    Enum.each(unsent, &send_promo_media/1)
  end

  defp send_promo_media(promo) do
    Enum.each(get_mails_for_hotel(promo.hotel_id), fn recipient ->
      recipient
      |> Backend.Email.promo_email(promo)
      |> Backend.Mailer.deliver_now()
    end)

    Database.generic_update(Media, promo.id, %{"data" => %{"attributes" => %{"sent" => true}}})
    _ = Logger.info("Sent out promo #{promo.id} and marked as sent!")
  end

  defp get_mails_for_hotel(hotel_id) do
    full_query = String.replace(@mails_for_hotel, "$1", "#{hotel_id}")
    {:ok, %MyXQL.Result{rows: r}} = Ecto.Adapters.SQL.query(Backend.Repo, full_query)
    r |> List.flatten()
  end
end
