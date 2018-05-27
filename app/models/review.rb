class Review < ApplicationRecord
  belongs_to :user
  belongs_to :course
  #belongs_to :instructor

  validates_presence_of :difficulty, :course_quality, :instructor_quality, :amount_learned, :work_amount
  validates :difficulty, :course_quality, :instructor_quality, :amount_learned, :work_amount, numericality: { only_integer: true }
  validates :difficulty, :course_quality, :instructor_quality, :amount_learned, :work_amount, inclusion: 1..5
end
