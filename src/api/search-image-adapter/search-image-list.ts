import {GLOBAL_CONFIG} from '../../globalConfig.ts'

export const fetchImageList = async (filter: string) => {
    const url = new URL(`${GLOBAL_CONFIG.searchImageNestAdapterAddress}image/list`)
    url.searchParams.set('source', 'yandex')
    url.searchParams.set('healthCheck', 'true')
    url.searchParams.set('simpleFilter', filter)
    url.searchParams.set('perPage', '5')
    return await fetch(url,{
        method: 'GET'
    })
}