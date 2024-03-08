import { useState } from 'react'
import { RecoilRoot } from 'recoil'
import { ColorPalette } from './components/ColorPalette'
import { ParagraphGenerator } from './components/ParagraphGenerator'
import {GithubInfoCard } from './components/GithubInfoCard'
import './App.css'

function App() {
  return (
    <div id='App'>
      <RecoilRoot>
        {/* <ColorPalette></ColorPalette> */}
        {/* <ParagraphGenerator></ParagraphGenerator> */}
        <GithubInfoCard></GithubInfoCard>
      </RecoilRoot>
    </div>
  )
}

export default App
