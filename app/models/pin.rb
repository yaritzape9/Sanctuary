class Pin < ApplicationRecord
  has_many :votes

  def score
    upvote_total = Vote.where(pin_id: self.id, vote_type: 'up').count
    downvote_total = Vote.where(pin_id: self.id, vote_type: 'down').count

    return (upvote_total - downvote_total)
  end
  
end
