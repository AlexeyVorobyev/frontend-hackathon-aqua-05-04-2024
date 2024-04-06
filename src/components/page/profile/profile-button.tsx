import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import { FC, ReactElement } from "react";

interface IProps {
    icon: ReactElement,
    text: string,
    onClick?: () => void
};

export const ProfileButton: FC<IProps> = (props: IProps) => {
    const theme = useTheme();

    return <>
        <Button sx={{ p: '0', borderRadius: '24px', overflow: 'hidden', flexShrink: '0' }} onClick={props.onClick ?? (() => { })}>
            <Paper elevation={0} sx={{ backgroundColor: '#ECEDFF', width: '100%', textTransform: 'initial', padding: '20px' }}>
                <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={theme.spacing(1)}>
                    {props.icon}

                    <Typography variant={'h5'} sx={{ flexGrow: '1', textAlign: 'left' }}>
                        {props.text}
                    </Typography>

                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0478 6.38128C11.3895 6.03957 11.9435 6.03957 12.2852 6.38128L19.2852 13.3813C19.6269 13.723 19.6269 14.277 19.2852 14.6187L12.2852 21.6187C11.9435 21.9604 11.3895 21.9604 11.0478 21.6187C10.7061 21.277 10.7061 20.723 11.0478 20.3813L17.429 14L11.0478 7.61872C10.7061 7.27701 10.7061 6.72298 11.0478 6.38128Z" fill="#19C595" />
                    </svg>
                </Stack>
            </Paper>
        </Button>
    </>;
}