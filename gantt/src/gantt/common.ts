// 图表配置信息
export const drawConfig = {
  // 防止绘图贴边，添加冗余量
  offset: 1,
  // 默认每一栏高度
  itemHeight: 50,
  // 默认每小时占两格
  timeWidth: 2,
  // 坐标线宽度
  lineWidth: 0.1,
  // 刻度长度
  graduation: 6,
  // 坐标轴颜色
  lightLineColor: 'rgba(0,0,0,0.08)',
  // 刻度颜色
  darkLineColor: 'rgba(0,0,0,0.4)',
}

// 计算函数
export const computer = (num: number) => {
  
}

// 获取dom样式
export const getStyle = (node: any) => {
  const styles = getComputedStyle(node);
  const width = parseFloat(styles.width);
  const height = parseFloat(styles.height);
  const borderLeftWidth = parseFloat(styles.borderLeftWidth);
  const borderRightWidth = parseFloat(styles.borderRightWidth);
  const borderTopWidth = parseFloat(styles.borderTopWidth);
  const borderBottomWidth = parseFloat(styles.borderBottomWidth);
  const paddingLeft = parseFloat(styles.paddingLeft);
  const paddingRight = parseFloat(styles.paddingRight);
  const paddingTop = parseFloat(styles.paddingTop);
  const paddingBottom = parseFloat(styles.paddingBottom);

  return {
    width: width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight,
    height: height - borderTopWidth - borderBottomWidth - paddingTop - paddingBottom,
  }
}

// 获取时间
export const formaterTime = (time: number) => {

  if (!time) {
    time = +new Date;
  };
  const d = new Date(time)

  const year = d.getFullYear();
  const month = d.getMonth();
  const date = d.getDate();
  const h = d.getHours()
  const m = d.getMinutes()
  const s = d.getSeconds()


  return {
    year,
    month,
    date,
    h,
    m,
    s
  }
}

/**
 * 获取横跨时间区间
 * @param data 
 * @returns 
 */
export const getTimes = (data: any) => {
  // 因为现在 taskrunDTOList 中只有一条数据，所以可直接用下标来取，若有多条数据时，此逻辑要重写
  const times = data.map((item: any) => (
    [
      item?.taskrunDTOList[0]?.startExecDate,
      item?.taskrunDTOList[0]?.endExecDate
    ]
  )).reduce((a: any, b: any) => {
    return [...a, ...b]
  }, []);
  const max = Math.max(...times);
  const min = Math.min(...times);

  const start = {
    time: min,
    h: formaterTime(min).h
  }
  const end = {
    time: max,
    h: formaterTime(max).h + 1 > 24 ? 24 : formaterTime(max).h + 1
  }

  return {
    start,
    end,
    max,
    min,
    len: end.h - start.h
  }
}

/**
 * 数据格式化
 * @param data 
 */
export function formatterData (data:any, times:any, instance: any){
  return data.map((item: any, index:number) => {

    // 计算起止点坐标
    const { taskrunDTOList, avgDuration } = item;
    const {startExecDate, endExecDate} = taskrunDTOList[0];
    const maxTime = formaterTime(times.max)
    const minTime = formaterTime(times.min)

    const maxDate = +new Date(maxTime.year, maxTime.month, maxTime.date, times.end.h)
    const minDate = +new Date(minTime.year, minTime.month, minTime.date, times.start.h)
    
    const startX = (startExecDate - minDate) / (maxDate - minDate) * instance.width;
    const endX = (endExecDate - minDate) / (maxDate - minDate) * instance.width;
    const startY = index * drawConfig.itemHeight + 15;
    const height = 10;

    return [
      {
        x: startX,
        y: startY,
        width: endX - startX,
        height,
        type: 'rect',
        fillColor: 'green',
        name: item.nodeName,
        item
      },
      {
        x: startX,
        y: startY + height + height / 4,
        width: endX - startX,
        height,
        type: 'rect',
        fillColor: 'rgba(75,173,58,0.40)',
        item
      }
    ]
  })
}
