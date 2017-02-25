function curriedSum(numArgs) {
  const numbers = [];
  return function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return numbers.reduce(function(acc, el) {
        return acc + el;
      }, 0);
    }
    else {
      return _curriedSum;
    }
  };
}

const sum = curriedSum(4);
console.log(sum(5)(30)(20)(1)); // => 56


Function.prototype.curry = function(numArgs) {
  const args = [];
  let that = this;
  return function _curry(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return that.apply(that, args);
    }
    else {
      return _curry;
    }
  };
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

let x = sumThree.curry(3);
console.log(x(1)(2)(3));
