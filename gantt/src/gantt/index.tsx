import { useEffect, useRef, useState } from 'react';
import { EventCanvas, Rect } from 'event-canvas';
// import { EventCanvas, Rect } from '@/event-canvas';
import {
  drawConfig,
  formatterData,
  getTimes
} from './common';
import getLine from './line';

const { itemHeight, timeWidth } = drawConfig;

export default ({ data }: any) => {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const [style, setstyle] = useState({})
  const [xTime, setXTime] = useState<any>([])
  const [yData, setYData] = useState<any>([])

  // 获取时间跨度
  const times = getTimes(data);
  const { len, start } = times;

  /**
   * 根据默认每单元格宽高计算画布宽高
   */
  const computerStyle = () => {
    const style: any = {
      boxSizing: 'content-box'
    };

    // 设置宽
    style.width = len * itemHeight * timeWidth;
    // 设置宽
    style.height = data.length * itemHeight;
    console.log(style, '===style')
    return style
  }

  useEffect(() => {
    if (containerRef.current) {
      // 设置容器样式
      setstyle(computerStyle())
    }
  }, [])

  useEffect(() => {
    // 设置画布宽高
    if (ref.current) {
      const instance = new EventCanvas({ canvas: ref.current })

      // 绘制坐标
      const [x, y, xn] = getLine(instance);
      [...x, ...y, ...xn].map(item => new Rect(item))
        .forEach(item => instance.addElement(item));

      // 绘制刻度
      let xTime = [];
      let s = start.h;
      for (let i = 0; i < xn.length; i += drawConfig.timeWidth) {
        xTime.push({
          left: xn[i].x,
          value: s++
        })
      }
      setXTime(xTime)

      // 绘制数据
      const dataSource = formatterData(data, times, instance);
      dataSource.reduce((a: any, b: any) => [...a, ...b], [])
        .map((item: any) => new Rect(item))
        .forEach((item: any) => {
          if (item.name) {
            instance.custom({
              name: item.name,
              x: item.x,
              y: item.y - 15,
              font: {
                font: '12px "Microsoft YaHei"',
                color: 'red',
                value: item.name,
                textBaseline: 'bottom'
              },
            })
          }
          instance.addElement(item)
        });
      setYData(dataSource)
      console.log(formatterData(data, times, instance), '==formatterData(data)==')
    }
  }, [ref.current])

  return (
    <div style={{ position: 'relative', paddingLeft: 100 }}>
      {/* y 轴刻度 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          background: '#f5f5f5',
          width: 100
        }}
      >
        {
          yData.map((item: any, index:number) => (
            <div
              key={item[0].name}
              style={{
                width: '100%',
                padding: '0 10px',
                height: drawConfig.itemHeight,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                lineHeight: '26px',
                cursor: 'pointer'
              }}
            >{item[0].name}</div>
          ))
        }
      </div>
      <div
        style={{
          ...style
        }}
        ref={containerRef}
      >
        <canvas ref={ref}></canvas>
        {/* x 轴刻度 */}
        <div style={{ position: 'relative', height: 20 }}>
          {
            xTime.map((item: any) => (
              <div
                key={item.value}
                style={{
                  position: 'absolute',
                  transform: 'translateX(-50%)',
                  bottom: 0,
                  left: item.left
                }}
              >{item.value}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
