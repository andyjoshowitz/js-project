class WelcomeController < ApplicationController

  def home
    @courses = Course.all
    @user = User.find_by(id: params[:user_id])
    @newest_courses= Course.recently_added.first_three
    @most_popular_courses = Course.most_popular
  end

end
