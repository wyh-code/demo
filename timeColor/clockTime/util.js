
function packColor(time){
  const colorLen = 255 * 255 * 255;
  const color = (time % colorLen).toString(16);
  const str = `000000${color}`;
  return `#${str.slice(-6)}`
}


function deg(n){
  return (2 * Math.PI) / 360 * n
}