class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :pin

  validates_inclusion_of :vote_type, in: ['up', 'down']
end
