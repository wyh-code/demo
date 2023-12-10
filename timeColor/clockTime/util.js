
function packColor(time){
  const colorLen = 255 * 255 * 255;
  const color = (time % colorLen).toString(16);
  const str = `000000${color}`;
  return `#${str.slice(-6)}`
}

function deg(n){
  return (2 * Math.PI) / 360 * n
}

function getDeg ({ degRang, gap, average, length, i }){
  let deg = Math.random() * degRang + gap;
  // 平均分布
  if(average?.deg){
    const step = degRang / length;
    deg = step * i + gap;
  }
  return deg;
}

function getVd ({ degRang, average, length, clockwise, vdPower }){
  let vd = Math.random();
  // 平均分布
  if(average?.vd){
    const step = degRang / length;
    vd = step / 60 * vdPower;
  }
  // clockwise 为 true 时顺时针
  return clockwise ? vd : vd - 2 * vd;
}

function Ring(options) {
  Object.assign(this, options);
  // 初始角度
  this.deg = getDeg(options);
  // 角速度
  this.vd = getVd(options);
  // 圆心坐标
  this.dx = this.r * Math.cos(this.deg) + this.x;
  this.dy = this.r * Math.sin(this.deg) + this.y;
  // this.r = this.r;
  this.r = this.r + Math.random() * options.ringWidth | 0;

  this.draw = function (i) {
    this.update();
    this.ctx.beginPath();
    this.ctx.arc(this.dx, this.dy, this.pointRadius * this.dpr, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  this.update = function () {
    this.deg += this.vd;
    this.dx = this.r * Math.cos(deg(this.deg)) + this.x;
    this.dy = this.r * Math.sin(deg(this.deg)) + this.y;
  }
}