import {FC, useEffect, useState} from 'react'
import {Stack, SwipeableDrawer, useTheme} from '@mui/material'
import {useReactiveVar} from '@apollo/client'
import {pickedPlaceId} from '../../../core/apollo/vars.ts'

interface IProps {
    id: string
}

export const PlaceCardDrawer:FC<IProps> = () => {
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        setOpen(true)
    }, [])

    const theme = useTheme()

    const pickedPlaceIdVar = useReactiveVar(pickedPlaceId)

    return (
        <SwipeableDrawer
            anchor={'bottom'}
            open={open}
            sx={{
                'MuiDrawer-paperAnchorBottom': {
                    borderRadius: "20px 20px 0 0"
                }
            }}
            onClose={() => {
                setOpen(false)
                setTimeout(() => {
                    pickedPlaceId(null)
                },400)
            }}
            onOpen={() => setOpen(true)}
        >
            <Stack direction={'column'} padding={theme.spacing(2)}>
                <div style={{height: '100px'}}></div>
            </Stack>
        </SwipeableDrawer>
    )
}