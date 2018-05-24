class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :difficulty
      t.integer :course_quality
      t.integer :instructor_quality
      t.integer :amount_learned
      t.integer :work_amount
      t.text :comment
      t.integer :user_id
      t.integer :course_id
      t.timestamps
    end
  end
end
