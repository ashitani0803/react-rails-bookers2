class User < ApplicationRecord
    has_secure_password

    has_many :books, dependent: :destroy

    mount_uploader :image, ImageUploader
end
