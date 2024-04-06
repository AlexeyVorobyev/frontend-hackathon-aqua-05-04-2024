import { NotExistPage } from '../components/page/not-exist/not-exist-page.component.tsx'
import {TRoute} from '../shared-react-components/AlexRouter/AlexRouter.tsx'
import {MapPage} from '../components/page/map/map-page.component.tsx'
import {RoutesPage} from '../components/page/routes/routes-page.component.tsx'
import { PlacesPage } from '../components/page/places/places.component.tsx'

export const routesListConfig: TRoute[] = [
    {
        path: '/',
        name: 'Карта',
        component: <MapPage/>,
    },

    {
        path: '/cabinet/',
        name: 'Кабинет',
        component: null,
    },

    {
        path: '/places/',
        name: 'Места',
        component: <PlacesPage/>,
    },

    {
        path: '/routes/',
        name: 'Маршруты',
        component: <RoutesPage/>,
    },

    {
        path: '/advices/',
        name: 'Советы',
        component: null,
    },

    {
        path: '*',
        name: 'Не существует',
        component: <NotExistPage/>,
    },
]

const mapRoutesListPaths = (routesList: TRoute[]): string[] => {
    const resultArr: string[] = []

    routesList.map((item) => {
        resultArr.push(item.path)
        if (item.routes) {
            resultArr.push(...mapRoutesListPaths(item.routes))
        }
    })

    return resultArr
}

const mapRoutesListNames = (routesList: TRoute[]): [string, string][] => {
    const resultArr: [string, string][] = []

    routesList.map((item) => {
        resultArr.push([item.path, item.name])
        if (item.routes) {
            resultArr.push(...mapRoutesListNames(item.routes))
        }
    })

    return resultArr
}
export const autoGeneratedRoutesListMap = new Map(mapRoutesListNames(routesListConfig))
export const autoGeneratedAllowedLinks = mapRoutesListPaths(routesListConfig)