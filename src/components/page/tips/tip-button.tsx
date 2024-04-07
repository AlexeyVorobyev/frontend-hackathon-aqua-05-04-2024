import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import { FC, ReactElement, ReactNode } from "react";

interface IProps {
    icon: ReactElement,
    onClick?: () => void,
    children: ReactNode
};

export const TipButton: FC<IProps> = (props: IProps) => {
    const theme = useTheme();

    return <>
        <Button sx={{ p: '0', borderRadius: '24px', flexShrink: '0' }} onClick={props.onClick ?? (() => { })}>
            <Paper elevation={2} sx={{ width: '100%', borderRadius: '24px', textTransform: 'initial', padding: '20px' }}>
                <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={theme.spacing(1)}>
                    {props.icon}

                    <Typography variant={'h5'} sx={{ flexGrow: '1', textAlign: 'left' }}>
                        {props.children}
                    </Typography>

                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0483 6.38128C11.39 6.03957 11.944 6.03957 12.2857 6.38128L19.2857 13.3813C19.6274 13.723 19.6274 14.277 19.2857 14.6187L12.2857 21.6187C11.944 21.9604 11.39 21.9604 11.0483 21.6187C10.7066 21.277 10.7066 20.723 11.0483 20.3813L17.4295 14L11.0483 7.61872C10.7066 7.27701 10.7066 6.72298 11.0483 6.38128Z" fill="#BB88FF" />
                    </svg>
                </Stack>
            </Paper>
        </Button>
    </>;
}