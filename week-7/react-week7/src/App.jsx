import { useState } from 'react'
import { RecoilRoot } from 'recoil'
import { ColorPalette } from './components/ColorPalette'
import './App.css'

function App() {
  return (
    <div id='App'>
      <RecoilRoot>
        <ColorPalette></ColorPalette>
      </RecoilRoot>
    </div>
  )
}

export default App
