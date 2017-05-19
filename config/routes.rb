Rails.application.routes.draw do

  root to:'index#index'

  resources :users
  resources :pins
  resources :contacts

  get '/login', to: 'sessions#new', as: 'login'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#delete', as: 'logout'

  post '/languages', to: 'users#set_language', as: 'languages'

  get '/map', to: 'pins#index'
  post '/map', to: 'pins#create'
  post '/upvote', to: 'pins#new_upvote'
  post '/downvote', to: 'pins#new_downvote'
  delete '/upvote', to: 'pins#delete_upvote'
  delete '/downvote', to: 'pins#delete_downvote'

  get '/rights', to: 'rights#index'

  post '/alert', to: 'twilio#trigger_sms_alerts', as: 'alert'

end
