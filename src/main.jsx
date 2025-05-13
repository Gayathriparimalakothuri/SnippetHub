import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CodeSnippetProvider } from './stores/CodeSnippetContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CodeSnippetProvider>
      <App />
    </CodeSnippetProvider>
  </StrictMode>,
)
