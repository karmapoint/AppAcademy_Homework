const DOMNodeCollection = require('./dom_node_collection.js');

Window.prototype.$l = function (thing, myReady) {
  myReady();
  const nodesArray = [].slice.call(document.querySelectorAll(thing));
  const DOMCollectionArray = new DOMNodeCollection(nodesArray);
  return DOMCollectionArray;


};

const myReady = () => {
  document.addEventListener('DOMContentLoaded', () => {
    console.log("ready!");
  });
};
