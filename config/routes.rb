Rails.application.routes.draw do

  devise_for :users, module: "users", controllers: {
    sessions: 'users/sessions'
  }

  root to:'index#index'

  resources :users
  resources :pins
  resources :contacts

  # get '/login', to: 'sessions#new', as: 'login'
  # post '/login', to: 'sessions#create'
  # get '/logout', to: 'sessions#delete', as: 'logout'

  post '/languages', to: 'users#set_language', as: 'languages'

  get '/map', to: 'pins#index'
  post '/map', to: 'pins#create'

  get '/rights', to: 'rights#index'

  post '/alert', to: 'twilio#trigger_sms_alerts', as: 'alert'



end
