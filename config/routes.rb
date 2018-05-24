Rails.application.routes.draw do

  resources :profiles
  resources :instructors
  resources :courses
  resources :reviews

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'welcome#home'

end
