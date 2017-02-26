Rails.application.routes.draw do

  root to:'index#index'

  resources :users

  get '/login', to: 'sessions#new', as: 'login'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#delete', as: 'logout'

  get '/map', to: 'pins#index', as: 'map'
  post '/map', to: 'pins#create'

  get '/rights', to: 'rights#index'

end
