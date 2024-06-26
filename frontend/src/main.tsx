import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'virtual:windi.css'
import './index.css'
import './../i18n.ts'
import { NewsProvider } from "./utils/NewsContext"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
    <NewsProvider>
    <App />
    </NewsProvider>
    </React.Suspense> 
  </React.StrictMode>,
)
