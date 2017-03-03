class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  include SessionsHelper

  before_action :set_locale

  def set_locale
    if current_user && current_user.lang_pref
      I18n.locale = current_user.lang_pref
    elsif cookies[:lang_pref]
      I18n.locale = cookies[:lang_pref].to_sym
    end
  end
end
