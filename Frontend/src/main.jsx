import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter } from "react-router-dom";
import App from './App.jsx'
import 'animate.css'; // ✅ Add this line here


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>

    <App />
    </HashRouter>

  </StrictMode>,
)
