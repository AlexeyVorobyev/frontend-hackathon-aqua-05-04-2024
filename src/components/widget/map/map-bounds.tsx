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
    northWest: ICoordinates,
    southEast: ICoordinates
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
        const northWest = bounds.getNorthWest()
        const southEast = bounds.getSouthEast()
        setBoundsDebounced((prev: TStoredOptions) => {
            prev.set('bounds', {
                northWest: {
                    lat: northWest.lat,
                    lon: northWest.lng,
                },
                southEast: {
                    lat: southEast.lat,
                    lon: southEast.lng,
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