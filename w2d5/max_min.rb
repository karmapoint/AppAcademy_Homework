require "byebug"
def windowed_max_range(array, win_size)
  current_max_range = 0

  (array.length - win_size + 1).times do |i|
    j = i + (win_size -1)
    sub_array = array[i..j]
    current_range = sub_array.max - sub_array.min
    current_max_range = current_range if current_range > current_max_range
  end
  current_max_range
end



 windowed_max_range([1, 0, 2, 5, 4, 8], 2) == 4 # 4, 8
 windowed_max_range([1, 0, 2, 5, 4, 8], 3) == 5 # 0, 2, 5
 windowed_max_range([1, 0, 2, 5, 4, 8], 4) == 6 # 2, 5, 4, 8
 windowed_max_range([1, 3, 2, 5, 4, 8], 5) == 6 # 3, 2, 5, 4, 8


class MyQueue
  def initialize
    @store = []
  end

  def enqueue(el)
    @store.unshift(el)
  end

  def dequeue
    @store.shift
  end

  def peek
    @store.first
  end

  def size
    @store.length
  end

  def empty?
    @store.empty?
  end

end


class MyStack
  def initialize
    @store = []
  end

  def pop
    @store.pop
  end

  def push(el)
    @store.push(el)
  end

  def peek
    @store.last
  end

  def size
    @store.length
  end

  def empty?
    @store.empty?
  end

end


class StackQueue
  def initialize
    @store = MyStack.new
  end
end
