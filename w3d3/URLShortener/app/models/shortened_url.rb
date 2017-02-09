class ShortenedUrl < ActiveRecord::Base

  validates :short_url, uniqueness: true, presence: true
  validates :long_url, :user_id,  presence: true

  belongs_to :submitter,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  has_many :visits,
    primary_key: :id,
    foreign_key: :shortened_url_id,
    class_name: :Visit

  has_many :visitors,
    through: :visits,
    source: :visitor


  def self.random_code
      code = SecureRandom.urlsafe_base64
  end

  def self.create_shortend_url(user, long_url)
      ShortenedUrl.create!(short_url: ShortenedUrl.random_code, long_url: long_url, user_id: user.id)
  end

  def num_clicks
    self.visits.length
  end

  def num_uniques
    #should determine the number of distinct
    #users who have clicked a link.

  end

  def num_recent_uniques
  end



end
