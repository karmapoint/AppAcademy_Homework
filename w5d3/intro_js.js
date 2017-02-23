// myUniq
function myUniq(array) {
  let results = [];
  array.forEach((el) => {
    if (!results.includes(el)) {
      results.push(el);
    }
  });
  return results;
}

// twoSum
Array.prototype.twoSum = function() {
  let result = [];
  let i = 0;
  while (i < (this.length - 1)) {
    let j = i + 1;
    while (j < this.length) {
      if (this[i] + this[j] === 0) { result.push([i, j]); }
      j++;
    }
    i++;
  }
  return result;
};

// myTranspose
Array.prototype.myTranspose = function() {
  let length = this.length;
  let result = [];

  for (let i = 0; i < length; i++) {
    result.push([]);
  }

  for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
      result[x][y] = this[y][x];
    }
  }
  return result;
};

// myEach
Array.prototype.myEach = function(block) {
  for (let i = 0; i < this.length; i++) {
    block(this[i]);
  }
};

// myMap
Array.prototype.myMap = function(block) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(block(this[i]));
  }
  return result;
};

// myInject
Array.prototype.myInject = function(block, accumulator) {
  let acc;
  let i;
  if (accumulator === undefined) {
    acc = this[0];
    i = 1;
  }
  else {
    acc = accumulator;
    i = 0;
  }
  while (i < this.length) {
    acc = block(acc, this[i]);
    i++;
  }
  return acc;
};

// // myInject with myEach
// Array.prototype.myInject2 = function(block, accumulator) {
//   let acc;
//   let array;
//   if (accumulator === undefined) {
//     acc = this[0];
//     array = this.slice(1);
//   }
//   else {
//     acc = accumulator;
//     array = this;
//   }
//   array.myEach( function(el) {
//     acc = block(el, acc);
//   });
//   return acc;
// };


// myInject with myEach --REFACTORED TO USE =>
Array.prototype.myInject2 = function(block, accumulator) {
  let acc;
  let array;
  if (accumulator === undefined) {
    acc = this[0];
    array = this.slice(1);
  }
  else {
    acc = accumulator;
    array = this;
  }
  array.myEach((el) => { acc = block(el, acc); });
  return acc;
};





// factors
function factors(num) {
  let results = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) { results.push(i); }
  }
  return results;
}

// bubbleSort
function bubbleSort(array) {
  let unsorted = true;
  while (unsorted) {
    unsorted = false;
    let i = 0;
    while (i < array.length - 1) {
      let j = i + 1;
      while (j < array.length) {
        if (array[i] > array[j]) {
          [array[i], array[j]] = [array[j], array[i]];
          unsorted = true;
        }
        j++;
      }
      i++;
    }
  }
  return array;
}

// subStrings
function subStrings(string) {
  let result = [];
  let i = 0;
  while (i < string.length) {
    let j = i + 1;
    while (j < string.length + 1) {
      let sub = string.slice(i, j);
      if (!result.includes(sub)) { result.push(sub); }
      j++;
    }
    i++;
  }
  return result;
}

// recursiveRange
function range(start, end) {
  if (end < start) { return []; }
  let res = range(start, end - 1);
  res.push(end);
  return res;
}

// recursiveSum
function recursiveSum(array) {
  if (array.length === 0) { return 0; }
  let sum = array[0];
  sum += recursiveSum(array.slice(1));
  return sum;
}

// recursiveExpo1
function recursiveExpo1(base, exp) {
  if (exp === 0) { return 1; }
  return base * recursiveExpo1(base, exp - 1);
}

// recursiveExpo2
function recursiveExpo2(base, exp) {
  if (exp === 0) { return 1; }
  if (exp === 1) { return base; }

  if (exp % 2 === 0) {
    let rec = recursiveExpo2(base, exp / 2);
    return rec * rec;
  }
  else {
    let newExp = (exp - 1) / 2;
    let rec = recursiveExpo2(base, newExp);
    return base * rec * rec;
  }
}

// recursiveFib
function recursiveFib(n) {
  let array = [1,1];
  if (n <= 2) { return array.slice(0, n); }

  let res = recursiveFib(n-1);
  let next = res[res.length -1] + res[res.length -2];
  res.push(next);
  return res;
}

// recursiveBSearch
function recursiveBSearch(array, target) {
  if (array.length === 0) return;
  let middle = Math.floor(array.length / 2);
  if (array[middle] === target) return middle;
  else if (array[middle] > target) {
    let rec = recursiveBSearch(array.slice(0, middle), target);
    return rec;
  }
  else {
    let rec = recursiveBSearch(array.slice(middle), target);
    return middle + rec;
  }
}
