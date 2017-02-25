Function.prototype.myBind = function(context) {
  let arr = Array.from(arguments);
  let that = this;
  function newContext () {
    that.apply(context, arr.slice(1));
  }
  newContext();
  // newContext(arr.forEach(function(el) {
  //   return el;
  // }));
  // console.log(arr);

// reassign this somehow
// look for extra arguments
};

Function.prototype.myBind2 = function(context,...args) {
    // let that = this;

    const newContext = () => this.apply(context, args);
     newContext();
};



class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}


let c = new Cat("so");
let d = new Cat("soso");

// c.says("hi", "tree");
c.says.myBind(d, "testing", "test_old");
c.says.myBind2(d, "testing", "test");
