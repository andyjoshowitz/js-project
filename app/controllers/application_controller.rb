class ApplicationController < ActionController::Base
  def after_sign_in_path_for(resource)
    request.env['omniauth.origin'] || root_path
  end
  
  private

  def require_login
    unless signed_in?
      flash[:error] = "You must be logged in to view this page"
      redirect_to new_user_session_path
    end
  end

  def require_admin_status
    unless current_user.try(:admin?)
      flash[:error] = "You are not authorized to view this page."
      redirect_back(fallback_location: root_path)
    end
  end
end
