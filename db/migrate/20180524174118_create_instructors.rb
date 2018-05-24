class CreateInstructors < ActiveRecord::Migration[5.2]
  def change
    create_table :instructors do |t|
      t.string :first_name
      t.string :second_name
      t.integer :user_id
      t.timestamps
    end
  end
end
