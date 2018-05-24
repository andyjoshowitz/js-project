class Instructor < ApplicationRecord
  has_many :reviews, through: :courses
  has_many :courses
  accepts_nested_attributes_for :courses
  validates_presence_of :first_name, :second_name

  def course=(course_attributes)
    course = Course.new(course_attributes)
    if course.save
      self.courses << course
      self.save
    end
  end

  def courses_attributes=(courses_attributes)
    courses_attributes.each do |i, course_attributes|
      if !course_attributes[:title].blank? && !course_attributes[:description].blank?
        if course_attributes[:id].blank?
          self.courses.build(course_attributes)
        else
          course = Course.find_by(id: course_attributes[:id])
          course.update(course_attributes)
        end
      end
    end
  end

  def full_name
    self.first_name + " " + self.second_name
  end

  def instructor?
    self.instructor.first_name.nil?
  end

  def overall_rating
    (self.reviews.collect{|r| r.instructor_quality}.inject(0){|sum,x| sum + x }/self.reviews.count.to_f).round(2)
  end

end
