import React, { FC } from 'react'
import { GlobalStyles } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { BrowserRouter } from 'react-router-dom'
import { AlexToastProvider } from './shared-react-components/AlexToastProvider/AlexToastProvider.tsx'
import { LoginShell } from './LoginShell.tsx'
import { ApolloProviderWithClient } from './core/apollo/apollo-provider-with-client.tsx'
import {globalStyles, theme} from './core/theme/theme.ts'
import {GeolocationProcessor} from './core/geolocation/geolocation.processor.ts'

const App: FC = () => (
    <ApolloProviderWithClient>
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={globalStyles()}/>
            <BrowserRouter>
                <GeolocationProcessor/>
                <AlexToastProvider>
                    <LoginShell/>
                </AlexToastProvider>
            </BrowserRouter>
        </ThemeProvider>
    </ApolloProviderWithClient>
)

export default App
