function fizzbuzz(count) {
  const arr = [];
  let state = '';

  for (let i = 1; i <= count; i++) {
    arr.push(i);
  }
  // console.log(arr);
  return arr.map(function (item) {
    if (item % 15 === 0) {
      state = 'fizzbuzz';
      return state;
    } 
    else if (item % 3 === 0) {
      state = 'fizz';
      return state;
    }
    else if (item % 5 === 0) {
      state = 'buzz';
      return state;
    }
    else {
      state = item;
      return state;
    }
  });
}
console.log(fizzbuzz(15));
