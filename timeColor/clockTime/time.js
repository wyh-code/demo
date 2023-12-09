
function getDays (){
  const date = new Date;
  const Y = date.getFullYear();
  const M = date.getMonth();
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  const day = 24 * 60 * 60 * 1000;
  const start = +new Date(Y, 0, 1, 0, 0, 0);

  const days = [];
  let yesterday = start;

  for(let i = 0; i < 365; i++){
    days.push({
      time: yesterday,
      date: (new Date(yesterday)).toLocaleString(),
      color: packColor(yesterday)
    })
    yesterday = yesterday + day;
  }

  return days;
}

function Ring (options) {
  Object.assign(this, options);
  this.deg = Math.random() * options.degRang + options.gap;
  // 角速度
  this.vd = Math.random() * Math.PI * 2 / 360 + 0.01;
  this.dx = this.r * Math.cos(this.deg) + this.x;
	this.dy = this.r * Math.sin(this.deg) + this.y;
  this.r = this.r + Math.random() * options.ringWidth | 0;

  this.draw = function(i){
    this.update();
    console.log('---draw----',i)

    // this.ctx.beginPath();
    // this.ctx.arc(this.dx, this.dy, this.pointRadius, 0, Math.PI * 2);
    // this.ctx.fillStyle = this.color;
    // this.ctx.fill();
  }

  this.update = function(){
    console.log('update ring');
    // this.deg += this.vd;
    // this.dx = this.r * Math.cos(deg(this.deg)) + this.x;
    // this.dy = this.r * Math.sin(deg(this.deg)) + this.y;
  }
}


function getYearRing(ctx, x, y, radius,pointRadius=1, startDeg=0, endDeg=360, ringWidth=10){
  const days = getDays();
  const degRang = Math.abs(endDeg - startDeg);
  console.log(degRang, '==degRang=')
  for(let i = 0; i < days.length; i++){
    const day = days[i];
    const ring = new Ring({
      ...day,
      degRang, 
      gap: (360 - degRang) / 2, 
      ctx, x, y, r: radius, pointRadius, ringWidth
    });
    days.splice(i, 1, ring);
  }

  return days;
}
