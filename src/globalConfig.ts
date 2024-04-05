import {IMapBackground} from './components/widget/map/map-background.ts'

type TConfig = {
    apiAuthServiceAddress: string
    entrypointServiceNginxAddress: string
    serviceRecognitionKey: string
    geoapifyNestAdapterAddress: string
    searchImageNestAdapterAddress: string
    mapLayersConfig: IMapBackground[]
    mapBoundsDebounce: number;
    defaultMapZoom: number
    defaultMapLon: number
    defaultMapLat: number
    mapGrayscale: number
    mapMaxZoom:number
    mapMinZoom:number
}

export const GLOBAL_CONFIG: TConfig = {
    apiAuthServiceAddress: import.meta.env.VITE_APP_API_AUTH_SERVICE_ADDRESS,
    entrypointServiceNginxAddress: import.meta.env.VITE_APP_ENTRYPOINT_SERVICE_NGINX_ADDRESS,
    serviceRecognitionKey: import.meta.env.VITE_APP_SERVICE_RECOGNITION_KEY,
    geoapifyNestAdapterAddress: import.meta.env.VITE_APP_GEOAPIFY_NEST_ADAPTER_ADDRESS,
    searchImageNestAdapterAddress: import.meta.env.VITE_APP_SEARCH_IMAGE_NEST_ADAPTER_ADDRESS,
    mapLayersConfig: [
        {
            name: import.meta.env.VITE_APP_MAP1_NAME || 'OSM',
            url: import.meta.env.VITE_APP_MAP1_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: import.meta.env.VITE_APP_MAP1_ATTR || '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
        {
            name: import.meta.env.VITE_APP_MAP2_NAME || 'OpenTopoMap',
            url: import.meta.env.VITE_APP_MAP2_URL || 'https://tile-{s}.opentopomap.cz/{z}/{x}/{y}.png',
            attribution: import.meta.env.VITE_APP_MAP2_ATTR || '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://opentopomap.cz">OpenTopoMap.cz</a>'
        },
        {
            name: import.meta.env.VITE_APP_MAP3_NAME || 'Stadia',
            url: import.meta.env.VITE_APP_MAP3_URL || 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
            attribution: import.meta.env.VITE_APP_MAP3_ATTR || '&copy; <a href="http://stadiamaps.com">Stadia Maps</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
    ],
    mapBoundsDebounce: Number(import.meta.env.VITE_APP_MAP_BOUNDS_DEBOUNCE) || 800,
    defaultMapLat: Number(import.meta.env.VITE_APP_DEFAULT_MAP_LAT) || 55.75,
    defaultMapLon: Number(import.meta.env.VITE_APP_DEFAULT_MAP_LON) || 37.5,
    defaultMapZoom: Number(import.meta.env.VITE_APP_DEFAULT_MAP_ZOOM) || 8,
    mapMaxZoom: Number(import.meta.env.VITE_APP_MAX_MAP_ZOOM) || 15,
    mapMinZoom: Number(import.meta.env.VITE_APP_MIN_MAP_ZOOM) || 2,
    mapGrayscale: Number(import.meta.env.VITE_APP_MAP_GRAYSCALE) || 1,
}
