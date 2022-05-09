import Circle from './Circle.js'
import Rect from './Rect.js'

export default class EventCanvas {
  constructor(options){

    if(!options.canvas){

      console.error('canvas 是必传项！')
      return;
    }

    this.canvas = options.canvas;
    this.data = options.data;
    this.ctx = this.canvas.getContext('2d');

    // 初始化数据
    this.initData() 
    
    // 重置画布样式
    this.setStyle()

    // 绘制元素
    this.draw()
  }

  setStyle(){
    const canvas = this.canvas;
    const devicePixelRatio = window.devicePixelRatio;

    const width = canvas.style.width
    const height = canvas.style.height;


    this.canvas.width = parseInt(width) * devicePixelRatio
    this.canvas.height = parseInt(height) * devicePixelRatio;

    this.ctx.scale(devicePixelRatio, devicePixelRatio)
  }

  initData(){
    this.nodes = this.data.map(options => {
      if(options.type === 'circle'){
        return new Circle({
          ctx: this.ctx,
          options
        })
      }
      if(options.type === 'rect'){
        return new Rect({
          ctx: this.ctx,
          options
        })
      }
    })
  }

  draw(){
    this.nodes.forEach(ele => ele.draw())
  }
}