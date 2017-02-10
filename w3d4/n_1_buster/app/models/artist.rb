class Artist < ActiveRecord::Base
  has_many(
    :albums,
    class_name: "Album",
    foreign_key: :artist_id,
    primary_key: :id
  )

  def n_plus_one_tracks
    albums = self.albums
    tracks_count = {}
    albums.each do |album|
      tracks_count[album.title] = album.tracks.length
    end

    tracks_count
  end

  def better_tracks_query
    releases = self.albums.includes(:tracks)
    tracks_counts = {}
    releases.each do |album|
      tracks_counts[album.title] = album.tracks.length
    end
    tracks_counts
  end
end
