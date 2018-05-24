class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.string :title
      t.text :description
      t.string :department
      t.integer :course_number
      t.integer :user
      t.integer :instructor
      t.timestamps
    end
  end
end
