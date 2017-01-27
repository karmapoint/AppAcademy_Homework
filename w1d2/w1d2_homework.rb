def sum_to(n)
  return nil if n < 1
  return 1 if n == 1
  n + sum_to(n - 1)
end


# p sum_to(5)  # => returns 15
# p sum_to(1)  # => returns 1
# p sum_to(9)  # => returns 45
# p sum_to(-8)  # => returns nil


def add_numbers(array)
  return nil if array.empty?
  return array.first if array.length == 1
  array.first + add_numbers(array[1..-1])
end

# p add_numbers([1,2,3,4]) # => returns 10
# p add_numbers([3]) # => returns 3
# p add_numbers([-80,34,7]) # => returns -39
# p add_numbers([]) # => returns nil


def gamma_fnc(n)
  return nil if n < 1
  return 1 if n == 1
  factorial(n-1)
end

def factorial(n)
  return 1 if n == 1
  n * factorial(n - 1)
end

p gamma_fnc(0)  # => returns nil
p gamma_fnc(1)  # => returns 1
p gamma_fnc(4)  # => returns 6
p gamma_fnc(8)  # => returns 5040
