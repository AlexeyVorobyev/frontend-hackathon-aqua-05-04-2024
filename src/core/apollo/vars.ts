import { makeVar } from "@apollo/client";

export const userLogged = makeVar<boolean>(false)

export const userGeolocation = makeVar<GeolocationCoordinates | null>(null)

export const pickedPlaceId = makeVar<string | null>(null)

export const createRouteReactive = makeVar<boolean>(false)
