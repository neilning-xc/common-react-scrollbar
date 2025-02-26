import Scroll from '../dist/index.esm.js'
import '../dist/index.css';

function App() {
  return (
    <div className='app'>
      <div>
        <h2>rtl</h2>
        <Scroll width={400} height={500} >
          <div style={{ width: 1200, height: 1200, background: 'linear-gradient(135deg, #646cff, #f6ff64)' }}></div>
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
