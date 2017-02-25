class CreateContacts < ActiveRecord::Migration[5.0]
  def change
    create_table :contacts do |t|
      t.references :user
      t.string :nickname
      t.string :phone_num

      t.timestamps
    end
  end
end
