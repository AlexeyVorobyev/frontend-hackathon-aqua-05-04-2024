import {FC} from 'react'
import {Button, Stack, Typography, useTheme} from '@mui/material'
import {AlexLink} from '../../../shared-react-components/AlexLink/AlexLink.tsx'

export const NotExistPage: FC = () => {
    const theme = useTheme()

    return (
        <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={theme.spacing(2)}
               height={'100%'}>
            <Typography variant={'h3'}>404 :(</Typography>
            <Typography variant={'h4'}>Такой страницы не существует</Typography>
            <AlexLink to={'/'}>
                <Button variant={'contained'}>
                    <Typography variant={'button'}>Вернуться на главную</Typography>
                </Button>
            </AlexLink>
        </Stack>
    )
}