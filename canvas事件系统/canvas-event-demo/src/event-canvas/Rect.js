export default class Rect {
  constructor(options) {
    Object.assign(this, options);
  }

  draw(){
    const { x, y, width, height, fillColor, strokeClor, strokeWidth=1} = this.options
    const { ctx } = this;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = strokeClor || fillColor;
    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = fillColor;
    ctx.rect(x, y, width, height)
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}