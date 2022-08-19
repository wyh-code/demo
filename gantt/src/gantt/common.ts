export const lightLineColor = 'rgba(0,0,0,0.08)'
export const darkLineColor = 'rgba(0,0,0,0.4)'


// 冗余偏移量
export const OFFSET = 1

// 默认每一栏高度
export const ITEM_HEIGHT = 50;

// 默认每小时宽度
export const ITEM_WIDTH = 100;

// 刻度高度
export const LINE_WIDTH = 6
// 坐标轴高
export const LINE_HEIGHT = 0.1

// 获取dom样式
export const getStyle = (node:any) => {
  const styles = getComputedStyle(node);
  const width =  parseFloat(styles.width);
  const height =  parseFloat(styles.height);
  const borderLeftWidth =  parseFloat(styles.borderLeftWidth);
  const borderRightWidth =  parseFloat(styles.borderRightWidth);
  const borderTopWidth =  parseFloat(styles.borderTopWidth);
  const borderBottomWidth =  parseFloat(styles.borderBottomWidth);
  const paddingLeft =  parseFloat(styles.paddingLeft);
  const paddingRight =  parseFloat(styles.paddingRight);
  const paddingTop =  parseFloat(styles.paddingTop);
  const paddingBottom =  parseFloat(styles.paddingBottom);

  return {
    width: width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight,
    height: height - borderTopWidth - borderBottomWidth - paddingTop - paddingBottom,
  }
}

// 获取时间
export const formaterTime = (time:number) => {

  if(!time) {
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
  const times = data.map((item:any) => item?.taskrunDTOList[0]?.startExecDate);
  const max = Math.max(...times);
  const min = Math.min(...times);
  // console.log(max, min)
  return {
    start: {
      time: min,
      h: formaterTime(min).h
    },
    end: {
      time: max,
      h: formaterTime(max).h
    },
    len: formaterTime(max).h + 1 - formaterTime(min).h
  }
}

