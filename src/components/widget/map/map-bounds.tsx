import React, {FC, useCallback, useEffect} from 'react'
import {useMap} from 'react-leaflet'
import {MapEvents} from './map-events.tsx'
import {
    TSetStoredOptions,
    TStoredOptions,
} from '../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import {GLOBAL_CONFIG} from '../../../globalConfig.ts'
import {useDebounce} from '../../hook/useDebounce.tsx'

interface ICoordinates {
    lat: number
    lon: number
}

export interface IMapBounds {
    northEast: ICoordinates,
    southWest: ICoordinates
}

interface IProps {
    storedOptions: TStoredOptions,
    setStoredOptions: TSetStoredOptions
}

export const MapBounds: FC<IProps> = ({
                                          storedOptions,
                                          setStoredOptions
                                      }) => {
    const map = useMap()
    const setBoundsDebounced = useDebounce(setStoredOptions, GLOBAL_CONFIG.mapBoundsDebounce)

    useEffect(() => {
        if (!storedOptions.get('bounds')) {
            onMove()
        }
    }, [])

    const onMove = useCallback(() => {
        const bounds = map.getBounds()
        const zoom = map.getZoom()
        const coords = map.getCenter()
        const northEast = bounds.getNorthEast()
        const southWest = bounds.getSouthWest()
        setBoundsDebounced((prev: TStoredOptions) => {
            prev.set('bounds', {
                northEast: {
                    lat: northEast.lat >= 0 ? northEast.lat * 1.01 : northEast.lat * 0.99,
                    lon: northEast.lng >= 0 ? northEast.lng * 1.01 : northEast.lng * 0.99,
                },
                southWest: {
                    lat: southWest.lat < 0 ? southWest.lat * 1.01 : southWest.lat * 0.99,
                    lon: southWest.lng < 0 ? southWest.lng * 1.01 : southWest.lng * 0.99,
                }
            })
            prev.set('zoom', zoom)
            prev.set('coords', coords)
            return new Map(prev)
        })
    }, [])

    return <MapEvents handlers={{
        moveend: onMove
    }}/>
}