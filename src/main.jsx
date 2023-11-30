import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MyTerminal from './Terminal.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <MyTerminal />
  </React.StrictMode>,
)
