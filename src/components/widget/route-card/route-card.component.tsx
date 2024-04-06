import {FC} from 'react'
import {Button, Grid, Paper, Stack, SvgIcon, Typography, useTheme} from '@mui/material'
import {AlexImageView} from '../../../shared-react-components/form-utils/AlexImageView/AlexImageView.tsx'
import {AlexIcon} from '../../../shared-react-components/alex-icon/alex-icon.component.tsx'
import {PlacesArray} from '../../feature/places-array.component.tsx'
import {AlexDialogButton} from '../../../shared-react-components/AlexDialog/AlexDialogButton.tsx'
import {useNavigate} from 'react-router-dom'

export type TRouteCardData = {
    imageUrl: string
    name: string
    rating: number
    places: string[]
    date: string
}

interface IProps {
    data: TRouteCardData
    linkTo: string
}

export const RouteCard: FC<IProps> = ({
                                          data,
                                          linkTo,
                                      }) => {
    const theme = useTheme()

    const navigate = useNavigate()

    return (
        <Paper sx={{
            padding: '10px',
            borderRadius: '20px'
        }} elevation={3}>
            <Stack direction={'row'} spacing={theme.spacing(2)}>
                <AlexImageView src={data.imageUrl} paperStyles={{borderRadius: '20px'}}/>

                <Stack direction={'column'} spacing={theme.spacing(1)}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant={'h5'}>
                            {data.name}
                        </Typography>

                        <Stack direction={'row'} alignItems={'center'} spacing={theme.spacing(1)}>
                            <AlexIcon icon={(
                                <SvgIcon>
                                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M21.6676 7.88943C21.5736 7.59961 21.3964 7.34385 21.158 7.15402C20.9197 6.96418 20.6308 6.84865 20.3273 6.82182L14.5632 6.3249L12.3037 0.951918C12.1861 0.669989 11.9877 0.429167 11.7334 0.259776C11.4792 0.0903857 11.1806 0 10.8751 0C10.5696 0 10.2709 0.0903857 10.0167 0.259776C9.76247 0.429167 9.56405 0.669989 9.44641 0.951918L7.19376 6.3249L1.42285 6.82473C1.11813 6.85034 0.827756 6.96534 0.588136 7.15532C0.348516 7.3453 0.170319 7.60179 0.0758916 7.89264C-0.0185357 8.18349 -0.0249899 8.49574 0.0573385 8.79025C0.139667 9.08475 0.307113 9.34839 0.538678 9.5481L4.91684 13.374L3.60465 19.0556C3.53527 19.353 3.55507 19.6641 3.66157 19.9503C3.76808 20.2364 3.95657 20.4848 4.20348 20.6644C4.45039 20.844 4.74476 20.9468 5.04978 20.96C5.35481 20.9732 5.65696 20.8962 5.91845 20.7386L10.8683 17.7299L15.8288 20.7386C16.0903 20.8962 16.3924 20.9732 16.6974 20.96C17.0025 20.9468 17.2968 20.844 17.5437 20.6644C17.7906 20.4848 17.9791 20.2364 18.0856 19.9503C18.1921 19.6641 18.2119 19.353 18.1426 19.0556L16.8313 13.3682L21.2085 9.5481C21.4401 9.3477 21.6072 9.08331 21.6889 8.78818C21.7706 8.49305 21.7632 8.18036 21.6676 7.88943ZM20.1904 8.37471L15.8132 12.1948C15.6002 12.3801 15.4417 12.62 15.3548 12.8887C15.268 13.1573 15.256 13.4446 15.3202 13.7195L16.6353 19.4109L11.6787 16.4021C11.4369 16.2549 11.1592 16.177 10.876 16.177C10.5929 16.177 10.3152 16.2549 10.0734 16.4021L5.12357 19.4109L6.42993 13.7234C6.49413 13.4485 6.48215 13.1612 6.39528 12.8925C6.30841 12.6239 6.14993 12.384 5.93689 12.1987L1.55776 8.38053C1.5574 8.37763 1.5574 8.3747 1.55776 8.37179L7.32672 7.87293C7.60838 7.8481 7.87791 7.74685 8.10625 7.58009C8.33458 7.41332 8.51305 7.18739 8.62241 6.92664L10.8751 1.56046L13.1267 6.92664C13.2361 7.18739 13.4146 7.41332 13.6429 7.58009C13.8712 7.74685 14.1408 7.8481 14.4224 7.87293L20.1924 8.37179C20.1924 8.37179 20.1924 8.37762 20.1924 8.37859L20.1904 8.37471Z"
                                            fill="#FFBF00"/>
                                        <path
                                            d="M20.1904 8.37471L15.8132 12.1948C15.6002 12.3801 15.4417 12.62 15.3548 12.8887C15.268 13.1573 15.256 13.4446 15.3202 13.7195L16.6353 19.4109L11.6787 16.4021C11.4369 16.2549 11.1592 16.177 10.876 16.177C10.5929 16.177 10.3152 16.2549 10.0734 16.4021L5.12357 19.4109L6.42993 13.7234C6.49413 13.4485 6.48215 13.1612 6.39528 12.8925C6.30841 12.6239 6.14993 12.384 5.93689 12.1987L1.55776 8.38053C1.5574 8.37763 1.5574 8.3747 1.55776 8.37179L7.32672 7.87293C7.60838 7.8481 7.87791 7.74685 8.10625 7.58009C8.33458 7.41332 8.51305 7.18739 8.62241 6.92664L10.8751 1.56046L13.1267 6.92664C13.2361 7.18739 13.4146 7.41332 13.6429 7.58009C13.8712 7.74685 14.1408 7.8481 14.4224 7.87293L20.1924 8.37179C20.1924 8.37179 20.1924 8.37762 20.1924 8.37859L20.1904 8.37471Z"
                                            fill="#FFBF00"/>
                                    </svg>
                                </SvgIcon>
                            )}/>
                            <Typography variant={'h6'} sx={{color: '#FFBF00'}}>
                                {data.rating}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction={'column'} spacing={theme.spacing(0.5)}>
                        <PlacesArray data={data.places}/>

                        <Stack direction={'row'} alignItems={'center'} spacing={theme.spacing(1)}>
                            <AlexIcon icon={(
                                <SvgIcon>
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13 1.875H11.5V1.40625C11.5 1.28193 11.4473 1.1627 11.3536 1.07479C11.2598 0.986886 11.1326 0.9375 11 0.9375C10.8674 0.9375 10.7402 0.986886 10.6464 1.07479C10.5527 1.1627 10.5 1.28193 10.5 1.40625V1.875H5.5V1.40625C5.5 1.28193 5.44732 1.1627 5.35355 1.07479C5.25979 0.986886 5.13261 0.9375 5 0.9375C4.86739 0.9375 4.74021 0.986886 4.64645 1.07479C4.55268 1.1627 4.5 1.28193 4.5 1.40625V1.875H3C2.73478 1.875 2.48043 1.97377 2.29289 2.14959C2.10536 2.3254 2 2.56386 2 2.8125V12.1875C2 12.4361 2.10536 12.6746 2.29289 12.8504C2.48043 13.0262 2.73478 13.125 3 13.125H13C13.2652 13.125 13.5196 13.0262 13.7071 12.8504C13.8946 12.6746 14 12.4361 14 12.1875V2.8125C14 2.56386 13.8946 2.3254 13.7071 2.14959C13.5196 1.97377 13.2652 1.875 13 1.875ZM4.5 2.8125V3.28125C4.5 3.40557 4.55268 3.5248 4.64645 3.61271C4.74021 3.70061 4.86739 3.75 5 3.75C5.13261 3.75 5.25979 3.70061 5.35355 3.61271C5.44732 3.5248 5.5 3.40557 5.5 3.28125V2.8125H10.5V3.28125C10.5 3.40557 10.5527 3.5248 10.6464 3.61271C10.7402 3.70061 10.8674 3.75 11 3.75C11.1326 3.75 11.2598 3.70061 11.3536 3.61271C11.4473 3.5248 11.5 3.40557 11.5 3.28125V2.8125H13V4.6875H3V2.8125H4.5ZM13 12.1875H3V5.625H13V12.1875ZM7 7.03125V10.7812C7 10.9056 6.94732 11.0248 6.85355 11.1127C6.75979 11.2006 6.63261 11.25 6.5 11.25C6.36739 11.25 6.24021 11.2006 6.14645 11.1127C6.05268 11.0248 6 10.9056 6 10.7812V7.78945L5.72375 7.91953C5.60507 7.97516 5.46767 7.98432 5.34178 7.94498C5.2159 7.90564 5.11184 7.82103 5.0525 7.70977C4.99316 7.5985 4.98339 7.46969 5.02535 7.35167C5.06732 7.23366 5.15757 7.1361 5.27625 7.08047L6.27625 6.61172C6.35251 6.57594 6.43726 6.55905 6.52244 6.56264C6.60763 6.56623 6.69042 6.59018 6.76295 6.63222C6.83548 6.67426 6.89533 6.733 6.93682 6.80284C6.97831 6.87268 7.00006 6.95131 7 7.03125ZM10.6975 8.81543L9.5 10.3125H10.5C10.6326 10.3125 10.7598 10.3619 10.8536 10.4498C10.9473 10.5377 11 10.6569 11 10.7812C11 10.9056 10.9473 11.0248 10.8536 11.1127C10.7598 11.2006 10.6326 11.25 10.5 11.25H8.5C8.40714 11.25 8.31612 11.2258 8.23713 11.18C8.15815 11.1342 8.09431 11.0687 8.05279 10.9909C8.01126 10.913 7.99368 10.8259 8.00202 10.7392C8.01036 10.6525 8.04429 10.5696 8.1 10.5L9.89875 8.25176C9.93966 8.20069 9.96902 8.14233 9.98501 8.08025C10.001 8.01817 10.0033 7.95368 9.99173 7.89074C9.98018 7.8278 9.95503 7.76774 9.91783 7.71424C9.88062 7.66074 9.83215 7.61493 9.77538 7.57962C9.71862 7.54431 9.65475 7.52026 9.58771 7.50892C9.52067 7.49759 9.45187 7.49922 9.38552 7.51371C9.31917 7.5282 9.25669 7.55525 9.20189 7.59319C9.1471 7.63114 9.10115 7.67918 9.06688 7.73438C9.03501 7.78938 8.99172 7.83785 8.93955 7.87692C8.88739 7.91599 8.8274 7.94487 8.76314 7.96185C8.69887 7.97884 8.63163 7.98358 8.56538 7.97581C8.49913 7.96803 8.43521 7.9479 8.37739 7.91659C8.31957 7.88528 8.26903 7.84343 8.22874 7.79352C8.18846 7.7436 8.15925 7.68662 8.14283 7.62595C8.12641 7.56527 8.12312 7.50213 8.13316 7.44024C8.14319 7.37836 8.16634 7.31899 8.20125 7.26562C8.36641 6.99767 8.62125 6.78828 8.92626 6.6699C9.23127 6.55153 9.56941 6.53079 9.88827 6.61089C10.2071 6.691 10.4889 6.86748 10.6899 7.11298C10.8909 7.35847 10.9999 7.65927 11 7.96875C11.0011 8.27446 10.8948 8.572 10.6975 8.81543Z"
                                            fill="#FFBF00"/>
                                    </svg>
                                </SvgIcon>
                            )}/>
                            <Typography variant={'h6'} sx={{color: '#FFBF00'}}>
                                {data.date}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction={'row'} justifyContent={'space-between'} spacing={theme.spacing(2)}>
                        <Button variant={'contained'} color={'secondary'}
                                onClick={() => navigate(linkTo)}
                                endIcon={(
                                    <AlexIcon icon={(
                                        <SvgIcon>
                                            <svg width="15" height="13" viewBox="0 0 15 13" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M14.4513 6.92004L9.10758 12.2638C8.99617 12.3752 8.84506 12.4378 8.6875 12.4378C8.52994 12.4378 8.37883 12.3752 8.26742 12.2638C8.15601 12.1524 8.09342 12.0013 8.09342 11.8437C8.09342 11.6862 8.15601 11.535 8.26742 11.4236L12.5981 7.09371H0.96875C0.811278 7.09371 0.660255 7.03116 0.548905 6.91981C0.437556 6.80846 0.375 6.65744 0.375 6.49996C0.375 6.34249 0.437556 6.19147 0.548905 6.08012C0.660255 5.96877 0.811278 5.90621 0.96875 5.90621H12.5981L8.26742 1.57629C8.15601 1.46488 8.09342 1.31377 8.09342 1.15621C8.09342 0.998654 8.15601 0.847547 8.26742 0.736136C8.37883 0.624724 8.52994 0.562134 8.6875 0.562134C8.84506 0.562134 8.99617 0.624724 9.10758 0.736136L14.4513 6.07989C14.5065 6.13503 14.5503 6.20051 14.5802 6.27259C14.6101 6.34467 14.6255 6.42194 14.6255 6.49996C14.6255 6.57799 14.6101 6.65525 14.5802 6.72733C14.5503 6.79941 14.5065 6.8649 14.4513 6.92004Z"
                                                    fill="white"/>
                                            </svg>
                                        </SvgIcon>
                                    )}/>
                                )}>
                            Посмотреть
                        </Button>

                        <AlexDialogButton button={(
                            <Button variant={'contained'} color={'neutral'}>
                                <AlexIcon
                                    color={'#ffffff'} fill={'#ffffff'}
                                    icon={(
                                        <SvgIcon>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12.2194 3.25325C12.2499 2.81247 11.9172 2.43049 11.4764 2.40007C11.0356 2.36964 10.6537 2.7023 10.6232 3.14308L12.2194 3.25325ZM10.7977 12.2344V13.0344C11.2181 13.0344 11.5668 12.7089 11.5958 12.2895L10.7977 12.2344ZM3.22561 12.2344L2.42765 12.2915C2.45761 12.7101 2.80594 13.0344 3.22561 13.0344V12.2344ZM3.37696 3.14107C3.34542 2.70036 2.9626 2.36867 2.5219 2.40021C2.0812 2.43174 1.7495 2.81457 1.78104 3.25527L3.37696 3.14107ZM4.70895 1.62178H9.46305V0.0217773H4.70895V1.62178ZM0.00390625 3.99817H13.9581V2.39817H0.00390625V3.99817ZM10.6232 3.14308L9.99955 12.1793L11.5958 12.2895L12.2194 3.25325L10.6232 3.14308ZM10.7977 11.4344H3.22561V13.0344H10.7977V11.4344ZM4.02357 12.1773L3.37696 3.14107L1.78104 3.25527L2.42765 12.2915L4.02357 12.1773ZM4.93698 5.02255L4.93685 9.98432L6.53685 9.98436L6.53698 5.02259L4.93698 5.02255ZM7.46323 5.02257V9.98434H9.06324V5.02257H7.46323Z"/>
                                            </svg>
                                        </SvgIcon>
                                    )}/>
                            </Button>
                        )} dialog={{
                            title: 'Удалить маршрут?',
                            body: (
                                <Stack direction={'row'} spacing={theme.spacing(2)} padding={theme.spacing(2)}>
                                    <Button
                                        id={'confirmButton'}
                                        sx={{width: '140px'}}
                                        color={'error'}
                                        variant={'contained'}>
                                        <Typography variant={'button'}
                                                    color={theme.palette.error.contrastText}>Удалить</Typography>
                                    </Button>
                                    <Button
                                        id={'cancelButton'}
                                        sx={{width: '140px'}}
                                        color={'neutral'}
                                        variant={'outlined'}>
                                        <Typography variant={'button'}
                                                    color={theme.palette.neutral.notContrastText}>Отмена</Typography>
                                    </Button>
                                </Stack>
                            ),
                        }}/>
                    </Stack>
                </Stack>

            </Stack>
        </Paper>
    )
}