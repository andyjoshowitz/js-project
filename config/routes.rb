Rails.application.routes.draw do
  get 'instructors/:id/courses', to: "instructors#courses", as: "instructor_courses_path"
  get 'users/:user_id/courses', to: "users#courses", as: "user_courses"
  get 'instructors/:id/new_course', to: "instructors#new_course", as: "new_instructor_course"

  resources :instructors
  resources :courses do
    resources :reviews
  end
  resources :users do
    resource :profile
  end

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'welcome/home'
  root 'welcome#home'

  get '/instructors/:id/next', to: 'instructors#next_instructor'

  get '/instrutors/:id/previous', to: 'instructors#previous_instructor'

end
