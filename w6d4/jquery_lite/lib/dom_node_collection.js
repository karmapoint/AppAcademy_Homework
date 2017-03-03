class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html(string = null){
    if (string === null) {
      return this.array[0].innerHTML;
    }
    this.array.forEach((el) => {
      el.innerHTML = (string);
    });
  }

  empty() {
    this.array.forEach((el) => {
      el.innerHTML = "";
    });
  }

  append(stuff) {
    this.array.forEach((el) => {
      el.innerHTML += stuff;
    });
  }


  attr(key, value = null) {
    if (value === null) {
      this.array[0].getAttribute(key);
    } else {
    this.array.forEach((el) => {
        el.setAttribute(key, value);
      });
    }
  }

  addClass(name) {
    this.array.forEach((el) => {
      el.classList.add(name);
    });
  }

  removeClass(name) {
    this.array.forEach((el) => {
      el.classList.remove(name);
    });
  }

  remove() {
    this.array.forEach((el) => {
      el.parentNode.removeChild(el);
    });

  }
}

module.exports = DOMNodeCollection;
