const DOMNodeCollection = require('./dom_node_collection.js');

Window.prototype.$l = function (thing) {
  const nodesArray = [].slice.call(document.querySelectorAll(thing));

  const DOMCollectionArray = new DOMNodeCollection(nodesArray);
  
  return DOMCollectionArray;
};
