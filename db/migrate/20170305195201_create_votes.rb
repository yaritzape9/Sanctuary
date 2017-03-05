class CreateVotes < ActiveRecord::Migration[5.0]
  def change
    create_table :votes do |t|
      t.references :pin
      t.references :user
      t.string     :vote_type

      t.timestamps
    end
  end
end
