class SessionsController < ApplicationController
    def new 
    end
    
    def create
        @user = User.find_by_email(params[:session][:email])
        if @user && @user.authenticate(params[:session][:password])
            session[:user_id] = @user.id
            redirect_to '/'
        else
            @noAuthType = 'invalid-login'
            redirect_to '/login?message=' + @noAuthType
        end 
    end
    
    def destroy 
        session[:user_id] = nil 
        redirect_to '/' 
    end
    
    def googleAuth
        # Get access tokens from the google server
        access_token = request.env["omniauth.auth"]
        @user = User.from_omniauth(access_token)
        log_in(@user)
        
        # Access_token is used to authenticate request made from the rails application to the google server
        @user.google_token = access_token.credentials.token
        
        # Refresh_token to request new access_token
        # Note: Refresh_token is only sent once during the first request
        refresh_token = access_token.credentials.refresh_token
        @user.google_refresh_token = refresh_token if refresh_token.present?
        @user.save
        redirect_to root_path
    end

end
