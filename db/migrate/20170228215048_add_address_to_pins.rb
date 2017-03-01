class AddAddressToPins < ActiveRecord::Migration[5.0]
  def change
    add_column :pins, :address, :string
  end
end
