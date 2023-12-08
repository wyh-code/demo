
function getTime() {
  const date = new Date();
  const Y = date.getFullYear();
  const M = date.getMonth();
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30,31]
  months[1] = (Y % 100 && !(Y % 4)) || (!(Y % 100) && !(Y % 400)) ? 29 : 28;

  const completion = value => `0${value}`.slice(-2);

  return {
    time: `${Y}-${completion(M + 1)}-${completion(D)} ${completion(h)}:${completion(m)}:${completion(s)}`,
    Y: {
      value: completion(Y),
      start: +new Date(Y, 0, 1, 0, 0, 0),
      end: +new Date(Y, 11, 31, 23, 59, 59),
    },
    M: {
      value: completion(M + 1),
      start: +new Date(Y, M, 1, 0, 0, 0),
      end: +new Date(Y, M, months[M], 23, 59, 59),
    },
    D: {
      value: completion(D),
      start: +new Date(Y, M, D, 0, 0, 0),
      end: +new Date(Y, M, D, 23, 59, 59),
    },
    h: {
      value: completion(h),
      start: +new Date(Y, M, D, h, 0, 0),
      end: +new Date(Y, M, D, h, 59, 59),
    },
    m: {
      value: completion(m),
      start: +new Date(Y, M, D, h, m, 0),
      end: +new Date(Y, M, D, h, m, 59),
    },
    s: {
      value: completion(s),
      start: +new Date(Y, M, D, h, m, s),
      end: +new Date(Y, M, D, h, m, s + 1),
    },
  }
}

function packColor(color){
  const str = `000000${color}`;
  return `#${str.slice(-6)}`
}

function getTimeColor(){
  const time = getTime();
  const colorLen = 255 * 255 * 255;
  Object.keys(time).filter(key => key !== 'time').forEach(key => {
    const startColor = (time[key].start % colorLen).toString(16);
    const endColor = (time[key].end % colorLen).toString(16);
    time[key].startColor = packColor(startColor);
    time[key].endColor = packColor(endColor);
  })

  console.log(time)

  return time;
}
