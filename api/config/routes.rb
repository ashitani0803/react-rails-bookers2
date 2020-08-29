Rails.application.routes.draw do
  get "/users/signed_in" => "users#signed_in"
  post "/users/sign_up" => "users#sign_up"
  post "/users/sign_in" => "users#sign_in"
  delete "users/sign_out" => "users#sign_out"
  resources :users, only: [:index, :update]
  resources :books, only: [:index, :show, :create, :update, :destroy]
end
