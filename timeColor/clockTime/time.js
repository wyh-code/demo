
function getMonths() {
  const date = new Date;
  const Y = date.getFullYear();

  const months = [];
  for (let i = 0; i < 12; i++) {
    const month = +new Date(Y, i, 1, 0, 0, 0);
    months.push({
      time: month,
      date: (new Date(month)).toLocaleString(),
      color: packColor(month)
    })
  }

  return months;
}

function getWeeks() {
  const date = new Date;
  const Y = date.getFullYear();
  const M = date.getMonth();
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  const week = 24 * 60 * 60 * 1000 * 7;

  // 循环找到第一个周日
  let startDate = new Date(Y, 0, 1, 0, 0, 0);
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() + 1);
  }

  const startWeek = +(new Date(Y, 0, startDate.getDate(), 0, 0, 0));
  const weeks = [];
  let lastWeek = startWeek;

  for (let i = 0; i < 53; i++) {
    if ((new Date(lastWeek)).getFullYear() === Y) {
      weeks.push({
        time: lastWeek,
        date: (new Date(lastWeek)).toLocaleString(),
        color: packColor(lastWeek)
      })
      lastWeek = lastWeek + week;
    }
  }

  return weeks;
}


function getRing(options) {
  const { type, clockwise=true, vdPower=1, pointRadius = 1, startDeg = 0, endDeg = 360, ringWidth = 10 } = options;
  let rings = [];
  switch (type) {
    case 'year':
      break;
    case 'month':
      rings = getMonths();
      break;
    case 'week':
      rings = getWeeks();
      break;
  }
  const dpr = window.devicePixelRatio;
  const degRang = Math.abs(endDeg - startDeg);
  for (let i = 0; i < rings.length; i++) {
    const day = rings[i];
    const ring = new Ring({
      ...options,
      ...day,
      length: rings.length,
      i,
      vdPower,
      clockwise,
      degRang,
      gap: (360 - degRang) / 2,
      pointRadius, ringWidth, dpr
    });
    rings.splice(i, 1, ring);
  }

  return rings;
}
