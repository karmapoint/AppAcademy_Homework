require "byebug"

class Board
  attr_accessor :cups


  def initialize(name1, name2)
    @cups = Array.new(14) { Array.new }
    @name1 = name1
    @name2 = name2
    place_stones
  end

  def place_stones
    14.times do |i|
      next if i == 13
      next if i == 6
      @cups[i] = [:stone, :stone, :stone, :stone]
    end
  end

  def valid_move?(start_pos)
    raise "Invalid starting cup" if start_pos > 12 || start_pos < 1

  end

  def make_move(start_pos, current_player_name)

    stones = @cups[start_pos].length
    @cups[start_pos] = []
    distribute_stones(start_pos, stones, current_player_name)
  end


  def distribute_stones(start_pos, stones, current_player_name)
    stones_left = stones
    current_pos = start_pos

    while stones_left > 0
      current_pos += 1
      if @name1 == current_player_name
        if current_pos == 13
          current_pos = 0
        end
      else
        if current_pos == 6
          current_pos = 7
          next
        elsif current_pos == 13
          current_pos = 0
        end
      end
      @cups[current_pos] << :stone
      stones_left -= 1
    end
    render
    next_turn(current_pos)
  end

  def next_turn(ending_cup_idx)
    # helper method to determine what #make_move returns

    return :switch if @cups[ending_cup_idx].length == 1


  end

  def render
    print "      #{@cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{@cups[13].count} -------------------------- #{@cups[6].count}"
    print "      #{@cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def one_side_empty?
    @cups[0..5].all? { |cup| cup.empty?} || @cups[7..12].all? { |cup| cup.empty?}
  end

  def winner
    case @cups[6].length <=> @cups[13].length
    when -1
      @name2
    when 0
      :draw
    when 1
      @name1
    end
  end
end
