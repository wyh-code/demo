import { useEffect, useRef } from 'react';
import { EventCanvas, Circle, Rect } from 'event-canvas'
// import EventCanvas, { a } from './event-canvas'

function App() {
  const ref = useRef();
  useEffect(() => {
    console.log('effect', 'a')
    const eventCanvas = new EventCanvas({
      canvas: document.getElementById('canvas'),
      data: [
        {
          name: '绿圆',
          x: 100,
          y: 100,
          radius: 50,
          fillColor: 'green',
          type: 'circle'
        },
        {
          name: '矩形',
          x: 200,
          y: 200,
          width: 200,
          height: 200,
          fillColor: 'red',
          type: 'rect',
          click:() => {
            console.log('click')
          },
          drag: (event, options) => {},
        },
      ]
    })
  }, [])

  return (
    <div className="App" style={{ border: '1px solid red' }}>
      <canvas id="canvas" style={{ width: '800px', height: '500px' }}></canvas>
    </div>
  );
}

export default App;
