Rails.application.routes.draw do
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    root 'study#index'

    # for static html pages
    get '/pages/:page' => 'pages#show'
    get '/about' => 'pages#about'
    
    # study controller
    get 'study/new' => 'study#new'
    get 'study/create' => 'study#create'
    get 'study/index' => 'study#index'
    get 'study/destroy/:study_id' => 'study#destroy'
    get 'study/edit/:study_id' => 'study#edit'
    get 'study/update/:study_id' => 'study#update'
    get 'study/show/:study_id' => 'study#show'
    
    #User controller
    get 'signup' => 'users#new'
    resources :users
    get 'users/edit/:user_id' => 'users#edit'
    get 'users/update/:user_id' => 'users#update' 
    
    #Sessions controller
    get 'login' => 'sessions#new'
    post 'login' => 'sessions#create'
    delete 'logout' => 'sessions#destroy'
    
    # Routes for Google authentication
end
