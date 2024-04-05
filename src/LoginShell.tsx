import React, { FC } from 'react'
import { AlexRouter } from './shared-react-components/AlexRouter/AlexRouter.tsx'
import { SkeletonWrapper } from './components/widget/skeleton/skeleton-wrapper.component.tsx'
import { useLoginStatus } from './components/hook/use-login-status.hook.tsx'
import { TokenProcessorPage } from './components/page/token-processor/token-processor-page.component.tsx'
import {routesListConfig} from './config/routes-list-config.data.tsx'

export const LoginShell: FC = () => {
    const loginStatus = useLoginStatus()

    return (<>
        {loginStatus ? (
            <SkeletonWrapper>
                <AlexRouter routesList={routesListConfig}/>
            </SkeletonWrapper>
        ) : (
            <TokenProcessorPage/>
        )}
    </>)
}