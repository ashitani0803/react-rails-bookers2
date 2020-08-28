class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title
      t.text :body
      t.references :user, foreign_kry: true

      t.timestamps
    end
  end
end
