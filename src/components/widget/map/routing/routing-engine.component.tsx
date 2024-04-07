import {FC, useLayoutEffect, useMemo} from 'react'
import {
    TSetStoredOptions,
    TStoredOptions,
} from '../../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import {AlexDialogButton} from '../../../../shared-react-components/AlexDialog/AlexDialogButton.tsx'
import {Button, CircularProgress, Fab, Paper, Stack, SvgIcon, Typography, useTheme} from '@mui/material'
import {AlexIcon} from '../../../../shared-react-components/alex-icon/alex-icon.component.tsx'
import {EMapPageStoredOptions} from '../../../page/map/map-page.component.tsx'
import {createRouteReactive, pickedPlaceId} from '../../../../core/apollo/vars.ts'
import {useMap} from 'react-leaflet'
import {Box} from '@mui/system'
import {useReactiveVar} from '@apollo/client'

interface IProps {
    storedOptions: TStoredOptions,
    setStoredOptions: TSetStoredOptions
    localData: any
}

export type TRouteEngineElem = {
    id: string,
    name: string,
    coordinates: {
        lat: number
        lon: number
    }
}


export const RoutingEngine: FC<IProps> = ({
                                              storedOptions,
                                              setStoredOptions,
                                              localData
                                          }) => {

    const route: TRouteEngineElem[] | undefined = useMemo(() => storedOptions.get(EMapPageStoredOptions.route), [storedOptions])

    useLayoutEffect(() => {
        if (route) {
            return
        }

        setStoredOptions((prev) => {
            prev.set(EMapPageStoredOptions.route, [])
            return new Map(prev)
        })
    }, [route])

    const theme = useTheme()

    const map = useMap()

    return (
        <AlexDialogButton
            button={(
                <Fab color="secondary" aria-label="edit" sx={{width: '64px', height: '64px'}}>
                    <AlexIcon color={'#ffffff'} icon={(
                        <SvgIcon>
                            <svg width="26" height="23" viewBox="0 0 26 23" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M22 15C21.1132 15.0008 20.2517 15.2958 19.5505 15.8387C18.8493 16.3815 18.3479 17.1417 18.125 18H6C4.93913 18 3.92172 17.5786 3.17157 16.8284C2.42143 16.0783 2 15.0609 2 14C2 12.9391 2.42143 11.9217 3.17157 11.1716C3.92172 10.4214 4.93913 10 6 10H18C19.3261 10 20.5979 9.47322 21.5355 8.53553C22.4732 7.59785 23 6.32608 23 5C23 3.67392 22.4732 2.40215 21.5355 1.46447C20.5979 0.526784 19.3261 0 18 0H6C5.73478 0 5.48043 0.105357 5.29289 0.292893C5.10536 0.48043 5 0.734784 5 1C5 1.26522 5.10536 1.51957 5.29289 1.70711C5.48043 1.89464 5.73478 2 6 2H18C18.7956 2 19.5587 2.31607 20.1213 2.87868C20.6839 3.44129 21 4.20435 21 5C21 5.79565 20.6839 6.55871 20.1213 7.12132C19.5587 7.68393 18.7956 8 18 8H6C4.4087 8 2.88258 8.63214 1.75736 9.75736C0.632141 10.8826 0 12.4087 0 14C0 15.5913 0.632141 17.1174 1.75736 18.2426C2.88258 19.3679 4.4087 20 6 20H18.125C18.312 20.7243 18.6984 21.3816 19.2402 21.8974C19.7821 22.4131 20.4577 22.7666 21.1903 22.9176C21.923 23.0687 22.6833 23.0112 23.3849 22.7519C24.0866 22.4925 24.7014 22.0416 25.1596 21.4503C25.6179 20.859 25.9011 20.1511 25.9772 19.4069C26.0533 18.6628 25.9192 17.9122 25.5902 17.2404C25.2611 16.5686 24.7502 16.0026 24.1156 15.6065C23.481 15.2105 22.748 15.0004 22 15ZM22 21C21.6044 21 21.2178 20.8827 20.8889 20.6629C20.56 20.4432 20.3036 20.1308 20.1522 19.7654C20.0009 19.3999 19.9613 18.9978 20.0384 18.6098C20.1156 18.2219 20.3061 17.8655 20.5858 17.5858C20.8655 17.3061 21.2219 17.1156 21.6098 17.0384C21.9978 16.9613 22.3999 17.0009 22.7654 17.1522C23.1308 17.3036 23.4432 17.56 23.6629 17.8889C23.8827 18.2178 24 18.6044 24 19C24 19.5304 23.7893 20.0391 23.4142 20.4142C23.0391 20.7893 22.5304 21 22 21Z"
                                />
                            </svg>
                        </SvgIcon>
                    )}/>
                </Fab>
            )}
            dialog={{
                title: 'Пункты маршрута',
                body: (<Box sx={{
                    padding: '20px',
                }}>
                        <>
                            <Stack
                                direction={'column'}
                                spacing={theme.spacing(1)}
                                width={'100%'}
                            >
                                {route?.map((item) => (
                                    <Paper
                                        elevation={1}
                                        sx={{padding: theme.spacing(1)}}
                                        onClick={() => {
                                            pickedPlaceId(item.id)
                                            map.setView([
                                                item.coordinates.lat,
                                                item.coordinates.lon,
                                            ], 20)
                                        }}
                                    >
                                        <Stack direction={'row'} spacing={theme.spacing(1)}>
                                            <AlexIcon icon={(
                                                <SvgIcon>
                                                    <svg width="9" height="13" viewBox="0 0 9 13" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M8.15625 11.375H5.64461C6.06653 10.9983 6.46442 10.5955 6.83594 10.1689C8.22988 8.56578 8.96875 6.87578 8.96875 5.28125C8.96875 4.09606 8.49794 2.95942 7.65988 2.12137C6.82183 1.28331 5.68519 0.8125 4.5 0.8125C3.31481 0.8125 2.17817 1.28331 1.34012 2.12137C0.502063 2.95942 0.03125 4.09606 0.03125 5.28125C0.03125 6.87578 0.768086 8.56578 2.16406 10.1689C2.53558 10.5955 2.93347 10.9983 3.35539 11.375H0.84375C0.736006 11.375 0.632675 11.4178 0.556488 11.494C0.480301 11.5702 0.4375 11.6735 0.4375 11.7812C0.4375 11.889 0.480301 11.9923 0.556488 12.0685C0.632675 12.1447 0.736006 12.1875 0.84375 12.1875H8.15625C8.26399 12.1875 8.36733 12.1447 8.44351 12.0685C8.5197 11.9923 8.5625 11.889 8.5625 11.7812C8.5625 11.6735 8.5197 11.5702 8.44351 11.494C8.36733 11.4178 8.26399 11.375 8.15625 11.375ZM0.84375 5.28125C0.84375 4.31155 1.22896 3.38157 1.91464 2.69589C2.60032 2.01021 3.5303 1.625 4.5 1.625C5.4697 1.625 6.39968 2.01021 7.08536 2.69589C7.77104 3.38157 8.15625 4.31155 8.15625 5.28125C8.15625 8.18746 5.33941 10.6133 4.5 11.2734C3.66059 10.6133 0.84375 8.18746 0.84375 5.28125ZM6.53125 5.28125C6.53125 4.87951 6.41212 4.48679 6.18892 4.15275C5.96573 3.81871 5.64849 3.55836 5.27733 3.40462C4.90616 3.25088 4.49775 3.21065 4.10372 3.28903C3.7097 3.36741 3.34776 3.56086 3.06369 3.84494C2.77961 4.12901 2.58616 4.49095 2.50778 4.88497C2.4294 5.279 2.46963 5.68741 2.62337 6.05858C2.77711 6.42974 3.03746 6.74698 3.3715 6.97017C3.70554 7.19337 4.09826 7.3125 4.5 7.3125C5.03872 7.3125 5.55538 7.09849 5.93631 6.71756C6.31724 6.33663 6.53125 5.81997 6.53125 5.28125ZM3.28125 5.28125C3.28125 5.0402 3.35273 4.80457 3.48665 4.60415C3.62056 4.40373 3.81091 4.24752 4.0336 4.15527C4.2563 4.06303 4.50135 4.03889 4.73777 4.08592C4.97418 4.13294 5.19134 4.24902 5.36179 4.41946C5.53223 4.58991 5.64831 4.80707 5.69533 5.04348C5.74236 5.2799 5.71822 5.52495 5.62598 5.74765C5.53373 5.97034 5.37752 6.16069 5.1771 6.2946C4.97668 6.42852 4.74105 6.5 4.5 6.5C4.17677 6.5 3.86677 6.3716 3.63821 6.14304C3.40965 5.91448 3.28125 5.60448 3.28125 5.28125Z"
                                                            fill="#19C595"/>
                                                    </svg>
                                                </SvgIcon>
                                            )}/>
                                            <Typography>
                                                {item.name}
                                            </Typography>

                                        </Stack>
                                    </Paper>
                                ))}
                            </Stack>

                            <Box width={'100%'} marginTop={'20px'}>
                                <Button id={'dude'} variant={'contained'} fullWidth onClick={() => {
                                    setTimeout(() => {
                                        createRouteReactive(false)
                                    },1)
                                    setTimeout(() => {
                                        createRouteReactive(true)
                                    },1000)
                                }}>
                                    Построить маршрут!
                                </Button>
                            </Box>
                            <Box width={'100%'} marginTop={'20px'}>
                                <Button id={'dude2'} color={'secondary'} variant={'contained'} fullWidth onClick={() => {
                                    if (route) {
                                        const url = new URL(
                                            'https://yandex.ru/maps/?ll=46.108264%2C57.749737&mode=routes&rtt=auto&ruri=~~~&z=5.93'
                                        )
                                        const constructedRoute = route
                                            .map((item) => `${item.coordinates.lat}%2C${item.coordinates.lon}`)

                                        window.location.replace(
                                            'https://yandex.ru/maps/?mode=routes&rtt=auto&ruri=~~~&z=5.93'
                                            + `&rtext=${constructedRoute?.join('~')}`
                                            + `&ll=${route[0].coordinates.lat}%2C${route[0].coordinates.lon}`
                                        )
                                    }
                                }}>
                                    Экспортировать маршрут (Яндекс-карты)
                                </Button>
                            </Box>
                            <Box width={'100%'} marginTop={'20px'}>
                                <Button id={'dude2'} color={'error'} variant={'contained'} fullWidth onClick={() => {
                                    setStoredOptions((prev) => {
                                        prev.delete(EMapPageStoredOptions.route)
                                        return new Map(prev)
                                    })
                                    setTimeout(() => {
                                        createRouteReactive(false)
                                        createRouteReactive(true)
                                    },1000)
                                }}>
                                    Сбросить маршрут
                                </Button>
                            </Box>
                        </>
                </Box>),
            }}
        />
    )
}