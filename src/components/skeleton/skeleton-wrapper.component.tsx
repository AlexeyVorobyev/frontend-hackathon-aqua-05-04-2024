import {FC, ReactNode} from 'react'
import {Box, useTheme} from '@mui/material'
import {AlexErrorBoundary} from '../../shared-react-components/AlexErrorBoundary/AlexErrorBoundary.tsx'

interface IProps {
    children: ReactNode
}

export const SkeletonWrapper: FC<IProps> = ({children}) => {

    const theme = useTheme()

    return (
        <Box width={'100%'} height={'100%'}>
            <AlexErrorBoundary>
                {children}
            </AlexErrorBoundary>
            {/*<Box height={'70px'} sx={{*/}
            {/*    background: theme.palette.primary.main,*/}
            {/*    boxSizing: 'border-box',*/}
            {/*    padding: theme.spacing(2),*/}
            {/*    boxShadow: 2,*/}
            {/*}}>*/}
            {/*    <Stack alignItems={'center'} direction={'row'} height={'100%'} justifyContent={'space-between'}>*/}
            {/*        <Typography variant={'h3'}*/}
            {/*                    color={theme.palette.primary.contrastText}>{APP_NAME.toUpperCase()}</Typography>*/}
            {/*        <AlexUserPanel/>*/}
            {/*    </Stack>*/}
            {/*</Box>*/}
            {/*<Stack height={'calc(100vh - 70px)'} width={'100%'} direction={'row'}>*/}
            {/*    <AlexSideNavigation config={sideNavigationConfig}/>*/}
            {/*    <Box sx={{flex: '1', height: '100%', width: '0'}}>*/}
            {/*        <AlexErrorBoundary>*/}
            {/*            {children}*/}
            {/*        </AlexErrorBoundary>*/}
            {/*    </Box>*/}
            {/*</Stack>*/}
        </Box>
    )
}

