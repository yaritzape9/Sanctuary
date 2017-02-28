require 'twilio-ruby'

class TwilioController < ApplicationController

  def trigger_sms_alerts
    alert_message = "current_user.alert_msg"
    contacts = current_user.contacts

    contacts.each do |contact|
      begin
        phone_number = contact.phone_num
        send_message(phone_number, alert_message)
        p "it works"
        flash[:success] = "Messages sent."
      rescue
        send_message(phone_number, alert_message)
        p "failure!"
        flash[:alert] = 'Something when wrong.'
      end
  end
  redirect_to rights_path
end
private

  def send_message(number, alert)
    twilio_number = ENV['TWILIO_NUMBER']
    p twilio_number
    p ENV['TWILIO_ACCOUNT_SID']
    p ENV['TWILIO_AUTH_TOKEN']
    client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])


    client.messages.create(
      from: twilio_number,
      to: number,
      body: alert
    )
  end
end
