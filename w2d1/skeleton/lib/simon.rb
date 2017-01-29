class Simon
  COLORS = %w(red blue green yellow)

  attr_accessor :sequence_length, :game_over, :seq

  def initialize
    @sequence_length = 1
    @game_over = false
    @seq = []
  end

  def play
    until @game_over
      take_turn
    end
    game_over_message
    reset_game
  end

  def take_turn
    show_sequence
    require_sequence
    unless @game_over
      round_success_message
      @sequence_length += 1
    end
  end

  def show_sequence
    add_random_color
    puts @seq.join(" ")
    sleep(1)
    system("clear")
  end

  def require_sequence
    puts "Repeat the sequence:"
    puts ">"
    input = gets.chomp
    if input == @seq.join(" ")
      round_success_message
    else
      @game_over = true
      game_over_message
      reset_game
    end
  end

  def add_random_color
    seq << COLORS.sample
  end

  def round_success_message
    puts "You got that right!"
    puts "Here comes more!"
  end

  def game_over_message
    "You Lose with a score of #{@sequence_length}!"
  end

  def reset_game
    @sequence_length = 1
    @game_over = false
    @seq = []
  end
end

current_game = Simon.new
current_game.play
