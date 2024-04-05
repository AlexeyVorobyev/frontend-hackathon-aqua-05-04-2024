type TConfig = {
    apiAuthServiceAddress: string
    entrypointServiceNginxAddress: string
    serviceRecognitionKey: string
    geoapifyNestAdapterAddress: string
    searchImageNestAdapterAddress: string

}

export const GLOBAL_CONFIG: TConfig = {
    apiAuthServiceAddress: import.meta.env.VITE_APP_API_AUTH_SERVICE_ADDRESS,
    entrypointServiceNginxAddress: import.meta.env.VITE_APP_ENTRYPOINT_SERVICE_NGINX_ADDRESS,
    serviceRecognitionKey: import.meta.env.VITE_APP_SERVICE_RECOGNITION_KEY,
    geoapifyNestAdapterAddress: import.meta.env.VITE_APP_GEOAPIFY_NEST_ADAPTER_ADDRESS,
    searchImageNestAdapterAddress: import.meta.env.VITE_APP_SEARCH_IMAGE_NEST_ADAPTER_ADDRESS
}
