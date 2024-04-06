import {TPlaceListInput} from '../../../core/apollo/types/graphql/graphql.ts'
import {EMapPageStoredOptions} from './map-page.component.tsx'
import {IMapBounds} from '../../widget/map/map-bounds.tsx'

export const varsBehaviourMapMapPage = (params: any): Record<string, any> | null => {
    const bounds: IMapBounds | undefined = params[EMapPageStoredOptions.bounds]

    if (bounds) {
        return {
            boundingBox: {
                bottomRight: {
                    lat: bounds.southEast.lat,
                    lon: bounds.southEast.lon
                },
                topLeft: {
                    lat: bounds.northWest.lat,
                    lon: bounds.northWest.lon
                }
            },
            perPage: 500
        } as TPlaceListInput
    } else {
        return null
    }

}