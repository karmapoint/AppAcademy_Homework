def measure(method)
  start_time = Time.now
  method
  end_time = Time.now
  p time_spent = end_time - start_time
end

array = ['fish', 'fiiish', 'fiiiiish', 'fiiiish', 'fffish', 'ffiiiiisshh', 'fsh', 'fiiiissshhhhhh']

def sluggish(array)
  array.each_with_index do |first, i|
    max_length = true

    array.each_with_index do |second, j|
      next if i == j
      max_length = false if second.length > first.length
    end

    return first if max_length
  end
end



def dominant(array)
  return array if array.length < 2
  middle = array.length / 2
  left = dominant(array[0...middle])
  right = dominant(array[middle..-1])

  merge(left, right)
end

def merge(left, right)
  new_array = []
  until left.empty? || right.empty?
    case left.first.length <=> right.first.length
    when -1
      new_array << left.shift
    when 0
      new_array << right.shift
    when 1
      new_array << right.shift
    end
  end
  new_array + left + right
end



def clever(array)
  longest = array[0]
  i = 0
  while i < array.length
    longest = array[i] if array[i].length > longest.length
    i += 1
  end
  longest
end



puts "nlogn"
p nlogn_biggest_fish(array)
measure(nlogn_biggest_fish(array))

puts "dominant (merge)"
p dominant(array).last
measure(dominant(array))

puts "sluggish, compare every one"
p sluggish(array)
measure(sluggish(array))

puts "clever, compare every one but hold onto best one"
p clever(array)
measure(clever(array))

tiles_array = ["up", "right-up", "right", "right-down", "down", "left-down", "left",  "left-up" ]

def slow_dance(direction, tiles_array)
  tiles_array.each_with_index do |tile, index|
    return index if tile == direction
  end
end



tiles_hash = {
    "up" => 0,
    "right-up" => 1,
    "right"=> 2,
    "right-down" => 3,
    "down" => 4,
    "left-down" => 5,
    "left" => 6,
    "left-up" => 7
}

def fast_dance(direction, tiles_hash)
  tiles_hash[direction]
end
