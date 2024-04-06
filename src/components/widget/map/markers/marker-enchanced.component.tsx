import {CSSProperties, FC, ReactElement, ReactNode} from 'react'
import {MarkerProps} from 'react-leaflet'
// @ts-ignore
import Marker from '../../../../../lib/enchanced-marker/src/components/Marker/Markers.jsx'


interface IProps extends Omit<MarkerProps, 'icon'> {
    icon?: ReactNode,
    top?: string,
    left?: string
}

export const MarkerEnchanced: FC<IProps> = ({
                                                children,
                                                icon,
                                                top,
                                                left,
                                                ...props
                                            }) => (
    <Marker
        icon={
            icon ? (
                <div style={{
                    position: 'relative',
                    top: top,
                    left: left,
                } as CSSProperties}>
                    {icon}
                </div>
            ) : null
        }
        {...props}>
        {children}
    </Marker>
)