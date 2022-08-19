import { useEffect, useRef, useState } from 'react';
import { EventCanvas, Rect } from 'event-canvas';
// import { EventCanvas, Rect } from '@/event-canvas';
import {
  OFFSET,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  getStyle,
  getTimes
} from './common';
import formatterData from './formatterData'
import getLine from './line';

export default ({ data }: any) => {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const [style, setstyle] = useState({})

  useEffect(() => {
    if (containerRef.current) {
      // 设置容器样式
      setstyle(setStyle())

      // 设置画布宽高
      if (ref.current) {
        const instance = new EventCanvas({
          canvas: ref.current,
          data: []
        })
        // 绘制坐标
        const [x, y, xn] = getLine(instance);
        [...x, ...y, ...xn].map(item => new Rect(item))
          .forEach(item => instance.addElement(item));

        // 刻度
        const time = getTimes(data);
        console.log(time, '==time==')
      }
    }
  }, [containerRef.current, ref.current])

  /**
   * 设置画布容器宽高
   */
  const setStyle = () => {
    const style: any = {
      width: '100%',
      height: '100%',
      border: '1px solid green',
      padding: '10px 10px 30px 60px'
    };

    const { width, height } = getStyle(containerRef.current);

    /**
     * 如果容器宽高小于默认宽高，则最小为默认宽高
     */
    // 获取时间跨度
    const { len } = getTimes(data);
    if (width < (len + OFFSET) * ITEM_WIDTH) {
      style.width = (len + OFFSET) * ITEM_WIDTH
    }
    if (height < (data.length + OFFSET) * ITEM_HEIGHT) {
      style.height = (data.length + OFFSET) * ITEM_HEIGHT
    }
    return style
  }

  return (
    <div style={style} ref={containerRef}>
      <canvas ref={ref}></canvas>
    </div>
  )
}
