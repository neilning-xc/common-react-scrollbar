import Scroll from '../dist/index.esm.js'
import '../dist/index.css';

function App() {
  return (
    <div className='app'>
      <div>
        <h2>custom style</h2>
        <Scroll height={400} width={400} scrollbarWidth={10} scrollbarGutter={5} scrollbarRadius={100} scrollbarColor='#f00' scrollbarTrackColor='#0f0'>
          <div style={{ width: 1200, height: 1200, background: 'linear-gradient(135deg, #646cff, #f6ff64)' }}></div>
        </Scroll>

        <h2>ltr</h2>
        <Scroll width={400} height={200} >
          <p style={{ wordBreak: 'break-all', margin: 0, background: 'rgb(204 204 204 / 18%)', width: 800 }}>
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text  
            test text test text  test text  test text  test text  test text  test text  test text
          </p>
        </Scroll>

        <h2>rtl</h2>
        <Scroll height={400} width={400} dir='rtl'>
          <div style={{ width: 1200, height: 1200, background: 'linear-gradient(135deg, #646cff, #f6ff64)' }}></div>
        </Scroll>
      </div>
    </div>
  )
}

export default App
