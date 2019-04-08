class User < ApplicationRecord
    has_secure_password
    
    def self.sign_in_from_omniauth(auth)
        find_by(provider: auth['provider'], uid: auth[:uid]) || create_user_from_onmiauth(auth)
    end
    
    def self.create_user_from_onmiauth(auth)
        create(
            provider: auth['provider'],
            uid: auth['uid'],
            name: auth['info']['name'],
            email: auth['info']['email']
        )
    end
end
