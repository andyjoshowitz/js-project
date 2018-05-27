class CoursesController < ApplicationController
  before_action :require_login, only: [:new, :create, :edit, :update, :destroy]
  before_action :authorize, only: [:edit, :update, :destroy]

  def index
    @courses = Course.all
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @courses, status: 200}
    end
  end

  def show
    @course = Course.find(params[:id])
    @reviews = @course.reviews
    #@review = @course.reviews.build
    # @reviews = @course.reviews.reverse
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @course, status: 200}
    end
    #render json: @course, status: 200
  end

  def new
    # @course = Course.new
    # @course.build_intructor()
  end

  #def create
  #  @course = Course.new(course_params)
  #  binding.pry
  #  if @course.save
  #    redirect_to course_path(@course)
  #  else
  #    flash.now[:alert] = "You must enter a name and description of the course"
  #    render "new"
  #  end
  #end

  def edit
    @course = Course.find_by(id: params[:id])
    @course.build_instructor() unless @course.instructor
  end

  def update
    @course = Course.find_by(id: params[:id])
    @course.update(course_params)
    if @course.save
      redirect_to course_path(@course)
    else
      render "edit"
    end
  end

  def destroy
    @course = Course.find_by(id: params[:id])
    @course.destroy
    redirect_to root_path
  end

  def new_review
    @review = @course.reviews.build(review_params) #in video build create method in review controller and might need to add review_params in here
    if @review.save
      render 'reviews/show', :layout => false
    else
      render "courses/show"
    end
  end

  private

  def course_params
    params.require(:course).permit(:id,
      :user_id,
      :title,
      :description,
      :department,
      :course_number,
      instructor_attributes: [
        :id,
        :user_id,
        :first_name,
        :second_name
      ]
    )
  end

  def authorize
    unless current_user.try(:admin?) || current_user.id == Course.find_by(id: params[:id]).user_id
      flash[:error] = "You are not authorized to view this page."
      redirect_back(fallback_location: root_path)
    end
  end

end
