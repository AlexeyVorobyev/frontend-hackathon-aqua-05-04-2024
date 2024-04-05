import React, {useEffect} from 'react'
import {useMap} from 'react-leaflet'
import {TStoredOptions} from '../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import {GLOBAL_CONFIG} from '../../../globalConfig.ts'


interface IProps {
    storedOptions: TStoredOptions
}

export const MapGray: React.FC<IProps> = ({
                                              storedOptions,
                                          }) => {
    const map = useMap()
    useEffect(() => {
        const pane = map.getPane('tilesPane')
        if (pane) {
            pane.style.filter = storedOptions.get('grayscale')
                ? `grayscale(${GLOBAL_CONFIG.mapGrayscale})`
                : `grayscale(0%)`
        }
    }, [storedOptions])
    return null
}
