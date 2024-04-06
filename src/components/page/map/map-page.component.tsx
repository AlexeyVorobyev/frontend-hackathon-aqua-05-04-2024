import {FC, useEffect} from 'react'
import {MapRender} from '../../widget/map/map-render.component.tsx'
import {
    EUsePageStateMode,
    useAlexPageState,
} from '../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import {GLOBAL_CONFIG} from '../../../globalConfig.ts'
import {useLazyQuery, useReactiveVar} from '@apollo/client'
import {
    GeoapifyGetPlaceListDocument,
    GeoapifyGetPlaceListQuery,
    TPlaceListInput,
} from '../../../core/apollo/types/graphql/graphql.ts'
import {EGraphqlLinks} from '../../../core/apollo/apollo-provider-with-client.tsx'
import {varsBehaviourMapMapPage} from './vars-behaviour-map-map-page.ts'
import {CircularProgress} from '@mui/material'
import {PlaceCardDrawer} from '../../widget/place-card/place-card-drawer.component.tsx'
import {pickedPlaceId} from '../../../core/apollo/vars.ts'

export enum EMapPageStoredOptions {
    coords = 'coords',
    zoom = 'zoom',
    baseLayer = 'baseLayer',
    grayScale = 'grayScale',
    clusters = 'clusters',
    bounds = 'bounds'
}

export const MapPage: FC = () => {
    const {
        storedOptions,
        setStoredOptions,
        variables,
    } = useAlexPageState<TPlaceListInput | null>({
        modeRead: [
            EUsePageStateMode.queryString,
            EUsePageStateMode.localStorage,
        ],
        modeWrite: [
            EUsePageStateMode.queryString,
            EUsePageStateMode.localStorage,
        ],
        varsBehaviorMap: varsBehaviourMapMapPage,
        storageKey: 'mainMapStorage',
        defaultValue: new Map([
            [EMapPageStoredOptions.coords, [GLOBAL_CONFIG.defaultMapLat, GLOBAL_CONFIG.defaultMapLon]],
            [EMapPageStoredOptions.zoom, GLOBAL_CONFIG.defaultMapZoom],
            [EMapPageStoredOptions.baseLayer, GLOBAL_CONFIG.mapLayersConfig[0].name],
            [EMapPageStoredOptions.grayScale, false],
            [EMapPageStoredOptions.clusters, true],
        ] as [string, any][]),
    })

    const [
        geoapifyGetPlaceListLazyQuery,
        {
            data: geoapifyGetPlaceListQueryData,
            loading: geoapifyGetPlaceListQueryLoading,
        },
    ] = useLazyQuery<GeoapifyGetPlaceListQuery>(GeoapifyGetPlaceListDocument, {
        context: {clientName: EGraphqlLinks.geoapify},
    })

    useEffect(() => {
        if (variables) {
            geoapifyGetPlaceListLazyQuery({
                variables: {
                    input: variables,
                },
            })
        }
    }, [variables])

    const pickedPlaceIdVar = useReactiveVar(pickedPlaceId)

    return (<>
        {geoapifyGetPlaceListQueryLoading && (
            <CircularProgress sx={{
                position: 'absolute',
                top: '25px',
                left: '25px',
                zIndex: 1000,
                width: '44px',
                height:'44px'
            }}/>
        )}
        <MapRender
            storedOptions={storedOptions}
            setStoredOptions={setStoredOptions}
            externalPlacesList={geoapifyGetPlaceListQueryData?.place.list.data || null}
        />
        {pickedPlaceIdVar && (
            <PlaceCardDrawer id={pickedPlaceIdVar}/>
        )}
    </>)
}