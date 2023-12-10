
function Clock(containerId) {
  const canvas = document.getElementById(containerId);
  if (!canvas) {
    console.log('没有找到 canvas')
    return;
  }

  const dpr = window.devicePixelRatio;
  const width = parseInt(canvas.style.width) * dpr;
  const height = parseInt(canvas.style.height) * dpr;
  canvas.width = width;
  canvas.height = height;
  const bgColor = '#000000';
  const updateBgColor = 'rgba(0, 0, 0, .1)'
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
  // this.dayBorderR = radius - space;
  this.yearRingR = radius - space * 2;

  // 获取月坐标
  const months = getRing({
    ctx, 
    x: clockCenter.x, 
    y: clockCenter.y, 
    r: this.monthBorderR, 
    average: {
      deg: true,
      vd: true
    },
    clockwise: false,
    type: 'month',
    ringWidth: dpr,
    pointRadius: dpr * dpr,
    vdPower: dpr * 1.5,
  });
  // 获取周坐标
  const weeks = getRing({
    ctx, 
    x: clockCenter.x, 
    y: clockCenter.y, 
    r: this.yearRingR, 
    average: {
      deg: true,
    },
    type: 'week'
  });
  this.months = months;
  this.weeks = weeks;

  this.init = function () {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.animate();
  }

  this.drawSystem = function () {
    ctx.fillStyle = updateBgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const height = this.canvas.height;
    const width = this.canvas.width;
    // 中线
    ctx.fillStyle = this.defaultColor;
    ctx.fillRect(0, height / 2 - 1, width, 2);
  }

  this.drawClockRing = function (points) {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    ctx.fillStyle = updateBgColor;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      point.draw(i)
    }
  }

  function drawClockBorder(radius) {
    ctx.beginPath();
    ctx.arc(
      clockCenter.x,
      clockCenter.y,
      radius,
      deg(20),
      deg(340)
    );
    ctx.lineWidth = dpr;
    ctx.strokeStyle = defaultColor;
    ctx.stroke();

    // 确定未闭合角度弦长
    const chordY = Math.round(Math.sin(deg(20)) * radius);
    const chordX = Math.round(Math.cos(deg(20)) * radius);
    const diff = radius - chordX;

    // 确定圆弧线终点坐标
    const endY = Math.round(clockCenter.y - chordY);
    const endX = Math.round(clockCenter.x + chordX);

    // 确定过度弧线的终点坐标
    const transitionY = clockCenter.y - chordY / 2
    const transitionX = clockCenter.x + radius + (radius - chordX);
    // console.log(endY, clockCenter.y, chordY, transitionY)
    // 确定
    return {
      endX,
      endY,
      diff,
      transitionX,
      transitionY
    }
  }

  this.drawBorder = function () {
    // 绘制圆形
    // const year = drawClockBorder(radius)
    // const month = drawClockBorder(radius - space / 2)
    // const day = drawClockBorder(radius - space)

  }

  this.draw = function () {
    // 绘制参照物
    this.drawSystem();

    // 绘制边框
    this.drawBorder();

    // 绘制月环
    this.drawClockRing(months);

    // 绘制周环
    this.drawClockRing(weeks);
  }

  this.animate = function () {
    this.draw();
    requestAnimationFrame(this.animate.bind(this))
  }

  // 初始化
  this.init();
}

const clock = new Clock('canvas');
