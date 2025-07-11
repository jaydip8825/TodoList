import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Totdo from'../src/assets/Todo.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Totdo />
  </StrictMode>,
)
