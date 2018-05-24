class Profile < ApplicationRecord
  belongs_to :user
  has_many :profile_categories
  has_many :courses, through: :user
end
