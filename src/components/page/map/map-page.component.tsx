import {FC} from 'react'
import {MapRender} from '../../widget/map/map-render.component.tsx'
import {
    EUsePageStateMode,
    useAlexPageState,
} from '../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import {GLOBAL_CONFIG} from '../../../globalConfig.ts'

export const MapPage: FC = () => {
    const {
        storedOptions,
        setStoredOptions
    } = useAlexPageState({
        modeRead: [
            EUsePageStateMode.queryString,
            EUsePageStateMode.localStorage,
        ],
        modeWrite: [
            EUsePageStateMode.queryString,
            EUsePageStateMode.localStorage,
        ],
        storageKey: 'mainMapStorage',
        defaultValue: new Map([
            ['coords', [GLOBAL_CONFIG.defaultMapLat, GLOBAL_CONFIG.defaultMapLon]],
            ['zoom', GLOBAL_CONFIG.defaultMapZoom],
            ['baseLayer', GLOBAL_CONFIG.mapLayersConfig[0].name],
            ['grayscale', false],
            ['clusters', true]
        ] as [string, any][])
    })

    return (
        <MapRender
            storedOptions={storedOptions}
            setStoredOptions={setStoredOptions}
        />
    )
}