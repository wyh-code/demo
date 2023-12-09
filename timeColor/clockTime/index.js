
function Clock(containerId){
  const canvas = document.getElementById(containerId);
  if(!canvas) {
    console.log('没有找到 canvas')
    return;
  }

  const dpr = window.devicePixelRatio;
  const width = parseInt(canvas.style.width) * dpr;
  const height = parseInt(canvas.style.height) * dpr;
  canvas.width = width;
  canvas.height = height;
  const defaultColor = "#ff0000";
  const ctx = canvas.getContext('2d');

  

  const space = 20; // 距离画布边缘距离
  let radius = Math.min(height, width) / 2 - space; // 最外层半径

  const clockCenter = {
    y: height / 2,
    x: radius + 20
  }


  this.canvas = canvas;
  this.ctx = ctx;
  this.dpr = dpr;
  this.width = width;
  this.height = height;
  this.defaultColor = defaultColor;
  this.clockCenter = clockCenter;


  // 从最外层边框依次缩小半径
  this.yearBorderR = radius;
  this.monthBorderR = radius - space / 2;
  this.dayBorderR = radius - space;
  this.yearRingR = radius - space * 2;

  const days = getYearRing(ctx, clockCenter.x, clockCenter.y, this.yearRingR);
  this.days = days;

  this.init = function(){
    // 绘制参照物
    this.drawSystem();
    console.log('drawSystem')
    // 绘制年轮
    this.drawYearRing()
  }

  this.drawSystem = function (){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const height = this.canvas.height;
    const width = this.canvas.width;
    // 中线
    ctx.fillStyle = this.defaultColor;
		ctx.fillRect(0, height / 2 - 1, width, 2);
  }

  this.drawYearRing = function(){
    const days = this.days;
    // this.ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
		// this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i = 0; i < days.length; i++){
      const day = days[i];
      day.draw(i)
    }

    // requestAnimationFrame(this.drawYearRing.bind(this))
  }

  this.draw = function(){
    console.log('---draw--')
  }

  // 初始化
  this.init();
}

const clock = new Clock('canvas');
