class Course < ApplicationRecord
  has_many :reviews
  belongs_to :user
  belongs_to :instructor

  #validates_presence_of :title, :description, :department, :course_number
  validates :title, length: { maximum: 60 }
  #validates :department, length: {is: 4}
  #validates :course_number, length: { is: 3}

  def instructor_attributes=(instructor_attributes)
    self.build_instructor(instructor_attributes)
  end

  def course_identity(department, course_number)
    self.department + "-" + self.course_number.to_s
  end

  def self.first_three
    limit(3)
  end

  def self.recently_added
    order(created_at: :desc)
  end

  def full_title
    self.title + " " + "(" + self.department + "-" + self.course_number.to_s + ")"
  end

  def instructor_name
    instructor.full_name
  end

  def self.most_popular
    joins(:reviews).group("courses.id").order("(sum(reviews.course_quality)/count(*)) desc")
  end

  def avg_difficulty
    if !reviews.empty?
      (self.reviews.collect{|r| r.difficulty}.inject(0){|sum,x| sum + x }/self.reviews.count.to_f).round(2)
    else
      "No reviews"
    end
  end

  def instructor_quality
    if !reviews.empty?
      (self.reviews.collect{|r| r.instructor_quality}.inject(0){|sum,x| sum + x }/self.reviews.count.to_f).round(2)
    else
      "No reviews"
    end
  end

  def work_amount
    if !reviews.empty?
      (self.reviews.collect{|r| r.work_amount}.inject(0){|sum,x| sum + x }/self.reviews.count.to_f).round(2)
    else
      "No reviews"
    end
  end

  def amount_learned
    if !reviews.empty?
      (self.reviews.collect{|r| r.amount_learned}.inject(0){|sum,x| sum + x }/self.reviews.count.to_f).round(2)
    else
      "No reviews"
    end
  end

  def overall_quality
    if !reviews.empty?
      (self.reviews.collect{|r| r.course_quality}.inject(0){|sum,x| sum + x }/self.reviews.count.to_f).round(2)
    else
      "No reviews"
    end
  end

end
