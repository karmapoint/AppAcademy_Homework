# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  url        :string
#  content    :text
#  sub_id     :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ActiveRecord::Base
  validates :title, :sub, :author, presence: true

  belongs_to :sub
  belongs_to :author,
    foreign_key: :user_id,
    class_name: :User

  has_many :post_subs
end
