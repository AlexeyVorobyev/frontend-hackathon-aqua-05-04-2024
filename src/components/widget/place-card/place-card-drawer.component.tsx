import {FC, useEffect, useMemo, useState} from 'react'
import {Box, Button, CircularProgress, Stack, SvgIcon, SwipeableDrawer, Typography, useTheme} from '@mui/material'
import {useLazyQuery, useReactiveVar} from '@apollo/client'
import {pickedPlaceId} from '../../../core/apollo/vars.ts'
import {
    GeoapifyGetPlaceRecordDocument,
    GeoapifyGetPlaceRecordQuery,
} from '../../../core/apollo/types/graphql/graphql.ts'
import {EGraphqlLinks} from '../../../core/apollo/apollo-provider-with-client.tsx'
import {AlexIcon} from '../../../shared-react-components/alex-icon/alex-icon.component.tsx'
import {fetchImageList} from '../../../api/search-image-adapter/search-image-list.ts'
import {AlexImageView} from '../../../shared-react-components/form-utils/AlexImageView/AlexImageView.tsx'
import Slider from 'react-slick'
import {useNavigate} from 'react-router-dom'
import {
    TSetStoredOptions,
    TStoredOptions,
} from '../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import {EMapPageStoredOptions} from '../../page/map/map-page.component.tsx'
import {TRouteEngineElem} from '../map/routing/routing-engine.component.tsx'

interface IProps {
    id: string
    storedOptions: TStoredOptions,
    setStoredOptions: TSetStoredOptions
}

