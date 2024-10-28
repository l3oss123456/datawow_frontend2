import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { ConfigProvider } from 'antd'
import './index.css'
// import App from "./App.tsx";
import Router from './routers/index'
import styleShare from './utils/shares/styleShare.module.scss'
import { colors, muiTheme } from './configs/theme'

if (process.env.NODE_ENV === 'production') {
    console.log = () => {}
    console.error = () => {}
    console.debug = () => {}
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={muiTheme}>
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: 'IBM Plex Sans',
                        colorPrimary: '#5DC0EA'
                    }
                }}
            >
                <div
                    style={{
                        // background: colors.base.grey100,
                        width: '100vw',
                        height: '100vh',
                        color: colors.base.text
                        // overflowY: 'auto'
                    }}
                    className={styleShare.background}
                >
                    <Router />
                </div>
            </ConfigProvider>
        </ThemeProvider>

        {/* <App /> */}
    </StrictMode>
)
