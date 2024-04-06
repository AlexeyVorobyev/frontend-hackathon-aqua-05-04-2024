import React, {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {MapContainer, Pane} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {MapBounds} from './map-bounds.tsx'
import {MapEventsListener} from './map-events-listener.tsx'
import {MapGray} from './map-gray.tsx'
import {MapTilesPane} from './map-tiles-pane.tsx'
import {
    TSetStoredOptions,
    TStoredOptions,
} from '../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import {GLOBAL_CONFIG} from '../../../globalConfig.ts'
import {MapZoomControl} from './map-zoom-control.component.tsx'
import {UserMarker} from './markers/user-marker.component.tsx'
import {GeoapifyGetPlaceListQuery} from '../../../core/apollo/types/graphql/graphql.ts'
import {EMarkerType, IPlaceMarkerProps, PlaceMarker} from './markers/external-place-marker.component.tsx'
import MarkerClusterGroup from 'react-leaflet-cluster'
import {AlexFilters} from '../../../shared-react-components/AlexFilters/AlexFilters.tsx'
import {Box} from '@mui/system'
import {Button} from '@mui/material'
import {AlexInput} from '../../../shared-react-components/form-utils/AlexInput/AlexInput.tsx'
import {AlexInputControlled} from '../../../shared-react-components/form-utils/AlexInput/AlexInputControlled.tsx'
import {FormProvider, useForm} from 'react-hook-form'
import {AlexFiltersDialog} from '../../../shared-react-components/AlexFilters/AlexFiltersDialog.tsx'
import {useDebounce} from '../../hook/useDebounce.tsx'
import {alexFiltersConfigData} from '../../../config/alex-filters-config.data.tsx'

type TPlacesList = GeoapifyGetPlaceListQuery['place']['list']['data']

interface IProps {
    storedOptions: TStoredOptions,
    setStoredOptions: TSetStoredOptions,
    externalPlacesList: TPlacesList | null
}

export const GRAYSCALE_NAME: string = 'Затенение'
export const CLUSTERS_NAME: string = 'Кластеризация'

export const MapRender: FC<IProps> = ({
                                          storedOptions,
                                          setStoredOptions,
                                          externalPlacesList,
                                      }) => {

    const [dataExternalPlacesProcessed, setDataExternalPlacesProcessed] = useState<IPlaceMarkerProps[]>([])

    const dataExternalPlacesFormat = useCallback((dataMaps: TPlacesList) => {
        return dataMaps.map((item) => {
            return {
                id: item.id,
                name: item.name,
                coordinates: {
                    lat: item.location.coordinates.lat,
                    lon: item.location.coordinates.lon,
                },
                markerType: EMarkerType.external,
            } as IPlaceMarkerProps
        })
    }, [externalPlacesList])

    useEffect(() => {
        if (Array.isArray(externalPlacesList)) {
            // setDataExternalPlacesProcessed((prevState) => {
            //     const calced = dataExternalPlacesFormat(externalPlacesList)
            //
            //     return [
            //         ...prevState.filter((item) => (
            //             !calced.map((item) => item.id).includes(item.id)
            //         )),
            //         ...calced,
            //     ]
            // })
            setDataExternalPlacesProcessed(dataExternalPlacesFormat(externalPlacesList))
        }
    }, [externalPlacesList])

    const renderExternalPlaceMarkers = useMemo(() => {
        return (<>
            {dataExternalPlacesProcessed.map((elem) => (
                <PlaceMarker {...elem} key={elem.id}/>
            ))}
        </>)
    }, [dataExternalPlacesProcessed])

    const [simpleFilterValue, setSimpleFilterValue] = useState<string>(storedOptions.get('simpleFilter') || '')


    useEffect(() => {
        debouncedSetStoredOptions((prev: TStoredOptions) => {
            if (simpleFilterValue) {
                prev.set('simpleFilter', simpleFilterValue)
            } else {
                prev.delete('simpleFilter')
            }
            return new Map(prev)
        })
    }, [simpleFilterValue])

    const debouncedSetStoredOptions = useDebounce(setStoredOptions, 500)

    return (<>
        <Box sx={{
            position: 'absolute',
            zIndex: 403,
            left: '25px',
            top: '25px',
        }}>
            <AlexInput value={simpleFilterValue}
                       onChange={(event) => setSimpleFilterValue(event.target.value)}
                       placeholder={'Поиск'}
                       InputProps={{
                           endAdornment: (
                               <AlexFiltersDialog storedOptions={storedOptions}
                                                  setServerSideOptions={setStoredOptions}
                                                  filterListIds={[
                                                      'placeType',
                                                      'placeCondition'
                                                  ]}
                                                  filtersMap={alexFiltersConfigData}/>
                           ),
                       }}/>
        </Box>
        <MapContainer
            preferCanvas={true}
            maxZoom={GLOBAL_CONFIG.mapMaxZoom}
            minZoom={GLOBAL_CONFIG.mapMinZoom}
            zoom={storedOptions.get('zoom')}
            center={storedOptions.get('coords')}
            zoomControl={false}
            style={{
                width: '100%',
                height: '100%',
            }}
        >

            <Pane name={'externalPlacesMarkers'} style={{zIndex: 410}}>
                {storedOptions.get('clusters')
                    ? (<>
                        <MarkerClusterGroup
                        >
                            {renderExternalPlaceMarkers}
                        </MarkerClusterGroup>
                    </>)
                    : <>{renderExternalPlaceMarkers}</>
                }
            </Pane>

            <MapBounds
                storedOptions={storedOptions}
                setStoredOptions={setStoredOptions}/>

            <MapEventsListener
                storedOptions={storedOptions}
                setStoredOptions={setStoredOptions}/>

            <MapGray storedOptions={storedOptions}/>

            <MapZoomControl/>

            <UserMarker/>

            <MapTilesPane storedOptions={storedOptions}/>
        </MapContainer>
    </>)
}