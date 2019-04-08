class CreateStudies < ActiveRecord::Migration[5.2]
  def change
    create_table :studies do |t|
      t.text :title
      t.text :description
      t.text :researcher_name
      t.text :researcher_email
      t.text :submitter_email
      t.text :gender
      t.boolean :ucla_students
      t.boolean :mobile_app
      t.boolean :no_medical
      t.decimal :money
      t.integer :min_age
      t.integer :max_age
      t.timestamps
    end
  end
end
