import {Circle, FeatureGroup, LayersControl, Pane, TileLayer} from 'react-leaflet'
import {mapBackground} from './map-background.ts'
import React, {FC} from 'react'
import {CLUSTERS_NAME, GRAYSCALE_NAME} from './map-render.component.tsx'
import {TStoredOptions} from '../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import {GLOBAL_CONFIG} from '../../../globalConfig.ts'

interface IProps {
    storedOptions: TStoredOptions
}

export const MapTilesPane: FC<IProps> = ({
                                             storedOptions,
                                         }) => {

    return (
        <Pane name="tilesPane"
              style={{filter: storedOptions.get('grayscale') ? `grayscale(${GLOBAL_CONFIG.mapGrayscale})` : `grayscale(0%)`}}>
            <LayersControl position="topright" collapsed>
                {mapBackground.map((mapTile, idx) => (
                    <LayersControl.BaseLayer key={mapTile.name} name={mapTile.name}
                                             checked={storedOptions.get('baseLayer') ? mapTile.name === storedOptions.get('baseLayer') : idx === 0}>
                        <TileLayer url={mapTile.url} attribution={mapTile.attribution}/>
                    </LayersControl.BaseLayer>
                ))}
                <LayersControl.Overlay name={GRAYSCALE_NAME}
                                       checked={storedOptions.get('grayscale')}>
                    <FeatureGroup pathOptions={{opacity: 0}}>
                        <Circle center={storedOptions.get('coords')} radius={0}
                                interactive={false}/>
                    </FeatureGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name={CLUSTERS_NAME}
                                       checked={storedOptions.get('clusters')}>
                    <FeatureGroup pathOptions={{opacity: 0}}>
                        <Circle center={storedOptions.get('coords')} radius={0}
                                interactive={false}/>
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </Pane>
    )
}