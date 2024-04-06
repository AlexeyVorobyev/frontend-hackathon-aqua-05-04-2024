import {FC, useMemo, useState} from 'react'
import {useReactiveVar} from '@apollo/client'
import {userGeolocation} from '../../../../core/apollo/vars.ts'
import {MarkerEnchanced} from './marker-enchanced.component.tsx'
import {Box, SvgIcon, useTheme} from '@mui/material'
import {Circle, Pane, useMap} from 'react-leaflet'
import {AlexIcon} from '../../../../shared-react-components/alex-icon/alex-icon.component.tsx'

export const UserMarker: FC = () => {
    const userPosition = useReactiveVar(userGeolocation)
    const theme = useTheme()
    const map = useMap()

    const [showAccuracy, setShowAccuracy] = useState<boolean>(false)

    const memoisedPostiton = useMemo(() => userPosition, [userPosition])

    return (<>
        {(memoisedPostiton?.latitude && memoisedPostiton?.longitude) && (<>
            {showAccuracy && (
                <Pane name={'accuracyCircle'} style={{zIndex:401}}>
                    <Circle radius={memoisedPostiton?.accuracy} center={[
                        memoisedPostiton?.latitude,
                        memoisedPostiton?.longitude,
                    ]} color={theme.palette.neutral.light}/>
                </Pane>
            )}
            <Pane name={'userMarker'} style={{zIndex:402}}>
                <MarkerEnchanced
                    position={[
                        memoisedPostiton?.latitude,
                        memoisedPostiton?.longitude,
                    ]}
                    eventHandlers={{
                        click: () => {
                            setShowAccuracy(!showAccuracy)
                        }
                    }}
                    top={`${13 * -5}px`}
                    icon={(<>
                        <AlexIcon icon={'location'}
                                  color={theme.palette.primary.main}
                        />
                    </>)}/>
            </Pane>
        </>)}
    </>)
}