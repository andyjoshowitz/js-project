class ReviewsController < ApplicationController
  before_action :require_login
  skip_before_action :require_login, only: [:index, :show]
  before_action :authorize, only: [:edit, :update, :destroy]
  before_action :set_course

  def index
    @course = Course.find(params[:course_id])
    @reviews = @course.reviews

  	# render :json => @reviews
    respond_to do |format|
      format.json { render json: @reviews, status:200 }
      format.html {render :index}
    end
  end

  def show
    @course = @course = Course.find(params[:course_id])
    @review = @course.reviews.find_by(id: params[:id])
  end

  def new
    @course = Course.find(params[:course_id])
    @review = Review.new
  end

  def create
   @review = @course.reviews.build(review_params)
   # render json: @review, status: 201
   if @review.save
     respond_to do |format|
       format.html { redirect_to @course }
       format.json { render json: @review, status: 201 }
     end
   else
     render 'courses/show'
   end
  end

  def edit
    @course = Course.find_by(id: params[:course_id])
    @review = Review.find_by(id: params[:id])
  end

  def update
    @course = Course.find_by(id: params[:course_id])
    @review = Review.find_by(id: params[:id])
    @review.update(review_params)
    if @review.save
      redirect_to @review.course
    else
      render "edit"
    end
  end

  def destroy
    @course = Course.find_by(id: params[:course_id])
    @review = Review.find_by(id: params[:id])
    @review.destroy
    redirect_to @course
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end


  def review_params
    params.require(:review).permit(:difficulty, :course_quality, :instructor_quality, :amount_learned, :work_amount, :comment, :user_id, :course_id, :instructor_id)
  end

  def authorized?
    if current_user != Review.find_by(params[:id]).user
      flash[:error] = "You may only edit reviews that you created"
      redirect_back(fallback_location: root_path)
    end
  end

  def authorize
    unless current_user.try(:admin?) || current_user.id == Review.find_by(id: params[:id]).user_id
      flash[:error] = "You are not authorized to edit this content."
      redirect_back(fallback_location: root_path)
    end
  end
end
