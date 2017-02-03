class LRUCache

  def initialize(length)
    @length = length
    @cache = []
  end

  def count
    # returns number of elements currently in cache
    @cache.length
  end

  def add(el)
    # adds element to cache according to LRU principle
    if @cache.include?(el)
      @cache.delete(el)
    elsif @cache.length  >= @length
      @cache.shift
      @cache << el
    else
      @cache << el
  end

  def show
    # shows the items in the cache, with the LRU item first
    print @cache.join(", ")
    nil
  end

  private
  # helper methods go here!

end
