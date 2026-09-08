import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageProvider'
import { MusicProvider } from './context/MusicProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <MusicProvider>
        <App />
      </MusicProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
