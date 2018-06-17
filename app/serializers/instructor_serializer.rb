class InstructorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :second_name, :course_list
  has_many :courses

  def course_list
    object.courses.map do |course|
      {
        id: course.id,
        instructor: {
          id: course.instructor_id
        },
        user: {
          id: course.user_id
        },
        description: course.description,
        title: course.title,
        department: course.department,
        course_number: course.course_number
      }
    end
  end
end
