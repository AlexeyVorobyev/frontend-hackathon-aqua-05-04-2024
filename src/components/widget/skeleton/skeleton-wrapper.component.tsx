import {FC, ReactNode} from 'react'
import {Box, useTheme} from '@mui/material'
import {AlexErrorBoundary} from '../../../shared-react-components/AlexErrorBoundary/AlexErrorBoundary.tsx'
import {
    AlexMobileBottomNavigation
} from '../../../shared-react-components/alex-mobile-bottom-navigation/alex-mobile-bottom-navigation.component.tsx'
import {alexBottomMobileNavigationConfigData} from '../../../config/alex-bottom-mobile-navigation-config.data.tsx'

interface IProps {
    children: ReactNode
}

export const SkeletonWrapper: FC<IProps> = ({children}) => {

    const theme = useTheme()

    return (
        <Box width={'100%'} height={'100dvh'}>
            <AlexErrorBoundary>
                {children}
            </AlexErrorBoundary>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                position: 'absolute',
                zIndex: 500,
                bottom: 0,
                padding: '25px',
                boxSizing:"border-box",
            }}>
                <AlexMobileBottomNavigation config={alexBottomMobileNavigationConfigData}/>
            </Box>
        </Box>
    )
}

