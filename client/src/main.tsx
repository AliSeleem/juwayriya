import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import Router from './config/Routes.tsx'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider direction='rtl' theme={{token: {colorPrimaryBg: "#51145B"}}}>
      <RouterProvider router={Router} />
    </ConfigProvider>
  </StrictMode>,
)
