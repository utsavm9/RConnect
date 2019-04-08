class StudyController < ApplicationController
    
    def new
        #Something happens
    end
    
    def show
        @aStudy = Study.find(params[:study_id]);
    end
    
    def create
        # this new is a method that runs on study hash
        @aStudy = Study.new
        
        @aStudy.title = params[:input_title]
        @aStudy.description = params[:input_description]
        @aStudy.researcher_name = params[:input_researcher_name]
        @aStudy.researcher_email = params[:input_researcher_email]
        @aStudy.money = params[:input_money]
        @aStudy.min_age = params[:input_min_age]
        @aStudy.max_age = params[:input_max_age]
        @aStudy.gender = params[:input_gender]
        @aStudy.ucla_students = params[:input_if_ucla].nil?    ? false : true
        @aStudy.no_medical    = params[:input_if_medical].nil? ? false : true
        @aStudy.mobile_app    = params[:input_if_app].nil?     ? false : true
        @aStudy.submitter_email = params[:input_submitter]
        @aStudy.save

        redirect_to '/study/index/?message=-created'
    end
    
    def index
        #try different variable
        @aStudy = Study.all
        if params[:sort].nil? || params[:sort] == "date-r"
            @sortedBy = "Date (Newest first)"
            @aStudy = @aStudy.reverse
        elsif params[:sort] == "date"
            @sortedBy = "Date (Oldest first)"
        elsif params[:sort] == "pay"
            @sortedBy = "Pay (Lowest First)"
            @aStudy = @aStudy.sort {
                |a, b| a.money <=> b.money
            }
        else
            @sortedBy = "Pay (Highest First)"
            @aStudy = @aStudy.sort {
                |a, b| b.money <=> a.money
            }
        end
        
        @noAuthType = params[:message] if !params[:message].nil?

    end
    
    def destroy
        @aStudy = Study.find(params[:study_id]) 
        if current_user.nil?
            @noAuthType = 'del-nolog'
        elsif current_user.email == @aStudy.submitter_email
            @noAuthType = '-del-own'
            @aStudy.destroy
        else
            @noAuthType = 'del-inauth'
        end
        redirect_to '/study/index?message=' + @noAuthType
    end
    
    def update
        @aStudy = Study.find(params[:study_id]) 
        @aStudy.title = params[:input_title]
        @aStudy.description = params[:input_description]
        @aStudy.researcher_name = params[:input_researcher_name]
        @aStudy.researcher_email = params[:input_researcher_email]
        @aStudy.money = params[:input_money]
        @aStudy.min_age = params[:input_min_age]
        @aStudy.max_age = params[:input_max_age]
        @aStudy.gender = params[:input_gender]
        @aStudy.ucla_students = params[:input_if_ucla].nil?    ? false : true
        @aStudy.no_medical    = params[:input_if_medical].nil? ? false : true
        @aStudy.mobile_app    = params[:input_if_app].nil?     ? false : true
        @aStudy.submitter_email = params[:input_submitter]
        @aStudy.save
        
        redirect_to '/study/index?message=-updated'
    end
    
    def edit
       @aStudy = Study.find(params[:study_id]) 
    end
end
