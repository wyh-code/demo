import { 
  ITEM_HEIGHT, 
  LINE_HEIGHT, 
  LINE_WIDTH,
  lightLineColor, 
  darkLineColor 
} from './common'

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
  const startX = height - LINE_WIDTH;
  let y = startX;
  while(y > 0){
    xLine.push({
      x: 0,
      y,
      width,
      height: LINE_HEIGHT,
      type: 'rect',
      fillColor: (height - LINE_WIDTH) == y ? darkLineColor : lightLineColor
    })
    y-=ITEM_HEIGHT;
  }

  // y轴
  for(let x = 0; x < width; x += ITEM_HEIGHT){
    yLine.push({
      x,
      y: 0,
      width: LINE_HEIGHT,
      height,
      type: 'rect',
      fillColor: lightLineColor
    })

    // x 轴刻度
    xn.push({
      x,
      y: startX,
      width: LINE_HEIGHT,
      height: LINE_WIDTH,
      type: 'rect',
      fillColor: darkLineColor
    })
  }

  return [xLine, yLine, xn]
}