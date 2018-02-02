require 'twilio-ruby'

class TwilioController < ApplicationController

  def trigger_sms_alerts
    alert_message = current_user.alert_msg
    contacts = current_user.contacts

    if contacts.empty?
      flash[:alert] = "You have no contacts. Try adding contacts"
    else
        contacts.each do |contact|
          begin
            phone_number = contact.phone_num
            send_message(phone_number, alert_message)
            flash[:success] = "Messages sent."
          rescue
            flash[:alert] = 'Something when wrong.'
          end
        end
    end

  redirect_to rights_path
<<<<<<< HEAD

  end

  private
=======
end
private

>>>>>>> b1f78179f34fb9b5981d436cbac404985c061788
  def send_text_message(number, alert)
    number_to_send_to = params[:number_to_send_to]

    ENV['TWILIO_ACCOUNT_SID']
    ENV['TWILIO_AUTH_TOKEN']
    twilio_phone_number = ENV['TWILIO_NUMBER']

    @twilio_client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])


    @twilio_client.account.sms.messages.create(
      :from => "+1#{twilio_phone_number}",
      :to => number,
      :body => alert
    )
  end
end
