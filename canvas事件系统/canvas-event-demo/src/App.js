import { useEffect, useRef } from 'react';
// import { EventCanvas, Circle, Rect } from 'event-canvas'
import { EventCanvas } from './event-canvas'

function App() {
  const ref = useRef();
  // console.log('---==--', window.newAjax)
  useEffect(() => {
    console.log('-----', window.newAjax)

    fetch('https://self.mockdata.cn/config/data.json')

    if(ref.current) return;
    ref.current = true;
    // const eventCanvas = new EventCanvas({
    //   canvas: document.getElementById('canvas'),
    //   data: [
    //     {
    //       name: '绿圆',
    //       x: 100,
    //       y: 100,
    //       radius: 50,
    //       fillColor: 'green',
    //       type: 'circle'
    //     },
    //     {
    //       name: '矩形',
    //       x: 200,
    //       y: 200,
    //       width: 200,
    //       height: 200,
    //       fillColor: 'red',
    //       type: 'rect'
    //     },
    //   ]
    // })
  }, [])

  return (
    <div className="App" style={{ border: '1px solid red' }}>
    root
      {/* <canvas id="canvas" style={{ width: '800px', height: '500px' }}></canvas> */}

      <button id="btn">动态添加元素 </button>
      <button id="custom">自定义添加 </button>
    </div>
  );
}

export default App;
