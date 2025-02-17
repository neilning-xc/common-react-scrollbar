import { useState } from 'react'
import Scroll from '../dist/index.esm.js'
import '../dist/index.css';

function App() {

  return (
    <div className='app'>
      <Scroll height={400} width={400}>
        <div style={{ width: 1200, height: 1200, background: 'linear-gradient(135deg, #646cff, #f6ff64)' }}></div>
      </Scroll>
    </div>
  )
}

export default App
