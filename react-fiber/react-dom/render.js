
function createDom(vdom){
  const { type, props, ref } = vdom;

  let dom;
  if(typeof vdom === 'string'){ // 处理文本节点
    dom = document.createTextNode(vdom)
  }else {
    dom = document.createElement(type)
  }

  if(props){ // 更新属性
    updateProps(dom, {}, props)
    if(props.children){ // 处理子节点
      const children =  Array.isArray(props.children) ? props.children : [props.children];
      reconcileChildren(children, dom)
    }
  }

  return dom;
}

/**
 * 更新属性
 * @param {*} dom dom节点 
 * @param {*} oldProps 旧属性 
 * @param {*} newProps 新属性
 */
function updateProps(dom, oldProps, newProps){
  for(let attr in newProps){
    if(attr === 'children'){ // 子节点单独处理
      continue
    }else if(attr.startsWith('on')){ // 处理事件
      
    }else if(attr === 'style'){ // 处理样式
      const styleObj = newProps[attr]
      console.log(attr, '==attr==', styleObj)
      for(let styleName in styleObj){
        dom.style[styleName] = styleObj[styleName]
      }
    }else{ // 处理其它属性 class id...
      dom[attr] = newProps[attr]
    }
  }
}

/**
 * 处理多个子节点
 * @param {*} childrenVdom 
 * @param {*} parentDom 
 */
function reconcileChildren(childrenVdom, parentDom){
  childrenVdom.forEach(child => render(child, parentDom))
}

/**
 * 渲染入口方法
 * @param {*} vdom 虚拟DOM 
 * @param {*} container 根节点容器
 */
function render (vdom, container){
  // sleep(500)
  const newDom = createDom(vdom)
  if(newDom){
    container.appendChild(newDom); // 插入dom
  }
}

function sleep(wait){
  let time = +new Date;
  while(+new Date < time + wait){}
}

let ReactDOM = {
  render
}
