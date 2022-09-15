
function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMRoot.prototype.render = function (children) {
  // console.log(frameDeadLine)
}

function createRoot (root){
  return new ReactDOMRoot(root);
}

// const ReactDOM = {
//   createRoot
// }
