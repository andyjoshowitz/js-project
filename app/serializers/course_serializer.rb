class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :department, :course_number
  belongs_to :user
  belongs_to :instructor
  has_many :reviews

  def created_at
    object.created_at.strftime("%a %m-%d-%Y")
  end
end
