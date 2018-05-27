module ReviewsHelper
  def last_updated(review)
    review.updated_at.strftime("Last updated %A, %b %e, at %l:%M %p")
  end
end
