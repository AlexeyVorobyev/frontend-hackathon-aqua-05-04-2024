import {
    TSetStoredOptions,
    TStoredOptions,
} from '../../../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import {FC, useEffect, useMemo} from 'react'
import {useLazyQuery, useReactiveVar} from '@apollo/client'
import {createRouteReactive} from '../../../../core/apollo/vars.ts'
import {
    ERoutingMode,
    GeoapifyRouteDocument,
    GeoapifyRouteQuery,
    GeoapifyRouteQueryVariables,
} from '../../../../core/apollo/types/graphql/graphql.ts'
import {EGraphqlLinks} from '../../../../core/apollo/apollo-provider-with-client.tsx'
import {EMapPageStoredOptions} from '../../../page/map/map-page.component.tsx'
import {TRouteEngineElem} from './routing-engine.component.tsx'
import {Polyline} from 'react-leaflet'
import {LatLngExpression} from 'leaflet'

interface IProps {
    storedOptions: TStoredOptions,
    setStoredOptions: TSetStoredOptions
    localData?: any
}



export const RoutingEngineDisplay: FC<IProps> = ({
                                              storedOptions,
                                              setStoredOptions,
                                          }) => {

    const route: TRouteEngineElem[] | undefined = useMemo(() => storedOptions.get(EMapPageStoredOptions.route), [storedOptions])
    const display = useReactiveVar(createRouteReactive)

    const [
        geoapifyGetRouteListLazyQuery,
        {
            data: geoapifyGetRouteListQueryData,
            loading: geoapifyGetRouteListQueryLoading,
        },
    ] = useLazyQuery<GeoapifyRouteQuery>(GeoapifyRouteDocument, {
        context: {clientName: EGraphqlLinks.geoapify},
    })

    useEffect(() => {
        console.log(route,display, 'HERE')
        if (route && display && route?.length) {
            geoapifyGetRouteListLazyQuery({
                variables: {
                    input: {
                        mode: ERoutingMode.car,
                        language: 'russian',
                        waypoints: route.map((item) => ({
                            lat: item.coordinates.lat,
                            lon: item.coordinates.lon
                        }))
                    },
                } as GeoapifyRouteQueryVariables,
            })
        }
    }, [display, route])

    const dataCoordinates = useMemo(() => {
        return geoapifyGetRouteListQueryData?.route.routing.legs
    }, [geoapifyGetRouteListQueryData])

    return (<>
        {dataCoordinates?.map((item_1) => {
            return item_1.steps.map((item_2) => {
                const coord = item_2.coordinates.map((item_3) => [item_3.lat,item_3.lon])
                return (
                    <Polyline pathOptions={{ color: 'red' }} positions={coord as LatLngExpression[]}/>
                )
            })
        })}
    </>)
}