import { useEffect, useRef } from 'react';
// import { EventCanvas, Circle, Rect } from 'event-canvas'
import { EventCanvas } from './event-canvas'

function App() {
  const ref = useRef();
  useEffect(() => {
    if(ref.current) return;
    ref.current = true;
    const eventCanvas = new EventCanvas({
      canvas: document.getElementById('canvas'),
      data: [
        {
          name: '绿圆',
          x: 50,
          y: 50,
          radius: 20,
          fillColor: 'green',
          type: 'circle'
        },
        {
          name: '矩形',
          x: 100,
          y: 100,
          width: 50,
          height: 50,
          fillColor: 'red',
          type: 'rect'
        },
      ]
    })
  }, [])

  return (
    <div className="App" style={{ border: '1px solid red' }}>
      <canvas id="canvas" style={{ width: '800px', height: '500px' }}></canvas>

      <button id="btn">动态添加元素 </button>
      <button id="custom">自定义添加 </button>
    </div>
  );
}

export default App;
