function sum() {
  // console.log(arguments);
  let arr = Array.from(arguments);
  let result = arr.reduce(function(acc, val) {
    return acc + val;
  }, 0);
  return result;
}
// arr = [1,2,3]
console.log(sum(1,2,3));


const sum2 = (...args) => {
  let result = args.reduce(function(acc, val) {
    return acc + val;
  }, 0);
  return result;
};


console.log(sum2(1,23,4,5,343));
