class InstructorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :second_name
  has_many :courses

  # def course_list
  #   object.courses.map do |course|
  #     {
  #       id: course.id,
  #       instructor: {
  #         id: course.instructor_id,
  #       },
  #       content: course.description
  #       title: course.title
  #       department: course.department
  #     }
  #   end
  # end
end
