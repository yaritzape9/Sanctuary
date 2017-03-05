class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_action :set_locale

  def set_locale
    if current_user && current_user.lang_pref
      I18n.locale = current_user.lang_pref
    elsif cookies[:lang_pref]
      I18n.locale = cookies[:lang_pref].to_sym
    end
  end

  protected
  def configure_permitted_parameters
   devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password, :password_confirmation])
   devise_parameter_sanitizer.permit(:account_update, keys: [:email, :password, :password_confirmation, :current_password])
  end
end
