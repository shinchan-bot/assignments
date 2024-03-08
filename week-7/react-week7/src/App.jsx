import { useState } from 'react'
import { RecoilRoot } from 'recoil'
import { ColorPalette } from './components/ColorPalette'
import { ParagraphGenerator } from './components/ParagraphGenerator'
import './App.css'

function App() {
  return (
    <div id='App'>
      <RecoilRoot>
        {/* <ColorPalette></ColorPalette> */}
        {/* <ParagraphGenerator></ParagraphGenerator> */}
      </RecoilRoot>
    </div>
  )
}

export default App
