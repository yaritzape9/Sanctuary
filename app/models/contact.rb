class Contact < ApplicationRecord
  belongs_to :user

  validates :phone_num, presence: true
end
