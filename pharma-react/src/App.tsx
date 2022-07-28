import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import TopBar from './components/TopBar'
import Routes from './routes/Routes'

const App: React.FC = () => (
  <div>
    <TopBar />
    <Router>
      <Routes />
    </Router>
  </div>
)

export default App
