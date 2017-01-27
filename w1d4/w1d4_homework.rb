# Stacks ar LIFO
class Stack
  def initialize
    @holder = []
  end

  def add(el)
    @holder.push(el)
  end

  def remove
    @holder.pop
  end

  def show
    @holder.dup
  end

end

# Queues are FIFO
class Queue
  def initialize
    @holder = []
  end

  def enqueue(el)
    @holder.push(el)
  end

  def dequeue
    @holder.shift
  end

  def show
    @holder.dup
  end

end


# Map class as 2D array [[k1,v1], [k2,v2], [k3,v3]]
class Map
  attr_reader :holder

  def initialize
    @holder = [["k1", "v1"]]
  end

  # assign creates new pairs, or updates an existing pair
  def assign(key, value)
    if lookup(key)
      @holder.each { |pair| pair[1] = value if pair[0] == key}
    else
      @holder << [key, value]
    end
  end

  def lookup(key)
    @holder.each { |pair| return pair[1] if pair[0] == key }
    nil
  end

  def remove(key)
    if lookup(key)
      @holder.each.with_index do |pair, i|
        @deletable_index = i if pair[0] == key
      end
      @holder.delete_at(@deletable_index)
    end
    nil
  end

  def show
    @holder.dup
  end

end
