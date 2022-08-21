import { drawConfig } from './common';
const { 
  graduation, 
  lineWidth, 
  darkLineColor, 
  lightLineColor, 
  itemHeight  
} = drawConfig;

/**
 * 获取坐标线数据
 */
export default function (instance:any){
  const width = instance.width;
  const height = instance.height
  const xLine = []
  const yLine = []
  const xn = []
  // x 轴启始时y坐标（要留出刻度位置）
  const startX = height - graduation;
  let y = startX;

  while(y > 0){
    xLine.push({
      x: 0,
      y,
      width,
      height: lineWidth,
      type: 'rect',
      fillColor: (height - graduation) == y ? darkLineColor : lightLineColor
    })
    y-=itemHeight;
  }

  // y轴
  for(let x = 0; x < width; x += itemHeight){
    yLine.push({
      x,
      y: 0,
      width: lineWidth,
      height: startX,
      type: 'rect',
      fillColor: lightLineColor
    })

    // x 轴刻度
    xn.push({
      x,
      y: startX,
      width: lineWidth,
      height: graduation,
      type: 'rect',
      fillColor: darkLineColor
    })
  }

  return [xLine, yLine, xn]
}