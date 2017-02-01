require 'rspec'
require 'dessert'

=begin
Instructions: implement all of the pending specs (the `it` statements without blocks)! Be sure to look over the solutions when you're done.
=end

describe Dessert do
  let(:chef) { double("chef", name: "Olga") }
  subject(:cake) { Dessert.new("cake", 13, chef) }

  describe "#initialize" do
    it "sets a type" do
      expect(cake.type).to eq("cake")
    end

    it "sets a quantity" do
      expect(cake.quantity).to eq(13)
    end

    it "starts ingredients as an empty array" do
      expect(cake.ingredients).to eq([])
    end

    it "raises an argument error when given a non-integer quantity" do
      expect do
        Dessert.new("cake", "dozen", "chef")
      end.to raise_error(ArgumentError)
    end
  end

  describe "#add_ingredient" do
    it "adds an ingredient to the ingredients array" do
      cake.add_ingredient("butter")
      expect(cake.ingredients).to include("butter")
    end
  end

  describe "#mix!" do
    let(:array) { ["sugar", "butter", "salt", "flour"] }

    it "shuffles the ingredient array" do
      cake.add_ingredient("sugar")
      cake.add_ingredient("butter")
      cake.add_ingredient("salt")
      cake.add_ingredient("flour")
      cake.mix!
      expect(cake.ingredients).to_not match_array(:array)
      expect(cake.ingredients.sort).to match_array(array.sort)
    end
  end

  describe "#eat" do
    subject(:cake) { Dessert.new("cake", 13, "chef") }

    it "subtracts an amount from the quantity" do
      cake.eat(4)
      expect(cake.quantity).to eq(9)
    end

    it "raises an error if the amount is greater than the quantity" do
      expect { cake.eat(14) }.to raise_error
    end
  end

  describe "#serve" do
    it "contains the titleized version of the chef's name" do
      allow(chef).to receive(:titleize).and_return("Chef Olga the Great Baker")
      expect(cake.serve).to eq("Chef Olga the Great Baker has made 13 cakes!")
    end
  end

  describe "#make_more" do
    it "calls bake on the dessert's chef with the dessert passed in" do
      expect(chef).to receive(:bake).with(cake)
      cake.make_more
    end
  end
end
