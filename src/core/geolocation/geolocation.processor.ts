import {FC, useEffect} from 'react'
import {
    EUsePageStateMode,
    useAlexPageState,
} from '../../shared-react-components/functions/useAlexPageState/useAlexPageState.tsx'
import {userGeolocation} from '../apollo/vars.ts'

export enum EGeoStoredParams {
    userGeolocation='userGeolocation'
}

export const GeolocationProcessor: FC = () => {

    const {
        storedOptions,
        setStoredOptions
    } = useAlexPageState({
        storageKey: 'geoStorage',
        modeWrite: [
            EUsePageStateMode.localStorage
        ],
        modeRead: [
            EUsePageStateMode.localStorage
        ]
    })

    useEffect(() => {
        console.log(window.location.protocol)
        navigator.geolocation.getCurrentPosition((response) => {
            console.log(response)
            setStoredOptions((prev) => {
                prev.set(EGeoStoredParams.userGeolocation, response.coords)
                return new Map(prev)
            })
        })
        setInterval(() => {
            navigator.geolocation.getCurrentPosition((response) => {
                console.log(response)
                setStoredOptions((prev) => {
                    prev.set(EGeoStoredParams.userGeolocation, response.coords)
                    return new Map(prev)
                })
            })
        }, 10000)
    },[])

    useEffect(() => {
        if (storedOptions.has(EGeoStoredParams.userGeolocation)) {
            console.log(storedOptions.get(EGeoStoredParams.userGeolocation));
            userGeolocation(storedOptions.get(EGeoStoredParams.userGeolocation))
        }
    }, [storedOptions])

    return null
}