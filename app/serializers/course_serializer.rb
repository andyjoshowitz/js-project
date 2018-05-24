class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :department, :course_number
  belongs_to :user
  belongs_to :instructor
  has_many :reviews
end
