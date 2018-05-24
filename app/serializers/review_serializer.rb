class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :difficulty, :course_quality, :instructor_quality, :amount_learned, :work_amount, :comment, :updated_at
  belongs_to :course
  belongs_to :user
end
