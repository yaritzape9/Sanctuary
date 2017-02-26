class CreatePins < ActiveRecord::Migration[5.0]
  def change
    create_table :pins do |t|
      t.float :longitude
      t.float :latitude
      t.string :description

      t.timestamps
    end
  end
end
