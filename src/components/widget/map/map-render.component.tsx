import React, {FC} from 'react'
import {MapContainer, ScaleControl, ZoomControl} from 'react-leaflet'
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

interface IProps {
    storedOptions: TStoredOptions,
    setStoredOptions: TSetStoredOptions
}

export const GRAYSCALE_NAME: string = 'Затенение'
export const CLUSTERS_NAME: string = 'Кластеризация'

export const MapRender: FC<IProps> = ({
                                          storedOptions,
                                          setStoredOptions
                                      }) => {
    return (<>
        <MapContainer
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

            <MapBounds
                storedOptions={storedOptions}
                setStoredOptions={setStoredOptions}/>

            <MapEventsListener
                storedOptions={storedOptions}
                setStoredOptions={setStoredOptions}/>

            <MapGray storedOptions={storedOptions}/>

            <ScaleControl/>

            <ZoomControl position="topleft"/>

            <MapTilesPane storedOptions={storedOptions}/>
        </MapContainer>
    </>)
}