export const PlaceCardDrawer: FC<IProps> = ({
                                                id, storedOptions, setStoredOptions,
                                            }) => {
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        setOpen(true)
    }, [])

    const theme = useTheme()

    const pickedPlaceIdVar: string = useReactiveVar(pickedPlaceId) as string

    const navigate = useNavigate()

    const [
        geoapifyGetPlaceRecordLazyQuery,
        {
            data: geoapifyGetPlaceRecordQueryData,
            loading: geoapifyGetPlaceRecordQueryLoading,
        },
    ] = useLazyQuery<GeoapifyGetPlaceRecordQuery>(GeoapifyGetPlaceRecordDocument, {
        context: {clientName: EGraphqlLinks.geoapify},
    })

    useEffect(() => {
        geoapifyGetPlaceRecordLazyQuery({
            variables: {
                input: {
                    id: pickedPlaceIdVar,
                    language: 'russian',
                },
            },
        })
    }, [pickedPlaceIdVar])

    const placeData = useMemo(() => geoapifyGetPlaceRecordQueryData?.place.record, [geoapifyGetPlaceRecordQueryData])

    const [imageState, setImageState] = useState<string[]>([])

    useEffect(() => {
        if (placeData?.name) {
            fetchImageList(placeData.name).then(async (response) => {
                const res = await response.json()
                if (res?.data?.length) {
                    setImageState(res.data)
                }
            })
        }
    }, [placeData])

    return (
        <SwipeableDrawer
            anchor={'bottom'}
            open={open}
            sx={{
                'MuiDrawer-paperAnchorBottom': {
                    borderRadius: '20px 20px 0 0',
                },
            }}
            onClose={() => {
                setOpen(false)
                setTimeout(() => {
                    pickedPlaceId(null)
                }, 400)
            }}
            onOpen={() => setOpen(true)}
        >
            {(!geoapifyGetPlaceRecordQueryLoading && placeData) ? (
                <Stack direction={'column'} padding={theme.spacing(2)} spacing={theme.spacing(1)}>
                    {imageState?.length ? (
                        <div style={{marginBottom: '10px'}}>
                            <Slider {...{
                                dots: true,
                                infinite: true,
                                speed: 500,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                adaptiveHeight: true,
                            }}>
                                {imageState.map((item) => (
                                    <AlexImageView src={item} paperStyles={{height: '100%'}} modal/>
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        <CircularProgress/>
                    )}
                    <Stack direction={'row'} alignItems={'center'} spacing={theme.spacing(1)}
                           justifyContent={'space-between'}>
                        <Typography variant={'h4'}>
                            {placeData.name}
                        </Typography>
                    </Stack>
                    <Typography variant={'subtitle2'}>
                        {placeData.location.street}
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        {placeData.description}
                    </Typography>
                    <Stack direction={'row'} alignItems={'center'} spacing={theme.spacing(1)}
                           justifyContent={'space-between'}>
                        <Stack direction={'row'}>
                            <AlexIcon icon={(
                                <SvgIcon>
                                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M31.1053 1.05051C30.8211 0.766534 30.4664 0.563443 30.0777 0.462159C29.6889 0.360874 29.2802 0.365057 28.8936 0.474276H28.8724L1.76397 8.69973C1.3227 8.82663 0.930549 9.08496 0.639749 9.44029C0.348949 9.79563 0.173296 10.2311 0.136181 10.6888C0.0990647 11.1464 0.202247 11.6046 0.431988 12.0021C0.661729 12.3997 1.00713 12.7178 1.42219 12.9141L13.5146 18.6412L19.2417 30.7336C19.4225 31.1209 19.7103 31.4483 20.0712 31.6773C20.432 31.9063 20.8509 32.0272 21.2782 32.0259C21.3432 32.0259 21.4082 32.0231 21.4731 32.0174C21.9292 31.9805 22.363 31.805 22.7165 31.5144C23.0699 31.2238 23.326 30.8321 23.4504 30.3918L31.6702 3.28342C31.6702 3.27635 31.6702 3.26929 31.6702 3.26223C31.7809 2.87661 31.7868 2.46849 31.6876 2.07979C31.5883 1.69109 31.3873 1.33584 31.1053 1.05051ZM21.291 29.745L21.2839 29.7647L15.7249 18.0296L22.3968 11.3563C22.5998 11.1427 22.7112 10.8583 22.7075 10.5636C22.7037 10.269 22.585 9.98753 22.3766 9.77918C22.1683 9.57083 21.8868 9.45211 21.5921 9.44834C21.2975 9.44456 21.0131 9.55604 20.7995 9.75898L14.1262 16.4309L2.38964 10.8719H2.40941L29.5065 2.64928L21.291 29.745Z"
                                            fill="#BB88FF"/>
                                    </svg>
                                </SvgIcon>
                            )}/>
                            <Stack direction={'column'}>
                                <Typography variant={'subtitle2'}>
                                    От вас
                                </Typography>
                                <Typography variant={'subtitle1'}>
                                    20 км
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'}>
                            <AlexIcon icon={(
                                <SvgIcon>
                                    <svg width="28" height="30" viewBox="0 0 28 30" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14 0.375C6.43016 0.375 0.5 3.83438 0.5 8.25V21.75C0.5 26.1656 6.43016 29.625 14 29.625C21.5698 29.625 27.5 26.1656 27.5 21.75V8.25C27.5 3.83438 21.5698 0.375 14 0.375ZM25.25 15C25.25 16.3528 24.1419 17.7323 22.2111 18.7856C20.037 19.9711 17.1205 20.625 14 20.625C10.8795 20.625 7.96297 19.9711 5.78891 18.7856C3.85813 17.7323 2.75 16.3528 2.75 15V12.66C5.14906 14.7694 9.25109 16.125 14 16.125C18.7489 16.125 22.8509 14.7638 25.25 12.66V15ZM5.78891 4.46438C7.96297 3.27891 10.8795 2.625 14 2.625C17.1205 2.625 20.037 3.27891 22.2111 4.46438C24.1419 5.51766 25.25 6.89719 25.25 8.25C25.25 9.60281 24.1419 10.9823 22.2111 12.0356C20.037 13.2211 17.1205 13.875 14 13.875C10.8795 13.875 7.96297 13.2211 5.78891 12.0356C3.85813 10.9823 2.75 9.60281 2.75 8.25C2.75 6.89719 3.85813 5.51766 5.78891 4.46438ZM22.2111 25.5356C20.037 26.7211 17.1205 27.375 14 27.375C10.8795 27.375 7.96297 26.7211 5.78891 25.5356C3.85813 24.4823 2.75 23.1028 2.75 21.75V19.41C5.14906 21.5194 9.25109 22.875 14 22.875C18.7489 22.875 22.8509 21.5138 25.25 19.41V21.75C25.25 23.1028 24.1419 24.4823 22.2111 25.5356Z"
                                            fill="#FFBF00"/>
                                    </svg>
                                </SvgIcon>
                            )}/>
                            <Stack direction={'column'}>
                                <Typography variant={'subtitle2'}>
                                    200
                                </Typography>
                                <Typography variant={'subtitle1'}>
                                    руб/час
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Button variant={'outlined'} color={'primary'}
                            onClick={() => {
                                navigate(`/places/place?id=${pickedPlaceIdVar}`)
                            }}>
                        Показать ещё
                    </Button>
                    <Button variant={'contained'} color={'secondary'}
                            onClick={() => {
                                setStoredOptions((prev) => {
                                    const previousRoute: TRouteEngineElem[] = prev.get(EMapPageStoredOptions.route)
                                    previousRoute.push({
                                        id: pickedPlaceIdVar,
                                        name: placeData?.name,
                                        coordinates: {
                                            lat: placeData?.location.coordinates.lat,
                                            lon: placeData?.location.coordinates.lon
                                        }
                                    } as TRouteEngineElem)
                                    prev.set(EMapPageStoredOptions.route, previousRoute)
                                    return new Map(prev)
                                })
                            }}>
                        Добавить в маршрут!
                    </Button>
                </Stack>
            ) : (
                <CircularProgress/>
            )}
        </SwipeableDrawer>
    )
}