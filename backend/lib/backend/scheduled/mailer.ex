defmodule Backend.Scheduled.Mailer do
  require Logger

  def send_unsent_media do
    # TODO: Actually send e-mails
    # This would fetch all unsent emails from the database and
    # use the bamboo_smtp adapter to send them via a mail server
    Logger.info("DUMMY: sending n emails to users...")
  end
end
