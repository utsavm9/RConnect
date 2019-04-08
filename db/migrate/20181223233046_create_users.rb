class CreateUsers < ActiveRecord::Migration[5.2]
    def change
        create_table :users do |t|
            t.string :first_name
            t.string :last_name
            t.string :email
            t.string :password_digest
            t.text :gender
            t.boolean :ucla_students
            t.boolean :mobile_app
            t.boolean :no_medical
            t.date :age
            
            t.string :google_token
            t.string :google_refresh_token
            
            t.timestamps
        end
    end
end
