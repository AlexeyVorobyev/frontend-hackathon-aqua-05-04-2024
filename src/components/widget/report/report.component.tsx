import {Paper, Stack, SvgIcon, Typography, useTheme} from '@mui/material'
import {FC} from 'react'

interface IProps {
    name: string
    date: string
    desc: string,
    rating: number
}

export const Report: FC<IProps> = ({
                                       name,
                                       date,
                                       desc,
                                       rating,
                                   }) => {

    const theme = useTheme()

    return (
        <Paper elevation={3} sx={{padding: theme.spacing(2), borderRadius:'20px'}}>
            <Stack direction={'column'} spacing={theme.spacing(1)}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant={'h4'}>
                        {name}
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        {date}
                    </Typography>
                    <Stack direction={'row'} spacing={theme.spacing(0.5)}>
                        {(Array(rating).fill(1)).map((item, index) => (
                            <SvgIcon>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.27999 0.911804C6.35335 0.78591 6.45845 0.681453 6.58478 0.608853C6.71112 0.536253 6.85428 0.498047 6.99999 0.498047C7.1457 0.498047 7.28886 0.536253 7.4152 0.608853C7.54153 0.681453 7.64663 0.78591 7.71999 0.911804L9.58332 4.11047L13.202 4.89447C13.3443 4.9254 13.4761 4.9931 13.5841 5.09083C13.6921 5.18855 13.7726 5.31288 13.8176 5.45142C13.8626 5.58996 13.8705 5.73788 13.8405 5.88042C13.8105 6.02296 13.7437 6.15515 13.6467 6.2638L11.18 9.02447L11.5533 12.7078C11.5681 12.8528 11.5445 12.9992 11.4849 13.1323C11.4254 13.2654 11.332 13.3805 11.2141 13.4662C11.0961 13.5519 10.9578 13.6051 10.8128 13.6206C10.6679 13.6361 10.5214 13.6133 10.388 13.5545L6.99999 12.0611L3.61199 13.5545C3.4786 13.6133 3.33212 13.6361 3.18716 13.6206C3.0422 13.6051 2.90385 13.5519 2.7859 13.4662C2.66796 13.3805 2.57457 13.2654 2.51504 13.1323C2.45551 12.9992 2.43193 12.8528 2.44666 12.7078L2.81999 9.02447L0.353323 6.26447C0.256142 6.15582 0.18916 6.02358 0.159066 5.88095C0.128971 5.73832 0.136817 5.59029 0.181819 5.45164C0.226821 5.31299 0.307406 5.18857 0.415527 5.0908C0.523649 4.99303 0.655525 4.92534 0.79799 4.89447L4.41666 4.11047L6.27999 0.911804Z"
                                        fill="#FFCF08"/>
                                </svg>
                            </SvgIcon>
                        ))}
                    </Stack>
                </Stack>
                <Typography variant={'body1'}>
                    {desc}
                </Typography>
            </Stack>
        </Paper>
    )
}