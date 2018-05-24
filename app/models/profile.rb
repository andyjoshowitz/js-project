class Profile < ApplicationRecord
  belongs_to :user
  has_many :courses, through: :user
end
