export default class Circle {
  constructor(options){
    Object.assign(this, options);
  }
  draw(){
    const { x, y, radius, fillColor, strokeClor, strokeWidth=1} = this.options
    const { ctx } = this;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = strokeClor || fillColor;
    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = fillColor;
    // ctx.rect(x, y, width, height)
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}