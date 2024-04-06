import React, {FC, useCallback} from 'react'
import {MapEvents} from './map-events.tsx'
import {LayersControlEvent} from 'leaflet'
import {CLUSTERS_NAME, GRAYSCALE_NAME} from './map-render.component.tsx'
import {
    TSetStoredOptions,
    TStoredOptions,
} from '../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'

interface IProps {
    storedOptions: TStoredOptions,
    setStoredOptions: TSetStoredOptions
}

export const MapEventsListener: FC<IProps> = ({
                                                  storedOptions,
                                                  setStoredOptions,
                                              }) => {
    const baseLayerChangeHandler = useCallback((event: LayersControlEvent) => {
        setStoredOptions((prev) => {
            prev.set('baseLayer', event.name)
            return new Map(prev)
        })
    }, [])

    const overlayAddHandler = useCallback((event: LayersControlEvent) => {
        if (event.name === GRAYSCALE_NAME) {
            setStoredOptions((prev) => {
                prev.set('grayscale', true)
                return new Map(prev)
            })
        }
        if (event.name === CLUSTERS_NAME) {
            setStoredOptions((prev) => {
                prev.set('clusters', true)
                return new Map(prev)
            })
        }
    }, [])

    const overlayRemoveHandler = useCallback((event: LayersControlEvent) => {
        if (event.name === GRAYSCALE_NAME) {
            setStoredOptions((prev) => {
                prev.set('grayscale', false)
                return new Map(prev)
            })
        }
        if (event.name === CLUSTERS_NAME) {
            setStoredOptions((prev) => {
                prev.set('clusters', false)
                return new Map(prev)
            })
        }
    }, [])


    return <MapEvents handlers={{
        baselayerchange: baseLayerChangeHandler,
        overlayadd: overlayAddHandler,
        overlayremove: overlayRemoveHandler,
    }}/>
}