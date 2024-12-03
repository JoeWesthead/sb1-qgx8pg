import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { AppRoutes } from './routes';
import { ConfigProvider } from './context/ConfigContext';
import { ThemeProvider } from './context/ThemeContext';
import { PreviewProvider } from './context/PreviewContext';
import { Preview } from './components/Preview';

export default function App() {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <PreviewProvider>
          <BrowserRouter>
            <Box display="flex" minHeight="100vh">
              <Sidebar />
              <Box
                component="main"
                flexGrow={1}
                height="100vh"
                overflow="auto"
                sx={
                  {
                    // transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                  }
                }
              >
                <AppRoutes />
              </Box>
              <Preview />
            </Box>
          </BrowserRouter>
        </PreviewProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}
