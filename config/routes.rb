Rails.application.routes.draw do

  root to:'index#index'

  resources :users
  resources :pins
  resources :contacts

  get '/login', to: 'sessions#new', as: 'login'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#delete', as: 'logout'

  get '/map', to: 'pins#index'
  post '/map', to: 'pins#create'

  get '/rights', to: 'rights#index'

  post '/alert', to: 'twilio#trigger_sms_alerts', as: 'alert'

end
