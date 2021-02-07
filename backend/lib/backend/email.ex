defmodule Backend.Email do
  import Bamboo.Email

  def welcome_email(target) do
    new_email(
      to: target,
      from: "cbrxde@gmail.com",
      subject: "Welcome to the BookYourStayToday",
      html_body: "<strong>Thanks for joining!</strong>",
      text_body: "Thanks for joining!"
    )
  end
end
