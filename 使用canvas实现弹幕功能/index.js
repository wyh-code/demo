
class Barrage {
  constructor(options, ctx){
    this.ctx = ctx;
    this.isInit = false;
    this.flag = true;
    Object.assign(this, options)
  }

  getWidth(){
    const span = document.createElement('span');
    span.innerText = this.value;
    span.style.font = this.fontSize + 'px "Microsoft YaHei"';
    span.style.position = 'absolute';
    span.style.zIndex = -1;

    document.body.appendChild(span);
    let width = span.clientWidth;
    document.body.removeChild(span);

    return width;
  }

  init(){
    // 初始化弹幕
    this.color = this.color || this.ctx.color;
    this.fontSize = this.fontSize || this.ctx.fontSize;
    this.speed = this.speed || this.ctx.speed;
    // 获取弹幕宽度
    this.width = this.getWidth()

    this.x = this.ctx.canvas.width;

    this.y = Math.random() * this.ctx.canvas.height;

    if(this.y > this.ctx.height - this.fontSize){
      this.y = this.ctx.height - this.fontSize
    }

    if(this.y < this.fontSize){
      this.y = this.fontSize
    }
  }

  render(){
    this.ctx.context.font = this.fontSize + 'px "Microsoft YaHei"';
    this.ctx.context.fillStyle = this.color;
    this.ctx.context.fillText(this.value, this.x, this.y)
  }
}

class Barrages {
  constructor(options){
    if(!options.canvas || !options.video) return;

    const defaultOptions = {
      fontSize: 26,
      color: 'green',
      data: [],
      speed: 1,
    }

    Object.assign(this, defaultOptions, options);
    console.log(this)

    // 初始化 canvas
    this.canvas.width = this.video.clientWidth;
    this.canvas.height = this.video.clientHeight;
    this.context = this.canvas.getContext('2d');

    // 保存弹幕数据
    this.barrages = this.data.map(item => new Barrage(item, this))

    // 是否播放弹幕
    this.isPlay = false;
  }

  setBarrage(data){
    this.data.push(data);
    this.barrages.push(new Barrage(data, this))

  }

  clear(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render(){
    // 清空画布
    this.clear()
    // 绘制新的画布
    this.renderBarrages()

    if(this.isPlay){
      requestAnimationFrame(this.render.bind(this))
    }
  }

  // 绘制弹幕
  renderBarrages(){
    // 获取当前视频的时间
    const time = this.video.currentTime;
    this.barrages.forEach(item => {
      if(item.flag && item.time <= time){
        if(!item.isInit){
          item.init()
          item.isInit = true
        }
        item.x = item.x - item.speed;

        if(this.x < -this.width){
          this.flag = false;
        }
        item.render()
      }
    })
  }

  pause(){
    this.isPlay = false;
    console.log('pause')
  }
}