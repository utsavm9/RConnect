class UsersController < ApplicationController
    protect_from_forgery
    
    def new
        @user = User.new
    end
    
    def create 
        @user = User.new(user_params) 
        if @user.save 
            session[:user_id] = @user.id 
            redirect_to '/' 
        else 
            redirect_to '/signup' 
        end 
    end
    
    def edit
        @user = User.find(params[:user_id])
    end
    
    def update
        @user = User.find(params[:user_id])
        @user.first_name = params[:input_first_name]
        @user.last_name = params[:input_last_name]
        @user.gender = params[:input_gender]
        @user.age = params[:input_age]
        @user.ucla_students = params[:input_if_ucla].nil?    ? false : true
        @user.no_medical    = params[:input_if_medical].nil? ? false : true
        @user.mobile_app    = params[:input_if_app].nil?     ? false : true
        @user.save
        
        redirect_to '/study/index?message=-user-ok'
    end

    private
    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password)
    end


end
