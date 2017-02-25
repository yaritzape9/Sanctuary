class User < ApplicationRecord
  has_many :contacts

  has_secure_password

  validates :email, :username, presence: true
  validates :email, :username, uniqueness: true
end
